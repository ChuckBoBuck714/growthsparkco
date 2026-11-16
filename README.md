# Growth Spark Co. Website

Production-ready marketing site for [Growth Spark Co.](https://www.growthsparkco.com) — business expansion capital for growing companies. The apex domain redirects to this www host.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Reusable React components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with lead form |
| `/about` | Company overview |
| `/how-it-works` | Three-step process |
| `/faq` | Full FAQ |
| `/contact` | Contact info + lead form |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/disclaimer` | Disclaimer |

## Lead Form API

`POST /api/lead` — validates submissions, forwards leads to Zoho CRM function `twl_campaign`, and emails a notification. Zoho and email run independently: a mail failure still returns success when Zoho accepts the lead, and a Zoho failure still attempts the email. An invalid form does not call either.

### Environment variables

Copy `.env.example` to `.env.local`. Set the same variables in Vercel for production.

```bash
ZOHO_CRM_FUNCTION_EXECUTE_URL=https://www.zohoapis.com/crm/v7/functions/twl_campaign/actions/execute?auth_type=apikey&zapikey=YOUR_KEY
RESEND_API_KEY=re_xxxxxxxx
# Optional. Defaults shown in .env.example.
LEAD_EMAIL_FROM=Growth Spark Co. Leads <leads@growthsparkco.com>
LEAD_NOTIFY_TO=cs@growthsparkco.com
```

Use the REST API URL from Zoho CRM → **Setup** → **Developer Space** → **Functions** → `twl_campaign` → **REST API**.

Field mapping is in `src/lib/zoho.ts`. If your Deluge function expects different argument names, update `buildZohoLeadArguments()` to match.

There is no other email provider in this repo. Notifications use [Resend](https://resend.com). `RESEND_API_KEY` is required to send. If it is missing, the API logs a warning and skips the email. `LEAD_EMAIL_FROM` defaults to `Growth Spark Co. Leads <leads@growthsparkco.com>`. `LEAD_NOTIFY_TO` defaults to `cs@growthsparkco.com` and accepts a comma-separated list.

The from-address domain has to be verified in Resend (Domains → add `growthsparkco.com`, then the DNS records Resend shows: DKIM, SPF via TXT and MX or the newer CNAME records). Copy those records exactly. Until the domain is verified, Resend rejects mail from `@growthsparkco.com`; the form and the Zoho push still succeed. Reply-To is the applicant's email.

## Legal Pages

Privacy Policy, Terms & Conditions, and Disclaimer content is sourced from counsel-provided documents in `src/lib/legal-content.tsx`. **Have legal counsel review before launch.**

## Configuration

Update placeholders in `src/lib/constants.ts`:

- `SITE_PHONE`
- `SITE_EMAIL`

## Build

```bash
npm run build
npm start
```
