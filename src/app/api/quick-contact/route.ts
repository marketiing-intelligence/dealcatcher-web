import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { phone, lang } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Only send email if API key is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "DealCatcher <noreply@dealcatcher.io>",
        to: ["contact@dealcatcher.io"],
        subject: `[QUICK LEAD] Callback Request - ${phone}`,
        html: `
          <h2>New Quick Contact Lead!</h2>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Language:</strong> ${lang}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr />
          <p><em>This lead requested a callback. Call them within 2 hours as promised!</em></p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quick contact error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
