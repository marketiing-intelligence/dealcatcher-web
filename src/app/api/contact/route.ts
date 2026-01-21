import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import ContactNotification from "@/emails/ContactNotification";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lang = "en", ...formData } = body;
    const validatedData = contactSchema.parse(formData);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "DealCatcher <noreply@dealcatcher.io>",
      to: ["contact@dealcatcher.io"],
      replyTo: validatedData.email,
      subject:
        lang === "no"
          ? `Ny melding fra ${validatedData.name}`
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
