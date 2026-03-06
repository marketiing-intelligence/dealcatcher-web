import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendMetaConversionEvent, generateEventId } from "@/lib/analytics/meta-capi";

export async function POST(request: Request) {
  try {
    const { email, website, city, reportSlug, reportNiche, reportCity, lang } =
      await request.json();

    if (!email || !website || !city) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const websiteUrl = website.startsWith("http")
        ? website
        : `https://${website}`;

      await resend.emails.send({
        from: "DealCatcher <noreply@dealcatcher.io>",
        to: ["contact@dealcatcher.io"],
        replyTo: email,
        subject: `[REPORT LEAD] ${website} — ${city}`,
        html: `
          <h2>New Report Lead</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 8px 12px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Website</td>
              <td style="padding: 8px 12px;"><a href="${websiteUrl}">${website}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">City</td>
              <td style="padding: 8px 12px;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Viewed report</td>
              <td style="padding: 8px 12px;">${reportNiche} in ${reportCity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Report link</td>
              <td style="padding: 8px 12px;"><a href="https://dealcatcher.io/${lang}/reports/${reportSlug}">Open report</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Time</td>
              <td style="padding: 8px 12px;">${new Date().toISOString()}</td>
            </tr>
          </table>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 14px;">This person wants a personalized report for their business. Follow up within 24 hours.</p>
        `,
      });
    }

    // Track Lead event with Meta Conversions API (server-side)
    await sendMetaConversionEvent({
      eventName: "Lead",
      eventId: generateEventId("report_lead"),
      eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://dealcatcher.io"}/${lang}/reports/${reportSlug}`,
      userData: {
        email,
        clientIpAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
        clientUserAgent: request.headers.get("user-agent") || undefined,
        city,
        country: lang === "pl" ? "PL" : lang === "no" ? "NO" : "US", // Infer country from language
      },
      customData: {
        content_name: `Report Lead - ${reportNiche} in ${reportCity}`,
        content_category: "report_download",
        currency: lang === "pl" ? "PLN" : "NOK",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Report lead error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
