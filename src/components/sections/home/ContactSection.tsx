"use client";

import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { GradientText } from "@/components/ui/gradient-text";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { Mail, Clock, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface ContactSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      gdpr: string;
      gdprLink: string;
      submit: string;
      sending: string;
      success: string;
      successMessage: string;
      error: string;
    };
    validation: {
      nameRequired: string;
      emailInvalid: string;
      messageMin: string;
      gdprRequired: string;
    };
    info: {
      email: string;
      emailValue: string;
      responseTime: string;
      responseValue: string;
      location: string;
      locationValue: string;
    };
  };
}

export function ContactSection({ lang, dict }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              {dict.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-semibold mb-6">
              {dict.title}{" "}
              <GradientText>{dict.titleHighlight}</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {dict.subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{dict.info.email}</p>
                  <a
                    href={`mailto:${dict.info.emailValue}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {dict.info.emailValue}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {dict.info.responseTime}
                  </p>
                  <p className="text-foreground">{dict.info.responseValue}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {dict.info.location}
                  </p>
                  <p className="text-foreground">{dict.info.locationValue}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10"
          >
            <ContactForm
              lang={lang}
              dict={{ form: dict.form, validation: dict.validation }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
