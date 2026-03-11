import { Resend } from "resend";
import { ZodError, z } from "zod";
import { sendMetaConversionEvent, generateEventId } from "@/lib/analytics/meta-capi";
import { sendDiscordNotification } from "@/lib/discord";

const configuratorSchema = z.object({
  // Contact
  email: z.string().email(),
  phone: z.string().min(9),

  // Business info
  companyName: z.string().min(2),
  industry: z.string().min(3),

  // Product specifics
  productType: z.string().min(3),
  configuratorOptions: z.string().min(10),
  variantsCount: z.enum(["10-50", "50-200", "200+"]),

  // Assets
  hasAssets: z.enum(["photos", "3d", "none"]),
  assetsLink: z.string().optional(),

  // Features
  showPricing: z.enum(["yes", "no"]),

  // Target audience
  targetAudience: z.enum(["b2b", "b2c", "both"]),

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
    const validatedData = configuratorSchema.parse(formData);

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Labels
    const audienceLabels = {
      b2b: "B2B (sprzedaż firmom)",
      b2c: "B2C (sprzedaż konsumentom)",
      both: "B2B + B2C (oba segmenty)",
    };

    const variantsLabels = {
      "10-50": "10-50 kombinacji (prosty)",
      "50-200": "50-200 kombinacji (średnio złożony)",
      "200+": "200+ kombinacji (bardzo złożony)",
    };

    const assetsLabels = {
      photos: "✅ Tak, mam zdjęcia produktu",
      "3d": "✅ Tak, mam modele 3D",
      none: "❌ Nie, potrzebuję sesji foto/modelu 3D",
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
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e5e5; color: #666; font-size: 12px; }
          .highlight { background: #FEF3C7; padding: 15px; border-radius: 5px; border-left: 4px solid #F59E0B; }
        </style>
      </head>
      <body>
        <h1>🎮 Nowe zgłoszenie: Konfigurator produktu</h1>

        <h2>📧 Dane kontaktowe</h2>
        <div class="section">
          <p><span class="label">Email:</span> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
          <p><span class="label">Telefon:</span> +48 ${validatedData.phone}</p>
        </div>

        <h2>🏢 Informacje o firmie</h2>
        <div class="section">
          <p><span class="label">Nazwa firmy:</span> ${validatedData.companyName}</p>
          <p><span class="label">Branża:</span> ${validatedData.industry}</p>
          <p><span class="label">Grupa docelowa:</span> ${audienceLabels[validatedData.targetAudience]}</p>
        </div>

        <h2>📦 Produkt</h2>
        <div class="section">
          <p><span class="label">Typ produktu:</span> ${validatedData.productType}</p>
          <p><span class="label">Złożoność:</span> ${variantsLabels[validatedData.variantsCount]}</p>
        </div>

        <h2>⚙️ Opcje konfiguratora</h2>
        <div class="highlight">
          <p>${validatedData.configuratorOptions.replace(/\n/g, "<br>")}</p>
        </div>

        <h2>🎨 Materiały wizualne</h2>
        <div class="section">
          <p><span class="label">Dostępność materiałów:</span> ${assetsLabels[validatedData.hasAssets]}</p>
          ${validatedData.hasAssets !== "none" && validatedData.assetsLink ? `<p><span class="label">Link do materiałów:</span> <a href="${validatedData.assetsLink}" target="_blank">${validatedData.assetsLink}</a></p>` : ""}
        </div>

        <h2>💰 Funkcjonalność</h2>
        <div class="section">
          <p><span class="label">Pokazywać cenę w czasie rzeczywistym:</span> ${validatedData.showPricing === "yes" ? "✅ Tak" : "❌ Nie (wycena mailem)"}</p>
        </div>

        ${validatedData.inspirationUrl ? `
          <h2>💡 Inspiracje</h2>
          <div class="section">
            <p><span class="label">Konfigurator którym się inspirują:</span> <a href="${validatedData.inspirationUrl}" target="_blank">${validatedData.inspirationUrl}</a></p>
          </div>
        ` : ""}

        ${validatedData.additionalInfo ? `
          <h2>📝 Dodatkowe informacje</h2>
          <div class="section">
            <p>${validatedData.additionalInfo.replace(/\n/g, "<br>")}</p>
          </div>
        ` : ""}

        <div class="footer">
          <p>Wysłano z formularza: <a href="https://davinci.agency/pl/konfigurator-formularz">davinci.agency/pl/konfigurator-formularz</a></p>
          <p>Data: ${new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })}</p>
        </div>
      </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: "DaVinci Konfigurator <noreply@davinci.agency>",
      to: ["contact@davinci.agency"],
      replyTo: validatedData.email,
      subject: `🎮 Konfigurator: ${validatedData.companyName} — ${validatedData.productType}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Email sending failed" },
        { status: 500 }
      );
    }

    await sendDiscordNotification(
      `🎮 **Nowe zgłoszenie: Konfigurator!**\n🏢 ${validatedData.companyName}\n📧 ${validatedData.email}\n📦 ${validatedData.productType}`
    );

    // Track Lead event with Meta Conversions API (server-side)
    try {
      const capiResult = await sendMetaConversionEvent({
        eventName: "Lead",
        eventId: generateEventId("configurator_lead"),
        eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://davinci.agency"}/${lang}/konfigurator-formularz`,
        userData: {
          email: validatedData.email,
          phone: validatedData.phone,
          external_id: validatedData.email, // Use email as external_id for better attribution
          clientIpAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
          clientUserAgent: request.headers.get("user-agent") || undefined,
          country: "PL", // Configurator form is Polish only
          fbp: fbp || undefined, // Facebook Browser ID
          fbc: fbc || undefined, // Facebook Click ID
        },
        customData: {
          content_name: "Configurator Form Submission",
          content_category: "configurator_request",
          value: 15000, // Average configurator value in PLN
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

    console.error("Configurator form error:", error);
    return Response.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
