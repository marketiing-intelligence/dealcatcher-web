# Meta Pixel + Conversions API Setup Guide

## ✅ What's Been Done

### 1. Client-Side Tracking (Meta Pixel)
- ✅ Created `MetaPixel` component ([src/components/analytics/MetaPixel.tsx](src/components/analytics/MetaPixel.tsx))
- ✅ Added to layout.tsx for automatic PageView tracking
- ✅ Includes helper functions: `trackMetaEvent()` and `trackMetaCustomEvent()`

### 2. Server-Side Tracking (Conversions API)
- ✅ Created CAPI utility ([src/lib/analytics/meta-capi.ts](src/lib/analytics/meta-capi.ts))
- ✅ Automatic user data hashing (SHA256) for privacy compliance
- ✅ Event deduplication between Pixel and CAPI
- ✅ IP address and User Agent capture

### 3. Lead Event Tracking
- ✅ Contact Form API ([src/app/api/contact/route.ts](src/app/api/contact/route.ts)) - sends "Lead" event
- ✅ Report Lead Form API ([src/app/api/report-lead/route.ts](src/app/api/report-lead/route.ts)) - sends "Lead" event

---

## 🔧 Setup Instructions

### Step 1: Get Meta Credentials

1. **Open Meta Events Manager**
   👉 [https://business.facebook.com/events_manager2/](https://business.facebook.com/events_manager2/)

2. **Get Pixel ID** (already done ✅)
   - Your Pixel ID: `1461442215513982`

3. **Generate Conversions API Access Token**
   - Click your Pixel → **Settings**
   - Scroll to **"Conversions API"** section
   - Click **"Generate Access Token"**
   - Copy the token (starts with `EAA...`)

4. **(Optional) Get Test Event Code**
   - Go to **Test Events** tab in Events Manager
   - Copy the Test Event Code
   - Use this to test events before production

---

### Step 2: Update Environment Variables

1. **Copy `.env.local.example` to `.env.local`**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your credentials to `.env.local`**
   ```bash
   # Already configured
   NEXT_PUBLIC_META_PIXEL_ID=1461442215513982

   # Add this (from Step 1.3)
   META_CONVERSION_API_ACCESS_TOKEN=EAA...your_token_here

   # Optional: for testing
   META_CONVERSION_API_TEST_CODE=TEST12345

   # Base URL
   NEXT_PUBLIC_BASE_URL=https://dealcatcher.io
   ```

3. **Restart your dev server**
   ```bash
   npm run dev
   ```

---

### Step 3: Test Events

1. **Open Meta Events Manager → Test Events**
   👉 [https://business.facebook.com/events_manager2/](https://business.facebook.com/events_manager2/)

2. **If using Test Event Code:**
   - Add `META_CONVERSION_API_TEST_CODE` to `.env.local`
   - Events will appear in **Test Events** tab (not real data)

3. **Test the forms:**
   - Go to your contact page: `https://dealcatcher.io/en/contact`
   - Fill out the form and submit
   - Go to a report page: `https://dealcatcher.io/en/reports/[slug]`
   - Fill out the report lead form

4. **Verify in Events Manager:**
   - Check **Test Events** tab (if using test code)
   - Or check **Events** tab (production events)
   - You should see "Lead" events appearing

5. **Check Event Match Quality:**
   - In Events Manager → Overview
   - Look for **Event Match Quality** score
   - Aim for "Good" or "Excellent" (green)
   - If low, ensure email/phone are being sent correctly

---

## 📊 Events Being Tracked

### Automatic Events
- **PageView** - tracked on every page load (client-side Pixel)

### Conversion Events
- **Lead** - triggered when:
  - Contact form submitted ([/api/contact](src/app/api/contact/route.ts))
  - Report lead form submitted ([/api/report-lead](src/app/api/report-lead/route.ts))

### Event Parameters Sent
- `email` (hashed with SHA256)
- `city` (hashed with SHA256)
- `country` (inferred from language: PL/NO/US)
- `clientIpAddress` (from request headers)
- `clientUserAgent` (from request headers)
- `content_name` (e.g., "Contact Form Submission")
- `content_category` (e.g., "contact", "report_download")
- `currency` (PLN for Polish, NOK for Norwegian)

---

## 🎯 Next Steps

### For Testing
1. Add `META_CONVERSION_API_TEST_CODE` to `.env.local`
2. Submit test forms
3. Verify events in Test Events tab
4. Remove test code when ready for production

### For Production
1. Remove or leave empty `META_CONVERSION_API_TEST_CODE`
2. Deploy to Vercel/production
3. Add production env variables in Vercel dashboard
4. Verify events in Events Manager → Events tab

### Additional Tracking (Optional)
You can add more custom events using the helper functions:

```tsx
import { trackMetaEvent, trackMetaCustomEvent } from "@/components/analytics/MetaPixel";

// Standard event
trackMetaEvent("ViewContent", {
  content_name: "Homepage",
  content_category: "page"
});

// Custom event
trackMetaCustomEvent("CalculatorUsed", {
  value: 5000,
  currency: "PLN"
});
```

---

## 🔍 Troubleshooting

### Events not showing in Events Manager?
1. Check that `NEXT_PUBLIC_META_PIXEL_ID` is set
2. Check that `META_CONVERSION_API_ACCESS_TOKEN` is set
3. Check browser console for errors
4. Verify Pixel is loading (Meta Pixel Helper extension)

### Low Event Match Quality?
1. Ensure email is being sent (hashed)
2. Add more user data fields (phone, name, city)
3. Check that IP address is being captured correctly

### Client-side events work but server-side doesn't?
1. Check `META_CONVERSION_API_ACCESS_TOKEN` is correct
2. Check server logs for CAPI errors
3. Verify API endpoint is reachable from server

---

## 📚 Resources

- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Event Deduplication Guide](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [Meta Events Manager](https://business.facebook.com/events_manager2/)
