import crypto from "crypto";

/**
 * Meta Conversions API (CAPI) utility for server-side event tracking
 *
 * Features:
 * - Server-side event tracking (backup for client-side Pixel)
 * - Event deduplication (same event from Pixel and CAPI counted once)
 * - User data hashing (SHA256 for privacy)
 * - Automatic IP and user agent capture
 *
 * Required env variables:
 * - NEXT_PUBLIC_META_PIXEL_ID (Pixel ID)
 * - META_CONVERSION_API_ACCESS_TOKEN (Access Token from Meta Events Manager)
 * - META_CONVERSION_API_TEST_CODE (optional, for testing)
 */

interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  external_id?: string; // External user ID (e.g., email hash, user_id) for better attribution
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string; // Facebook click ID (from _fbc cookie)
  fbp?: string; // Facebook browser ID (from _fbp cookie)
}

interface MetaCustomData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}

interface MetaEventParams {
  eventName: string;
  eventId: string; // For deduplication with client-side Pixel
  eventSourceUrl: string;
  userData: MetaUserData;
  customData?: MetaCustomData;
  actionSource?: "website" | "email" | "phone_call";
}

/**
 * Hash data using SHA256 (required by Meta CAPI)
 */
function hashData(data: string): string {
  return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex");
}

/**
 * Normalize and hash user data for Meta CAPI
 */
function normalizeUserData(userData: MetaUserData) {
  const normalized: Record<string, any> = {};

  // Hash email (required format: lowercase, trimmed)
  if (userData.email) {
    normalized.em = hashData(userData.email);
  }

  // Hash phone (required format: remove spaces, dashes, parentheses)
  if (userData.phone) {
    const cleanPhone = userData.phone.replace(/[\s\-\(\)]/g, "");
    normalized.ph = hashData(cleanPhone);
  }

  // Hash first name (optional)
  if (userData.firstName) {
    normalized.fn = hashData(userData.firstName);
  }

  // Hash last name (optional)
  if (userData.lastName) {
    normalized.ln = hashData(userData.lastName);
  }

  // Hash city (optional)
  if (userData.city) {
    normalized.ct = hashData(userData.city);
  }

  // Hash country (ISO 3166-1 alpha-2, e.g., "PL", "NO")
  if (userData.country) {
    normalized.country = hashData(userData.country);
  }

  // Hash zip code (optional)
  if (userData.zipCode) {
    normalized.zp = hashData(userData.zipCode);
  }

  // Hash external_id (user ID from your system for better attribution)
  if (userData.external_id) {
    normalized.external_id = hashData(userData.external_id);
  }

  // Client IP and User Agent (NOT hashed)
  if (userData.clientIpAddress) {
    normalized.client_ip_address = userData.clientIpAddress;
  }

  if (userData.clientUserAgent) {
    normalized.client_user_agent = userData.clientUserAgent;
  }

  // Facebook click ID (from _fbc cookie, NOT hashed)
  if (userData.fbc) {
    normalized.fbc = userData.fbc;
  }

  // Facebook browser ID (from _fbp cookie, NOT hashed)
  if (userData.fbp) {
    normalized.fbp = userData.fbp;
  }

  return normalized;
}

/**
 * Send event to Meta Conversions API
 *
 * @param params Event parameters
 * @returns Response from Meta CAPI
 *
 * Example usage in API route:
 *
 * ```ts
 * import { sendMetaConversionEvent } from "@/lib/analytics/meta-capi";
 *
 * // In your API route handler
 * await sendMetaConversionEvent({
 *   eventName: "Lead",
 *   eventId: `lead_${Date.now()}_${Math.random()}`, // Unique ID for deduplication
 *   eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
 *   userData: {
 *     email: formData.email,
 *     phone: formData.phone,
 *     clientIpAddress: req.headers.get("x-forwarded-for") || req.ip,
 *     clientUserAgent: req.headers.get("user-agent"),
 *   },
 *   customData: {
 *     content_name: "Contact Form Submission",
 *   },
 * });
 * ```
 */
export async function sendMetaConversionEvent(
  params: MetaEventParams
): Promise<{ success: boolean; error?: string }> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSION_API_ACCESS_TOKEN;
  const testEventCode = process.env.META_CONVERSION_API_TEST_CODE;

  if (!pixelId || !accessToken) {
    console.warn(
      "Meta CAPI: Missing NEXT_PUBLIC_META_PIXEL_ID or META_CONVERSION_API_ACCESS_TOKEN"
    );
    return { success: false, error: "Missing credentials" };
  }

  const endpoint = `https://graph.facebook.com/v21.0/${pixelId}/events`;

  const eventData = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
    event_id: params.eventId, // For deduplication with client-side Pixel
    event_source_url: params.eventSourceUrl,
    action_source: params.actionSource || "website",
    user_data: normalizeUserData(params.userData),
    custom_data: params.customData || {},
  };

  const payload: Record<string, any> = {
    data: [eventData],
    access_token: accessToken,
  };

  // Add test_event_code if provided (for testing in Events Manager)
  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);
      return { success: false, error: result.error?.message || "Unknown error" };
    }

    console.log("Meta CAPI event sent:", params.eventName, params.eventId);
    return { success: true };
  } catch (error) {
    console.error("Meta CAPI request failed:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Generate unique event ID for deduplication
 * Use the same ID for client-side Pixel and server-side CAPI
 *
 * Example:
 * const eventId = generateEventId("lead");
 * // Client-side: fbq('track', 'Lead', {}, { eventID: eventId });
 * // Server-side: sendMetaConversionEvent({ eventId, ... });
 */
export function generateEventId(prefix: string = "event"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}
