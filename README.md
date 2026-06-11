# Growth Spark Co. Website

Production-ready marketing site for [Growth Spark Co.](https://growthsparkco.com) — business expansion capital for growing companies.

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

`POST /api/lead` — validates submissions and forwards leads to Zoho CRM function `twl_campaign`.

### Zoho environment variable

Copy `.env.example` to `.env.local` and set:

```bash
ZOHO_CRM_FUNCTION_EXECUTE_URL=https://www.zohoapis.com/crm/v7/functions/twl_campaign/actions/execute?auth_type=apikey&zapikey=YOUR_KEY
```

Use the REST API URL from Zoho CRM → **Setup** → **Developer Space** → **Functions** → `twl_campaign` → **REST API**. Add the same variable in your hosting provider (e.g. Vercel) for production.

Field mapping is in `src/lib/zoho.ts`. If your Deluge function expects different argument names, update `buildZohoLeadArguments()` to match.

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
