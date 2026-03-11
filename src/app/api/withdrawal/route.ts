import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendDiscordNotification } from "@/lib/discord";

export async function POST(request: Request) {
  try {
    const { serviceDescription, orderedOn, consumerName, consumerAddress, date, lang } =
      await request.json();

    if (!serviceDescription || !orderedOn || !consumerName || !consumerAddress || !date) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "DaVinci <noreply@davinci.agency>",
        to: ["contact@davinci.agency"],
        subject: `[WITHDRAWAL] ${consumerName} — ${date}`,
        html: `
          <h2>Withdrawal Request</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Name</td>
              <td style="padding: 8px 12px;">${consumerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Address</td>
              <td style="padding: 8px 12px;">${consumerAddress}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Service</td>
              <td style="padding: 8px 12px;">${serviceDescription}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Ordered on</td>
              <td style="padding: 8px 12px;">${orderedOn}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Withdrawal date</td>
              <td style="padding: 8px 12px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Language</td>
              <td style="padding: 8px 12px;">${lang}</td>
            </tr>
          </table>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 14px;">Process this withdrawal within 14 days as required by law.</p>
        `,
      });
    }

    await sendDiscordNotification(
      `⚠️ **Odstąpienie od umowy!**\n👤 ${consumerName}\n📋 ${serviceDescription}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Withdrawal form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
