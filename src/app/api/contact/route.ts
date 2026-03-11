import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import ContactNotification from "@/emails/ContactNotification";
import { ZodError } from "zod";
import { sendMetaConversionEvent, generateEventId } from "@/lib/analytics/meta-capi";
import { sendDiscordNotification } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lang = "en", fbp, fbc, ...formData } = body;
    console.log("🔍 Meta cookies received:", { fbp, fbc }); // Debug: check if cookies are available
    const validatedData = contactSchema.parse(formData);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "DaVinci <noreply@davinci.agency>",
      to: ["contact@davinci.agency"],
      replyTo: validatedData.email,
      subject:
        false
          ? `Ny melding fra ${validatedData.name}`
          : lang === "pl"
            ? `Nowa wiadomość od ${validatedData.name}`
            : `New message from ${validatedData.name}`,
      react: ContactNotification({ data: validatedData, lang }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Email sending failed" },
        { status: 500 }
      );
    }

    await sendDiscordNotification(
      `📩 **Nowa wiadomość kontaktowa!**\n👤 ${validatedData.name}\n📧 ${validatedData.email}`
    );

    // Track Lead event with Meta Conversions API (server-side)
    try {
      const capiResult = await sendMetaConversionEvent({
        eventName: "Lead",
        eventId: generateEventId("contact_lead"),
        eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://davinci.agency"}/${lang}/contact`,
        userData: {
          email: validatedData.email,
          phone: validatedData.phone, // Optional phone field (improves Event Match Quality)
          external_id: validatedData.email, // Use email as external_id for better attribution
          clientIpAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
          clientUserAgent: request.headers.get("user-agent") || undefined,
          country: lang === "pl" ? "PL" : false ? "NO" : "US", // Infer country from language
          fbp: fbp || undefined, // Facebook Browser ID
          fbc: fbc || undefined, // Facebook Click ID
        },
        customData: {
          content_name: "Contact Form Submission",
          content_category: "contact",
          currency: lang === "pl" ? "PLN" : "NOK",
        },
      });

      if (!capiResult.success) {
        console.error("❌ CAPI FAILED:", capiResult.error);
      } else {
        console.log("✅ CAPI SUCCESS: Lead event sent");
      }
    } catch (capiError) {
      // Don't break form submission if CAPI fails
      console.error("❌ CAPI EXCEPTION:", capiError);
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return Response.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
