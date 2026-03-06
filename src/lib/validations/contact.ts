import { z } from "zod";

// Schema with custom error messages (will be overridden by i18n in form)
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(), // Optional phone field for better CAPI Event Match Quality
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, "GDPR consent is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Validation messages for i18n
export const getValidationMessages = (lang: "en" | "no" | "pl") => {
  const messages = {
    en: {
      nameRequired: "Name is required",
      emailInvalid: "Invalid email address",
      messageMin: "Message must be at least 10 characters",
      gdprRequired: "GDPR consent is required",
    },
    no: {
      nameRequired: "Navn er påkrevd",
      emailInvalid: "Ugyldig e-postadresse",
      messageMin: "Meldingen må være minst 10 tegn",
      gdprRequired: "GDPR-samtykke er påkrevd",
    },
    pl: {
      nameRequired: "Imię jest wymagane",
      emailInvalid: "Nieprawidłowy adres e-mail",
      messageMin: "Wiadomość musi mieć co najmniej 10 znaków",
      gdprRequired: "Zgoda RODO jest wymagana",
    },
  };
  return messages[lang];
};
