import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Rocket } from "lucide-react";
import { t } from "@/lib/reports/types";
import type { Tip } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface TipsSectionProps {
  tips: Tip[];
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export function TipsSection({ tips, lang, dict }: TipsSectionProps) {
  return (
    <section id="tips" className="py-20 md:py-28">
      <Container>
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <Rocket className="w-4 h-4" />
            {dict.badge}
          </span>
          <h2 className="mb-4">{dict.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{dict.subtitle}</p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-4">
          {tips.map((tip, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-6 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary font-clash">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold">{t(tip, lang, "title")}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {t(tip, lang, "tag")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(tip, lang, "text")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
