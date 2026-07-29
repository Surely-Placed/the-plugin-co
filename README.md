# The Plugin

Marketing site and payments stack for **[theplugin.world](https://theplugin.world)** — digital growth services for businesses and career coaching for international graduates in the UK.

| Layer | Stack | Host |
|-------|--------|------|
| Frontend | React 19 · Vite · TypeScript · Tailwind | Vercel |
| Payments API | Express · Knex · PostgreSQL · Razorpay | Fly.io (`the-plugin-payments`) |
| Database | Neon PostgreSQL (`theplugin` DB, schema `the_plugin`) | Neon |
| Contact form | Vercel serverless (`api/contact.mjs`) + SMTP | Vercel |

---

## Architecture

```
Browser (theplugin.world)
  │
  ├─ Static SPA + contact form ──► Vercel
  │                                   ├─ /api/contact          (SMTP)
  │                                   └─ /api/webhook/razorpay (proxy)
  │                                            │
  ├─ POST /api/payments/orders  ───────────────┼──► Fly.io payments API
  ├─ POST /api/payments/verify  ───────────────┘
  └─ Razorpay Checkout (checkout.js)
        │
        └─ webhook ──► theplugin.world/api/webhook/razorpay
                              └─► Fly /api/webhooks/razorpay
                                    ├─ HMAC verify
                                    ├─ Update Neon DB
                                    └─ Team + customer emails
```

**Security notes**
- Razorpay Key Secret and webhook secret live only on the Fly backend.
- Checkout Key ID is returned per order from the API (never baked into the frontend).
- CORS is locked to `FRONTEND_ORIGIN`.

---

## Repository layout

```
├── src/                    # React frontend
├── public/                 # Static assets, _headers
├── api/                    # Vercel serverless
│   ├── contact.mjs
│   └── webhook/razorpay.mjs
├── server/                 # Payments API (Fly.io)
│   ├── src/
│   ├── migrations/
│   ├── Dockerfile
│   └── fly.toml
├── scripts/                # Build helpers (WebP, route-meta)
├── vercel.json
└── .env.example
```

---

## Prerequisites

- Node.js **22+**
- npm
- PostgreSQL (local) or a Neon connection string
- [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) (backend deploys)
- Razorpay test/live API keys (payments)

---

## Frontend

### Local setup

```bash
npm install
cp .env.example .env
# Edit .env — at minimum set VITE_PAYMENTS_API_URL if running the API locally
npm run dev
```

App runs at **http://localhost:5173**.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | WebP conversion + TypeScript + production build |
| `npm run preview` | Preview production build |
| `npm run images:webp` | Convert images under `images and visuals/` |

### Key frontend env (`.env`)

See `.env.example`. Important variables:

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical site URL |
| `VITE_PAYMENTS_API_URL` | Payments API base (`http://localhost:8080` locally) |
| `VITE_CONTACT_API_URL` | Contact endpoint (`/api/contact` in production) |
| `VITE_CALENDLY_30_URL` / `VITE_CALENDLY_60_URL` | Booking links |
| `VITE_GTM_ID`, `VITE_GA4_ID`, … | Analytics (optional) |
| `SMTP_*`, `CONTACT_*` | Used by Vercel contact API (server-side on Vercel) |
| `PAYMENTS_API_URL` | Fly URL for the webhook proxy (Vercel runtime, not `VITE_`) |

`VITE_*` values are baked in at **build time** — change them on Vercel and redeploy.

### Main routes

| Path | Purpose |
|------|---------|
| `/` | Homepage |
| `/for-businesses/*` | Growth services, pricing, case studies |
| `/for-talent/*` | Career coaching |
| `/blog`, `/blog/:slug` | Articles |
| `/contact`, `/book/*` | Contact & booking |
| `/payment/success`, `/payment/failure` | Checkout result pages |
| `/privacy-policy`, `/terms-and-conditions`, `/refund-cancellation-policy` | Legal |

Legacy `/growth/*` and `/careers/*` permanently redirect to `/for-businesses/*` and `/for-talent/*`.

---

## Backend (payments API)

Located in `server/`.

### Local setup

```bash
cd server
npm install
cp .env.example .env.development
# Set DATABASE_URL (or DB_* parts), Razorpay test keys, FRONTEND_ORIGIN, SMTP
npm run migrate:latest
npm run dev
```

API runs at **http://localhost:8080**. Health check: `GET /health` → `{ "ok": true }`.

Env files: `.env.development` / `.env.production` (loaded by `NODE_ENV`). See `server/.env.example`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Nodemon + TypeScript watch |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled server |
| `npm run migrate:latest` | Apply Knex migrations |
| `npm run migrate:rollback` | Rollback last batch |

### Required backend env

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres connection string |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API keys |
| `RAZORPAY_WEBHOOK_SECRET` | Must match Razorpay Dashboard webhook secret |
| `FRONTEND_ORIGIN` | CORS allowlist (e.g. `https://theplugin.world`) |
| `PORT` | Default `8080` |
| `SITE_URL` | Used in email links |
| `SMTP_*` / `CONTACT_*` | Payment confirmation emails |
| `SENTRY_DSN` | Optional error monitoring |

### Database

- Neon database name: `theplugin`
- App tables live in schema **`the_plugin`** (search path: `the_plugin`, `public`)
- Migration history stays in **`public.knex_migrations`** (configured via `schemaName: "public"` in `knexfile.ts`)

Tables: `plans`, `customers`, `orders`, `payments`, `payment_events`, `idempotency_keys`.

Amounts are in **GBP minor units** (pence). Currency is GBP throughout checkout.

### API endpoints

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/health` | Liveness |
| `POST` | `/api/payments/orders` | Header `Idempotency-Key` required |
| `POST` | `/api/payments/verify` | Header `Idempotency-Key` required |
| `GET` | `/api/payments/orders/:id` | Order status for result pages |
| `POST` | `/api/webhooks/razorpay` | Raw body + `x-razorpay-signature` |

### Local webhook testing

```bash
ngrok http 8080
# Point Razorpay Test webhook at:
# https://xxxx.ngrok-free.app/api/webhooks/razorpay
```

Generate a webhook secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Deployment

### Frontend → Vercel

1. Connect the GitHub repo to Vercel (root directory).
2. Set production env vars (at least):

   ```
   VITE_SITE_URL=https://theplugin.world
   VITE_PAYMENTS_API_URL=https://the-plugin-payments.fly.dev
   PAYMENTS_API_URL=https://the-plugin-payments.fly.dev
   VITE_CONTACT_API_URL=/api/contact
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=...
   SMTP_APP_PASSWORD=...
   CONTACT_TO_EMAIL=grow@theplugin.world
   CONTACT_FROM_EMAIL=grow@theplugin.world
   ```

3. Deploy. `vercel.json` provides:
   - SPA rewrite (except `/api/*`)
   - Permanent redirects (`/growth` → `/for-businesses`, blog URL renames, etc.)
   - CSP allowing Razorpay scripts/frames
   - Contact + webhook serverless functions under `api/`

Push to the connected branch to redeploy. **Redeploy after any `VITE_*` change.**

### Backend → Fly.io

App: **`the-plugin-payments`** · Region: **`lhr`** · Org: as configured in your Fly account.

```bash
cd server
fly auth login

# First time only
fly apps create the-plugin-payments

# Set secrets (never commit these)
fly secrets set \
  DATABASE_URL="postgresql://..." \
  RAZORPAY_KEY_ID="rzp_live_..." \
  RAZORPAY_KEY_SECRET="..." \
  RAZORPAY_WEBHOOK_SECRET="..." \
  RAZORPAY_WEBHOOK_URL="https://theplugin.world/api/webhook/razorpay" \
  FRONTEND_ORIGIN="https://theplugin.world" \
  SITE_URL="https://theplugin.world" \
  SMTP_HOST="smtp.gmail.com" \
  SMTP_PORT="587" \
  SMTP_USER="grow@theplugin.world" \
  SMTP_APP_PASSWORD="..." \
  CONTACT_TO_EMAIL="grow@theplugin.world" \
  CONTACT_FROM_EMAIL="grow@theplugin.world" \
  SENTRY_DSN="https://..." \
  --app the-plugin-payments

fly deploy --app the-plugin-payments
```

On boot the Docker image runs migrations, then starts the API:

```text
npx tsx ... migrate:latest && node dist/index.js
```

`fly.toml` keeps **`min_machines_running = 1`** so checkout is not cold-started.

Verify:

```bash
curl https://the-plugin-payments.fly.dev/health
fly status --app the-plugin-payments
fly logs --app the-plugin-payments
```

### Razorpay Dashboard (production)

| Setting | Value |
|---------|--------|
| Live API keys | Set as Fly secrets |
| Webhook URL | `https://theplugin.world/api/webhook/razorpay` |
| Webhook secret | Same as `RAZORPAY_WEBHOOK_SECRET` |
| Events | `payment.captured`, `payment.failed` |

The Vercel function at `/api/webhook/razorpay` forwards the **raw body** and signature to Fly `/api/webhooks/razorpay`.

### Production reference

| Item | Value |
|------|--------|
| Site | https://theplugin.world |
| Payments API | https://the-plugin-payments.fly.dev |
| Public webhook | https://theplugin.world/api/webhook/razorpay |
| Fly webhook | https://the-plugin-payments.fly.dev/api/webhooks/razorpay |
| Currency | GBP |

---

## Payments checkout flow

1. User submits checkout form on the site.
2. Frontend `POST /api/payments/orders` with `Idempotency-Key`.
3. Backend creates a Razorpay order, stores customer/order rows, returns `keyId` + `razorpayOrderId`.
4. Frontend opens Razorpay Checkout.
5. On success → `POST /api/payments/verify` → navigate to `/payment/success`.
6. Webhook `payment.captured` also marks the order paid and sends confirmation emails (team + customer).

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Checkout never opens | Missing/wrong `VITE_PAYMENTS_API_URL`, or CSP blocking Razorpay |
| CORS errors | `FRONTEND_ORIGIN` on Fly does not match the site origin |
| Webhook 401 | Secret mismatch between Dashboard and `RAZORPAY_WEBHOOK_SECRET` |
| Fly machine restart loop | Migration history / schema mismatch — ensure `knex_migrations` stays in `public` |
| Contact form fails | SMTP App Password / Vercel SMTP env missing |
| Stale frontend config | Changed `VITE_*` without redeploying Vercel |

---

## License

Private — The Plugin. All rights reserved.
