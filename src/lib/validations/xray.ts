import { z } from "zod";

export const xraySchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(2, "Company name required"),
  companySize: z.enum(["1-10", "10-20", "20-50", "50-100", "100+"]),
  problem: z.string().min(20, "Please describe your challenge (min 20 characters)"),
  phone: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, "Consent required"),
});

export type XRayFormData = z.infer<typeof xraySchema>;
