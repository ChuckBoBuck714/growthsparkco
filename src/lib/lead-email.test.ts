import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "@/app/api/lead/route";
import { deliverSubmittedLead, handleLeadSubmission } from "@/lib/deliver-lead";
import {
  DEFAULT_LEAD_EMAIL_FROM,
  DEFAULT_LEAD_NOTIFY_TO,
  buildLeadNotification,
  formatLeadSource,
  resolveLeadSource,
  sendLeadNotification,
  type LeadEmailPayload,
} from "@/lib/lead-email";
import type { LeadFormData } from "@/lib/validation";

const submittedAt = new Date("2026-11-16T21:33:00.000Z");
const pacificTimestamp = "Mon, Nov 16, 2026, 1:33:00 PM PST";
const subject = "New funding lead: Northwind Logistics \u2013 $100,000\u2013$250,000";

const textFields = [
  subject,
  `Submitted (Pacific time): ${pacificTimestamp}`,
  "Page: Equipment Financing (/equipment-financing)",
  "First name: Ava",
  "Last name: Nguyen",
  "Email: ava@northwind.example",
  "Phone: (949) 555-0134",
  "Business name: Northwind Logistics",
  "Time in business: 2\u20135 years",
  "Monthly revenue: $50,000\u2013$100,000",
  "Funding amount requested: $100,000\u2013$250,000",
  "Intended use of funds: Equipment",
  "1. Lender: OnDeck",
  "Amount funded: $25,000.00",
  "Current balance: $10,000.00",
  "2. Lender: Credibly",
  "Amount funded: $40,000.50",
  "Current balance: $18,500.50",
  "Previously defaulted on business funding: No",
  "Homeowner: Yes",
  "Notes: Need a forklift before Q2.",
  "Consent to be contacted: Yes",
];

const htmlFields = [
  "Ava",
  "Nguyen",
  "ava@northwind.example",
  "(949) 555-0134",
  "Northwind Logistics",
  "2\u20135 years",
  "$50,000\u2013$100,000",
  "$100,000\u2013$250,000",
  "Equipment",
  "OnDeck",
  "$25,000.00",
  "$10,000.00",
  "Credibly",
  "$40,000.50",
  "$18,500.50",
  "Need a forklift before Q2.",
  "Equipment Financing (/equipment-financing)",
  pacificTimestamp,
  "Previously defaulted on business funding",
  "Homeowner",
  "Open business funding positions",
  "Lender",
  "Amount funded",
  "Current balance",
  "Consent to be contacted",
  "Submitted (Pacific time)",
];

function sampleLead(overrides: Partial<LeadFormData> = {}): LeadFormData {
  return {
    firstName: "Ava",
    lastName: "Nguyen",
    businessName: "Northwind Logistics",
    phone: "(949) 555-0134",
    email: "ava@northwind.example",
    timeInBusiness: "2\u20135 years",
    monthlyRevenue: "$50,000\u2013$100,000",
    fundingAmount: "$100,000\u2013$250,000",
    useOfFunds: "Equipment",
    notes: "Need a forklift before Q2.",
    consent: true,
    fundingPositions: [
      { id: "position-1", lenderName: "OnDeck", amountFunded: "25000", currentBalance: "10000" },
      { id: "position-2", lenderName: "Credibly", amountFunded: "40000.5", currentBalance: "18500.5" },
    ],
    noOpenPositions: false,
    previouslyDefaulted: "no",
    homeowner: "yes",
    source: "/equipment-financing",
    ...overrides,
  };
}

const context = { submittedAt, source: "/equipment-financing" };

function headers(referer?: string) {
  return {
    get(name: string) {
      if (name.toLowerCase() === "referer") return referer ?? null;
      return null;
    },
  };
}

