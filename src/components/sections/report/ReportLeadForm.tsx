"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Loader2, CheckCircle, AlertCircle, FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface ReportLeadFormProps {
  lang: Locale;
  reportSlug: string;
  reportNiche: string;
  reportCity: string;
  defaultCity: string;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    websitePlaceholder: string;
    cityPlaceholder: string;
    gdpr: string;
    gdprLink: string;
    submit: string;
    success: string;
    successMessage: string;
    error: string;
    validationEmail: string;
    validationRequired: string;
  };
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ReportLeadForm({
  lang,
  reportSlug,
  reportNiche,
  reportCity,
  defaultCity,
  dict,
}: ReportLeadFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = dict.validationEmail;
    }
    if (!website.trim()) {
      errs.website = dict.validationRequired;
    }
    if (!city.trim()) {
      errs.city = dict.validationRequired;
    }
    if (!gdprConsent) {
      errs.gdpr = dict.validationRequired;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/report-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          city,
          reportSlug,
          reportNiche,
          reportCity,
          lang,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0F1A14] to-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <FileText className="h-3.5 w-3.5" />
              {dict.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {dict.title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {dict.subtitle}
            </p>
          </motion.div>

          {/* Success state */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 rounded-2xl border border-primary/20 bg-primary/5"
            >
              <CheckCircle className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.success}</h3>
              <p className="text-muted-foreground text-sm px-6">
                {dict.successMessage}
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeUp}
              className="space-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8"
            >
              <Input
                type="email"
                placeholder={dict.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={fieldErrors.email || undefined}
              />

              <Input
                placeholder={dict.websitePlaceholder}
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, website: "" }));
                }}
                error={fieldErrors.website || undefined}
              />

              <Input
                placeholder={dict.cityPlaceholder}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, city: "" }));
                }}
                error={fieldErrors.city || undefined}
              />

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id={`report-gdpr-${reportSlug}`}
                  checked={gdprConsent}
                  onCheckedChange={(checked) => {
                    setGdprConsent(checked as boolean);
                    setFieldErrors((prev) => ({ ...prev, gdpr: "" }));
                  }}
                  error={fieldErrors.gdpr || undefined}
                />
                <label
                  htmlFor={`report-gdpr-${reportSlug}`}
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {dict.gdpr}{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="text-primary hover:underline"
                  >
                    {dict.gdprLink}
                  </a>
                </label>
              </div>
              {fieldErrors.gdpr && (
                <p className="text-sm text-red-500">{fieldErrors.gdpr}</p>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{dict.error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                size="lg"
                className="w-full"
              >
                {status === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  dict.submit
                )}
              </Button>
            </motion.form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
