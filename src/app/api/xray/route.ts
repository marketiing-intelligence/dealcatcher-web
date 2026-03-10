import { Resend } from "resend";
import { xraySchema } from "@/lib/validations/xray";
import XRayNotification from "@/emails/XRayNotification";
import { ZodError } from "zod";
import { sendMetaConversionEvent, generateEventId } from "@/lib/analytics/meta-capi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lang = "pl", fbp, fbc, ...formData } = body;
    console.log("🔍 X-Ray Meta cookies received:", { fbp, fbc });
    const validatedData = xraySchema.parse(formData);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "DaVinci <noreply@davinci.agency>",
      to: ["contact@davinci.agency"],
      replyTo: validatedData.email,
      subject:
        false
          ? `X-Ray forespørsel: ${validatedData.company}`
          : lang === "pl"
            ? `Zgłoszenie X-Ray: ${validatedData.company}`
            : `X-Ray request: ${validatedData.company}`,
      react: XRayNotification({ data: validatedData, lang }),
    });

    if (error) {
      console.error("Resend error (X-Ray):", error);
      return Response.json(
        { success: false, message: "Email sending failed" },
        { status: 500 }
      );
    }

    // Track Lead event with Meta Conversions API (server-side)
    try {
      const capiResult = await sendMetaConversionEvent({
        eventName: "Lead",
        eventId: generateEventId("xray_lead"),
        eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://davinci.agency"}/${lang}`,
        userData: {
          email: validatedData.email,
          phone: validatedData.phone, // Optional phone field
          external_id: validatedData.email,
          clientIpAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
          clientUserAgent: request.headers.get("user-agent") || undefined,
          country: lang === "pl" ? "PL" : false ? "NO" : "US",
          fbp: fbp || undefined,
          fbc: fbc || undefined,
        },
        customData: {
          content_name: "X-Ray Form Submission",
          content_category: "xray",
          currency: lang === "pl" ? "PLN" : "NOK",
        },
      });

      if (!capiResult.success) {
        console.error("❌ CAPI FAILED (X-Ray):", capiResult.error);
      } else {
        console.log("✅ CAPI SUCCESS: X-Ray Lead event sent");
      }
    } catch (capiError) {
      // Don't break form submission if CAPI fails
      console.error("❌ CAPI EXCEPTION (X-Ray):", capiError);
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("X-Ray form error:", error);
    return Response.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