async function withEnv(values: Record<string, string | undefined>, run: () => Promise<void>) {
  const previous = new Map<string, string | undefined>();
  for (const key of Object.keys(values)) {
    previous.set(key, process.env[key]);
    const next = values[key];
    if (next === undefined) delete process.env[key];
    else process.env[key] = next;
  }
  try {
    await run();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function captureConsole(method: "warn" | "error") {
  const calls: unknown[][] = [];
  const original = console[method];
  console[method] = (...args: unknown[]) => {
    calls.push(args);
  };
  return {
    calls,
    restore() {
      console[method] = original;
    },
  };
}

function assertPayloadHasEveryField(payload: LeadEmailPayload, submitted = pacificTimestamp) {
  assert.equal(payload.subject, subject);
  assert.equal(payload.replyTo, "ava@northwind.example");
  assert.deepEqual(payload.to, [DEFAULT_LEAD_NOTIFY_TO]);
  assert.equal(payload.from, DEFAULT_LEAD_EMAIL_FROM);
  const expectedText = textFields.map((field) =>
    field === `Submitted (Pacific time): ${pacificTimestamp}` ? `Submitted (Pacific time): ${submitted}` : field,
  );
  const expectedHtml = htmlFields.map((field) => (field === pacificTimestamp ? submitted : field));
  for (const field of expectedText) {
    assert.ok(payload.text.includes(field), `plain text missing ${field}`);
  }
  for (const field of expectedHtml) {
    assert.ok(payload.html.includes(field), `html missing ${field}`);
  }
  assert.match(payload.html, /Previously defaulted on business funding<\/td>[\s\S]*?<td[^>]*>No<\/td>/);
  assert.match(payload.html, /Homeowner<\/td>[\s\S]*?<td[^>]*>Yes<\/td>/);
  assert.match(payload.html, /<td[^>]*>OnDeck<\/td>[\s\S]*?<td[^>]*>\$25,000\.00<\/td>[\s\S]*?<td[^>]*>\$10,000\.00<\/td>/);
  assert.match(payload.html, /<td[^>]*>Credibly<\/td>[\s\S]*?<td[^>]*>\$40,000\.50<\/td>[\s\S]*?<td[^>]*>\$18,500\.50<\/td>/);
}

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("lead notification email", () => {
  it("includes every submitted field in the html and plain-text payload", async () => {
    await withEnv({ LEAD_EMAIL_FROM: undefined, LEAD_NOTIFY_TO: undefined }, async () => {
      const payload = buildLeadNotification(sampleLead(), context);
      assertPayloadHasEveryField(payload);
    });
  });

  it("sends that payload through a mocked transport", async () => {
    await withEnv(
      { RESEND_API_KEY: "re_test_key", LEAD_EMAIL_FROM: undefined, LEAD_NOTIFY_TO: undefined },
      async () => {
        const sent: LeadEmailPayload[] = [];
        const status = await sendLeadNotification(sampleLead(), context, {
          send: async (payload) => {
            sent.push(payload);
            return { data: { id: "email_123" }, error: null };
          },
        });

        assert.equal(status.ok, true);
        assert.equal(sent.length, 1);
        assertPayloadHasEveryField(sent[0]);
      },
    );
  });

  it("posts every field to the Resend API", async () => {
    await withEnv(
      { RESEND_API_KEY: "re_test_key", LEAD_EMAIL_FROM: undefined, LEAD_NOTIFY_TO: undefined },
      async () => {
        let requestUrl = "";
        let authorization = "";
        let body: Record<string, unknown> | null = null;

        globalThis.fetch = async (input, init) => {
          requestUrl = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
          const requestHeaders = new Headers(init?.headers);
          authorization = requestHeaders.get("authorization") ?? "";
          body = JSON.parse(String(init?.body)) as Record<string, unknown>;
          return new Response(JSON.stringify({ id: "email_123" }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        };

        const status = await sendLeadNotification(sampleLead(), context);
        assert.equal(status.ok, true);
        assert.equal(requestUrl, "https://api.resend.com/emails");
        assert.equal(authorization, "Bearer re_test_key");
        assert.ok(body);
        const mailed = body as unknown as {
          from: string;
          to: string[];
          reply_to: string;
          subject: string;
          html: string;
          text: string;
        };
        assertPayloadHasEveryField({
          from: mailed.from,
          to: mailed.to,
          replyTo: mailed.reply_to,
          subject: mailed.subject,
          html: mailed.html,
          text: mailed.text,
        });
      },
    );
  });

  it("escapes user input in html and leaves the plain text readable", async () => {
    await withEnv({ LEAD_EMAIL_FROM: undefined, LEAD_NOTIFY_TO: undefined }, async () => {
      const payload = buildLeadNotification(
        sampleLead({
          businessName: `Northwind <script>alert("x")</script> & Co`,
          notes: "It's <b>fine</b>",
          fundingPositions: [
            { id: "position-1", lenderName: "Lend<er>", amountFunded: "25000", currentBalance: "10000" },
          ],
        }),
        context,
      );

      assert.equal(payload.html.includes("<script"), false);
      assert.equal(payload.html.includes("<b>"), false);
      assert.equal(payload.html.includes("<er>"), false);
      assert.ok(payload.html.includes("Northwind &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; Co"));
      assert.ok(payload.html.includes("It&#39;s &lt;b&gt;fine&lt;/b&gt;"));
      assert.ok(payload.html.includes("Lend&lt;er&gt;"));
      assert.ok(payload.text.includes(`Northwind <script>alert("x")</script> & Co`));
      assert.ok(payload.text.includes("It's <b>fine</b>"));
      assert.ok(payload.subject.includes(`Northwind <script>alert("x")</script> & Co`));
      assert.equal(payload.subject.includes("&lt;"), false);
    });
  });

  it("writes None and drops leftover rows when the applicant has no open positions", async () => {
    await withEnv({ LEAD_EMAIL_FROM: undefined, LEAD_NOTIFY_TO: undefined }, async () => {
      const payload = buildLeadNotification(
        sampleLead({
          noOpenPositions: true,
          notes: "Called from the contact page.",
          fundingPositions: [
            { id: "position-1", lenderName: "OnDeck", amountFunded: "25000", currentBalance: "10000" },
          ],
        }),
        { ...context, source: "/contact" },
      );

      assert.match(payload.text, /Open business funding positions: None/);
      assert.match(payload.html, /Open business funding positions: None/);
      assert.equal(payload.text.includes("OnDeck"), false);
      assert.equal(payload.html.includes("OnDeck"), false);
      assert.match(payload.text, /Page: Contact \(\/contact\)/);
      assert.match(payload.text, /Notes: Called from the contact page\./);
    });
  });

  it("says the positions were not provided when the optional section is left blank", async () => {
    await withEnv({ LEAD_EMAIL_FROM: undefined, LEAD_NOTIFY_TO: undefined }, async () => {
      const payload = buildLeadNotification(
        sampleLead({
          noOpenPositions: false,
          previouslyDefaulted: "",
          homeowner: "",
          notes: "",
          fundingPositions: [{ id: "position-1", lenderName: "", amountFunded: "", currentBalance: "" }],
        }),
        context,
      );

      assert.match(payload.text, /Open business funding positions: Not provided/);
      assert.match(payload.html, /Open business funding positions: Not provided/);
      assert.match(payload.text, /Previously defaulted on business funding: Not answered/);
      assert.match(payload.text, /Homeowner: Not answered/);
      assert.match(payload.text, /Notes: None/);
    });
  });

  it("uses configured from and recipient addresses", async () => {
    await withEnv(
      {
        LEAD_EMAIL_FROM: "Growth Spark Co. Leads <notify@growthsparkco.com>",
        LEAD_NOTIFY_TO: "cs@growthsparkco.com, owner@growthsparkco.com",
      },
      async () => {
        const payload = buildLeadNotification(sampleLead(), context);
        assert.equal(payload.from, "Growth Spark Co. Leads <notify@growthsparkco.com>");
        assert.deepEqual(payload.to, ["cs@growthsparkco.com", "owner@growthsparkco.com"]);
      },
    );
  });

  it("skips the email with a warning when RESEND_API_KEY is missing", async () => {
    await withEnv({ RESEND_API_KEY: undefined }, async () => {
      const warnings = captureConsole("warn");
      let called = false;
      try {
        const status = await sendLeadNotification(sampleLead(), context, {
          send: async () => {
            called = true;
            return { data: { id: "should-not-send" }, error: null };
          },
        });
        assert.equal(called, false);
        assert.deepEqual(status, { ok: true, skipped: true });
        assert.ok(
          warnings.calls.some((call) => String(call[0]).includes("RESEND_API_KEY is not set")),
        );
      } finally {
        warnings.restore();
      }
    });
  });

  it("logs a provider failure and does not throw", async () => {
    await withEnv({ RESEND_API_KEY: "re_test_key" }, async () => {
      const errors = captureConsole("error");
      try {
        const status = await sendLeadNotification(sampleLead(), context, {
          send: async () => ({ data: null, error: { message: "Domain is not verified" } }),
        });
        assert.equal(status.ok, false);
        assert.match(status.error ?? "", /Domain is not verified/);
        assert.ok(errors.calls.length > 0);
      } finally {
        errors.restore();
      }
    });
  });

  it("logs a thrown send error and does not throw", async () => {
    await withEnv({ RESEND_API_KEY: "re_test_key" }, async () => {
      const errors = captureConsole("error");
      try {
        const status = await sendLeadNotification(sampleLead(), context, {
          send: async () => {
            throw new Error("network down");
          },
        });
        assert.equal(status.ok, false);
        assert.match(status.error ?? "", /network down/);
      } finally {
        errors.restore();
      }
    });
  });
});

describe("lead source", () => {
  it("labels the known form pages", () => {
    assert.equal(formatLeadSource("/"), "Homepage (/)");
    assert.equal(formatLeadSource("/working-capital"), "Working Capital (/working-capital)");
    assert.equal(resolveLeadSource({ source: "https://www.growthsparkco.com/contact?ref=ad" }), "/contact");
  });

  it("uses a same-site referer and ignores an external one", () => {
    assert.equal(
      resolveLeadSource({}, { headers: headers("https://growthsparkco.com/inventory-financing") }),
      "/inventory-financing",
    );
    assert.equal(
      resolveLeadSource({}, { headers: headers("https://evil.example/contact") }),
      "Unknown",
    );
    assert.equal(
      resolveLeadSource(
        { source: "/working-capital" },
        { headers: headers("https://www.growthsparkco.com/contact") },
      ),
      "/working-capital",
    );
  });
});

describe("Zoho and email independence", () => {
  it("still emails when Zoho fails", async () => {
    let emailed = false;
    const errors = captureConsole("error");
    try {
      const result = await deliverSubmittedLead(sampleLead(), context, {
        submitToZoho: async () => ({ ok: false, error: "crm down" }),
        notify: async () => {
          emailed = true;
          return { ok: true };
        },
      });
      assert.equal(emailed, true);
      assert.equal(result.httpStatus, 502);
      assert.equal(result.zohoOk, false);
      assert.equal(result.emailOk, true);
      assert.equal(result.body.success, false);
    } finally {
      errors.restore();
    }
  });

  it("still accepts the lead when the email throws", async () => {
    let zohoCalled = false;
    const errors = captureConsole("error");
    try {
      const result = await deliverSubmittedLead(sampleLead(), context, {
        submitToZoho: async () => {
          zohoCalled = true;
          return { ok: true };
        },
        notify: () => {
          throw new Error("resend down");
        },
      });
      assert.equal(zohoCalled, true);
      assert.equal(result.httpStatus, 200);
      assert.equal(result.body.success, true);
      assert.equal(result.emailOk, false);
    } finally {
      errors.restore();
    }
  });

  it("starts the email even if Zoho throws immediately", async () => {
    let emailed = false;
    const errors = captureConsole("error");
    try {
      const result = await deliverSubmittedLead(sampleLead(), context, {
        submitToZoho: () => {
          throw new Error("zoho exploded");
        },
        notify: async () => {
          emailed = true;
          return { ok: true };
        },
      });
      assert.equal(emailed, true);
      assert.equal(result.httpStatus, 502);
    } finally {
      errors.restore();
    }
  });

  it("does not wait for Zoho before starting the email", async () => {
    let releaseZoho: () => void = () => {};
    const zohoBlocked = new Promise<void>((resolve) => {
      releaseZoho = resolve;
    });
    let notifyStarted = false;

    const pending = deliverSubmittedLead(sampleLead(), context, {
      submitToZoho: async () => {
        await zohoBlocked;
        return { ok: true };
      },
      notify: async () => {
        notifyStarted = true;
        return { ok: true };
      },
    });

    await Promise.resolve();
    assert.equal(notifyStarted, true);
    releaseZoho();
    const result = await pending;
    assert.equal(result.httpStatus, 200);
    assert.equal(result.emailOk, true);
  });

  it("does not email or call Zoho when validation fails", async () => {
    let called = false;
    const result = await handleLeadSubmission(sampleLead({ email: "not-an-email" }), { headers: headers() }, {
      submitToZoho: async () => {
        called = true;
        return { ok: true };
      },
      notify: async () => {
        called = true;
        return { ok: true };
      },
    });
    assert.equal(called, false);
    assert.equal(result.httpStatus, 400);
    assert.equal(result.body.success, false);
  });

  it("passes the submitted page into the email", async () => {
    let source = "";
    await handleLeadSubmission(
      sampleLead({ source: "https://www.growthsparkco.com/business-cash-flow" }),
      { headers: headers("https://www.growthsparkco.com/contact") },
      {
        submitToZoho: async () => ({ ok: true }),
        notify: async (_data, emailContext) => {
          source = emailContext.source;
          return { ok: true };
        },
      },
    );
    assert.equal(source, "/business-cash-flow");
  });
});

describe("POST /api/lead", () => {
  it("returns the email payload for a successful submission and still emails when Zoho fails", async () => {
    await withEnv(
      {
        RESEND_API_KEY: "re_test_key",
        LEAD_EMAIL_FROM: undefined,
        LEAD_NOTIFY_TO: undefined,
        ZOHO_CRM_FUNCTION_EXECUTE_URL: "https://zoho.example/execute",
      },
      async () => {
        const emails: Array<Record<string, unknown>> = [];
        let zohoCalls = 0;

        globalThis.fetch = async (input, init) => {
          const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
          if (url === "https://api.resend.com/emails") {
            emails.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
            return new Response(JSON.stringify({ id: "email_123" }), {
              status: 200,
              headers: { "content-type": "application/json" },
            });
          }
          if (url.startsWith("https://zoho.example/execute")) {
            zohoCalls += 1;
            const fail = zohoCalls > 1;
            return new Response(JSON.stringify(fail ? { code: "error", message: "down" } : { code: "success" }), {
              status: fail ? 502 : 200,
              headers: { "content-type": "application/json" },
            });
          }
          throw new Error(`Unexpected fetch ${url}`);
        };

        const request = () =>
          new Request("https://www.growthsparkco.com/api/lead", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              referer: "https://www.growthsparkco.com/equipment-financing",
            },
            body: JSON.stringify(sampleLead()),
          });

        const success = await POST(request());
        assert.equal(success.status, 200);
        const successBody = (await success.json()) as { success: boolean };
        assert.equal(successBody.success, true);
        assert.equal(emails.length, 1);
        const mailed = {
          from: String(emails[0].from),
          to: emails[0].to as string[],
          replyTo: String(emails[0].reply_to),
          subject: String(emails[0].subject),
          html: String(emails[0].html),
          text: String(emails[0].text),
        };
        const submitted = mailed.text.match(/Submitted \(Pacific time\): (.+)/)?.[1] ?? "";
        assert.match(submitted, / (PST|PDT)$/);
        assertPayloadHasEveryField(mailed, submitted);

        const errors = captureConsole("error");
        try {
          const failedZoho = await POST(request());
          assert.equal(failedZoho.status, 502);
          assert.equal(emails.length, 2);
          assert.ok(String(emails[1].text).includes("OnDeck"));
          assert.ok(String(emails[1].html).includes("ava@northwind.example"));
        } finally {
          errors.restore();
        }
      },
    );
  });

  it("keeps the submission successful when Resend rejects the message", async () => {
    await withEnv(
      {
        RESEND_API_KEY: "re_test_key",
        ZOHO_CRM_FUNCTION_EXECUTE_URL: "https://zoho.example/execute",
      },
      async () => {
        const errors = captureConsole("error");
        globalThis.fetch = async (input) => {
          const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
          if (url === "https://api.resend.com/emails") {
            return new Response(JSON.stringify({ message: "Invalid from", name: "invalid_from_address" }), {
              status: 422,
              headers: { "content-type": "application/json" },
            });
          }
          return new Response(JSON.stringify({ code: "success" }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        };

        try {
          const response = await POST(
            new Request("https://www.growthsparkco.com/api/lead", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(sampleLead()),
            }),
          );
          assert.equal(response.status, 200);
          const body = (await response.json()) as { success: boolean };
          assert.equal(body.success, true);
          assert.ok(errors.calls.length > 0);
        } finally {
          errors.restore();
        }
      },
    );
  });

  it("rejects an invalid form before Zoho or email", async () => {
    let called = false;
    globalThis.fetch = async () => {
      called = true;
      throw new Error("should not fetch");
    };
    const response = await POST(
      new Request("https://www.growthsparkco.com/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(sampleLead({ firstName: "  " })),
      }),
    );
    assert.equal(response.status, 400);
    assert.equal(called, false);
  });
});
