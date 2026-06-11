# HomeCalcify — Production Deployment

Next.js 14 (App Router). Recommended host: **Vercel** (built by the Next.js team; zero-config).

---

## 1. Environment variables

| Variable | Required? | Purpose | Example |
|---|---|---|---|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Optional | Google AdSense publisher ID. When unset, ad slots render labeled placeholders and the AdSense script is **not** loaded. | `ca-pub-1234567890123456` |
| `NODE_ENV` | Auto | Set to `production` automatically by Vercel/`next build`. Do not set manually. | — |

There are **no required secrets** to get a working deployment. The site builds and runs fully without `NEXT_PUBLIC_ADSENSE_CLIENT`; add it once AdSense is approved.

> Note: the canonical site URL is currently hardcoded in `src/lib/schema.ts` (`SITE_URL = "https://homecalcify.com"`). It's already correct for production — no env needed.

---

## 2. Deploy with the Vercel CLI (fastest)

From the project folder (`C:\Users\Ali\Desktop\Homecalfiy`):

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# one-time: install the CLI globally
npm i -g vercel

# log in (opens your browser — use GitHub/Google/email)
vercel login

# first deploy → creates a *preview* URL (e.g. homecalcify-xxx.vercel.app)
vercel

# when the preview looks good, promote to production
vercel --prod
```

`vercel` auto-detects Next.js — accept the defaults. After `vercel login`, the rest is non-interactive.

To set the AdSense env var (optional, later):
```powershell
vercel env add NEXT_PUBLIC_ADSENSE_CLIENT production
# paste your ca-pub-... value, then redeploy:
vercel --prod
```

---

## 3. Or deploy via GitHub (nice for auto-deploys)

1. Push this repo to a new GitHub repository.
2. On vercel.com → **Add New → Project → Import** the repo.
3. Framework preset: **Next.js** (auto). Build command `next build`, output auto.
4. Add `NEXT_PUBLIC_ADSENSE_CLIENT` under Project → Settings → Environment Variables (optional).
5. Deploy. Every push to `main` then auto-deploys.

---

## 4. Custom domain (replacing the WordPress site)

> ⚠️ Do this **after** verifying the preview URL. Back up WordPress (full export + DB) first so you can roll back.

1. Vercel → Project → **Settings → Domains → Add** `homecalcify.com` (and `www`).
2. Vercel shows the DNS records to set at your registrar:
   - Apex `homecalcify.com` → **A** record to Vercel's IP (Vercel displays it), or an ALIAS/ANAME if your DNS supports it.
   - `www` → **CNAME** to `cname.vercel-dns.com`.
3. Update those records at your domain registrar / DNS provider. Propagation: minutes to a few hours.
4. Vercel issues HTTPS automatically once DNS resolves.

This is the moment the site cuts over from WordPress to this app.

---

## 5. Post-deploy checklist

- [ ] All 41 pages load on the preview URL (calculators, hubs, guides, company, legal).
- [ ] Calculators compute and update live on mobile.
- [ ] `https://<domain>/sitemap.xml` and `/robots.txt` return correctly.
- [ ] Run **PageSpeed Insights** (pagespeed.web.dev) on the live homepage + a calculator page for real-world Core Web Vitals.
- [ ] Add the AdSense env var once approved, then `vercel --prod`.
- [ ] Submit the site in Google Search Console and add the sitemap.
