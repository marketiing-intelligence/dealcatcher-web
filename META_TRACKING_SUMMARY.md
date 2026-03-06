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

**Data Sent:** Email (hashed), Phone (hashed), IP, User Agent, Country, Content metadata

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

---

## 📊 Next Steps

- Create Custom Audiences (InitiateCheckout, BookingInitiated)
- Create Lookalike Audiences (Lead event)
- Optimize campaigns for "Lead" conversion

See [META_SETUP.md](META_SETUP.md) for detailed instructions.
