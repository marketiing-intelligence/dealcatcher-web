import { Resend } from "resend";
import { ZodError, z } from "zod";
import { sendMetaConversionEvent, generateEventId } from "@/lib/analytics/meta-capi";

const prototypeSchema = z.object({
  // Contact
  email: z.string().email(),
  phone: z.string().min(9),

  // Business info
  companyName: z.string().min(2),
  industry: z.string().min(3),
  currentWebsite: z.string().optional(),

  // Project specifics
  language: z.enum(["pl", "en", "no"]),
  targetAudience: z.enum(["b2b", "b2c", "b2g"]),

  // Services & USP
  service1: z.string().min(3),
  service2: z.string().min(3),
  service3: z.string().min(3),
  usp: z.string().min(10),

  // Branding
  hasLogo: z.enum(["yes", "no"]),
  brandingLink: z.string().optional(),

  // Page structure
  goal: z.enum(["info", "form", "consultation", "sales"]),

  // References
  inspirationUrl: z.string().optional(),

  // Additional
  additionalInfo: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lang = "pl", fbp, fbc, ...formData } = body;
    console.log("🔍 Meta cookies received:", { fbp, fbc }); // Debug: check if cookies are available
    const validatedData = prototypeSchema.parse(formData);

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Labels
    const languageLabels = {
      pl: "Polski",
      en: "Angielski",
      no: "Norweski",
    };

    const audienceLabels = {
      b2b: "B2B (Business to Business)",
      b2c: "B2C (Business to Consumer)",
      b2g: "B2G (Business to Government)",
    };

    const goalLabels = {
      info: "Strona informacyjna / wizytówka",
      form: "Wypełnienie formularza kontaktowego",
      consultation: "Umówienie konsultacji / wizyty",
      sales: "Sprzedaż produktu / usługi",
    };


    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          h1 { color: #10B981; border-bottom: 3px solid #10B981; padding-bottom: 10px; }
          h2 { color: #059669; margin-top: 30px; border-left: 4px solid #10B981; padding-left: 10px; }
          .section { background: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .label { font-weight: bold; color: #555; }
          .service-list { background: white; padding: 15px; margin: 10px 0; border-left: 3px solid #10B981; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e5e5; color: #666; font-size: 12px; }
          .highlight { background: #FEF3C7; padding: 15px; border-radius: 5px; border-left: 4px solid #F59E0B; }
        </style>
      </head>
      <body>
        <h1>🎨 Nowe zgłoszenie: Prototyp strony</h1>

        <h2>📧 Dane kontaktowe</h2>
        <div class="section">
          <p><span class="label">Email:</span> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
          <p><span class="label">Telefon:</span> +48 ${validatedData.phone}</p>
        </div>

        <h2>🏢 Informacje o firmie</h2>
        <div class="section">
          <p><span class="label">Nazwa firmy:</span> ${validatedData.companyName}</p>
          <p><span class="label">Branża:</span> ${validatedData.industry}</p>
          ${validatedData.currentWebsite ? `<p><span class="label">Obecna strona:</span> <a href="${validatedData.currentWebsite}" target="_blank">${validatedData.currentWebsite}</a></p>` : ""}
        </div>

        <h2>🌍 Projekt</h2>
        <div class="section">
          <p><span class="label">Język strony:</span> ${languageLabels[validatedData.language]}</p>
          <p><span class="label">Grupa docelowa:</span> ${audienceLabels[validatedData.targetAudience]}</p>
          <p><span class="label">Cel strony:</span> ${goalLabels[validatedData.goal]}</p>
        </div>

        <h2>💼 Usługi (3 główne)</h2>
        <div class="service-list">
          <p>1️⃣ ${validatedData.service1}</p>
          <p>2️⃣ ${validatedData.service2}</p>
          <p>3️⃣ ${validatedData.service3}</p>
        </div>

        <h2>⭐ USP (Główna korzyść)</h2>
        <div class="highlight">
          <p>${validatedData.usp}</p>
        </div>

        <h2>🎨 Branding</h2>
        <div class="section">
          <p><span class="label">Posiada logo:</span> ${validatedData.hasLogo === "yes" ? "✅ Tak" : "❌ Nie"}</p>
          ${validatedData.hasLogo === "yes" && validatedData.brandingLink ? `<p><span class="label">Link do brandingu:</span> <a href="${validatedData.brandingLink}" target="_blank">${validatedData.brandingLink}</a></p>` : ""}
          ${validatedData.hasLogo === "no" ? `<p style="color:#F59E0B;">⚠️ Dobierzemy kolory odpowiednie dla branży</p>` : ""}
        </div>

        ${validatedData.inspirationUrl ? `
          <h2>💡 Inspiracje</h2>
          <div class="section">
            <p><span class="label">Strona którą lubią:</span> <a href="${validatedData.inspirationUrl}" target="_blank">${validatedData.inspirationUrl}</a></p>
          </div>
        ` : ""}

        ${validatedData.additionalInfo ? `
          <h2>📝 Dodatkowe informacje</h2>
          <div class="section">
            <p>${validatedData.additionalInfo.replace(/\n/g, "<br>")}</p>
          </div>
        ` : ""}

        <div class="footer">
          <p>Wysłano z formularza: <a href="https://dealcatcher.io/pl/formularz">dealcatcher.io/pl/formularz</a></p>
          <p>Data: ${new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })}</p>
        </div>
      </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: "DealCatcher Prototyp <noreply@dealcatcher.io>",
      to: ["contact@dealcatcher.io"],
      replyTo: validatedData.email,
      subject: `🎨 Prototyp: ${validatedData.companyName} (${validatedData.industry})`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Email sending failed" },
        { status: 500 }
      );
    }

    // Track Lead event with Meta Conversions API (server-side)
    try {
      const capiResult = await sendMetaConversionEvent({
        eventName: "Lead",
        eventId: generateEventId("prototype_lead"),
        eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://dealcatcher.io"}/${lang}/formularz`,
        userData: {
          email: validatedData.email,
          phone: validatedData.phone,
          external_id: validatedData.email, // Use email as external_id for better attribution
          clientIpAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
          clientUserAgent: request.headers.get("user-agent") || undefined,
          country: "PL", // Prototyp form is Polish only
          fbp: fbp || undefined, // Facebook Browser ID
          fbc: fbc || undefined, // Facebook Click ID
        },
        customData: {
          content_name: "Prototype Form Submission",
          content_category: "prototype_request",
          value: 3500, // Average prototype value in PLN
          currency: "PLN",
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

    console.error("Prototype form error:", error);
    return Response.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
