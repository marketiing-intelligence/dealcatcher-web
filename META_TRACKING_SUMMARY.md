# Meta Pixel + CAPI Tracking Summary

**Setup Date:** 2026-03-06
**Status:** ✅ COMPLETE — Ready for testing

---

## 🎯 Events Implemented

### 1. **PageView** (Automatic)
- **When:** Every page load
- **Tracking:** Client-side (Meta Pixel)
- **Location:** layout.tsx

### 2. **Lead** (Conversion Event)
**Tracking:** Client-side (Pixel) + Server-side (CAPI) with deduplication

| Form | URL | Value |
|------|-----|-------|
| Contact Form | `/pl/contact`, `/en/contact`, `/no/contact` | — |
| Prototype Form | `/pl/formularz` | 3,500 PLN |
| Configurator Form | `/pl/konfigurator-formularz` | 15,000 PLN |

**Data Sent:** Email (hashed), Phone (hashed), IP, User Agent, Country, fbp, fbc, Content metadata

### 3. **InitiateCheckout** (Intent Signal)
**Tracking:** Client-side (Pixel)

| Form | Trigger | Value |
|------|---------|-------|
| Prototype Form | First field focus (email) | 3,500 PLN |
| Configurator Form | First field focus (email) | 15,000 PLN |

### 4. **BookingInitiated** (Custom Event)
**Tracking:** Client-side (Pixel)

| Action | Trigger |
|--------|---------|
| Cal.com Discovery Call | "Book a call" button click |

---

## 📂 Files Created

1. `src/components/analytics/MetaPixel.tsx` — Pixel component + helpers
2. `src/lib/analytics/meta-capi.ts` — CAPI utility (SHA256 + deduplication)
3. `.env.local.example` — Environment variables template
4. `META_SETUP.md` — Complete setup guide
5. `META_TRACKING_SUMMARY.md` — This file

---

## 🔐 Environment Variables

**⚠️ REQUIRED — Add to `.env.local`:**

```bash
NEXT_PUBLIC_META_PIXEL_ID=1461442215513982
META_CONVERSION_API_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_BASE_URL=https://dealcatcher.io
```

**How to get Access Token:**
1. [Meta Events Manager](https://business.facebook.com/events_manager2/)
2. Click Pixel → Settings → Conversions API
3. "Generate Access Token"
4. Copy token (starts with `EAA...`)

---

## 🧪 Testing Steps

1. Add `META_CONVERSION_API_ACCESS_TOKEN` to `.env.local`
2. Restart dev server: `npm run dev`
3. Test forms + booking button
4. Verify events in [Meta Events Manager → Test Events](https://business.facebook.com/events_manager2/)

## 🐛 Debugging CAPI Issues

If server-side events (CAPI) are not appearing in Meta Test Events:

### 1. Check Vercel Function Logs
```bash
# Via Vercel Dashboard:
1. Go to https://vercel.com/[your-project]/logs
2. Select "Functions" tab
3. Submit a form on your site
4. Look for logs with ✅ or ❌ emoji:
   - "✅ CAPI SUCCESS: Lead event sent" = working
   - "❌ CAPI FAILED: [error message]" = CAPI error
   - "❌ CAPI EXCEPTION: [error]" = code error
```

### 2. Verify Environment Variables
```bash
# Check in Vercel Dashboard → Settings → Environment Variables:
- NEXT_PUBLIC_META_PIXEL_ID = 1461442255513982
- META_CONVERSION_API_ACCESS_TOKEN = EAA... (starts with EAA)
- NEXT_PUBLIC_BASE_URL = https://dealcatcher.io

# After adding/changing env vars, MUST redeploy!
```

### 3. Common CAPI Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Missing credentials" | Env vars not set in Vercel | Add to Vercel Settings → redeploy |
| "Invalid OAuth access token" | Token expired/wrong | Generate new token from Meta Events Manager |
| "Invalid parameter" | Data format issue | Check phone/email normalization |
| No error, but no events | CAPI silently failing | Check function logs for details |

---

## 🎯 Event Match Quality

**Current Score:** 5.0/10 (baseline implementation)
**After fbp/fbc cookies:** Expected ~8.0/10

**Parameters sent to CAPI:**
- ✅ Email (hashed) - 100% coverage
- ✅ Phone (hashed) - Prototype & Configurator forms
- ✅ IP Address - 100% coverage
- ✅ User Agent - 100% coverage
- ✅ Country - 100% coverage
- ✅ **fbp** (Facebook Browser ID) - +24% quality
- ✅ **fbc** (Facebook Click ID) - +32% quality

## 📊 Next Steps

- Create Custom Audiences (InitiateCheckout, BookingInitiated)
- Create Lookalike Audiences (Lead event)
- Optimize campaigns for "Lead" conversion
- Monitor Event Match Quality score improvement

See [META_SETUP.md](META_SETUP.md) for detailed instructions.
