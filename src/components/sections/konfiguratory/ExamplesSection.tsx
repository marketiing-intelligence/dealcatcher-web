"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface ExamplesSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      industry: string;
      title: string;
      description: string;
      url: string;
      image?: string;
      aspectRatio?: string;
      testimonial?: {
        quote: string;
        author: string;
        role: string;
      };
    }>;
  };
}

export function ExamplesSection({ lang, dict }: ExamplesSectionProps) {
  return (
    <section id="examples" className="py-20 md:py-32">
      <Container>
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
          align="center"
        />

        <div className="grid gap-8 max-w-6xl mx-auto">
          {dict.items.map((example, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ delay: index * 0.2 }}
            >
              <div className="rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-2xl">
                {/* Image */}
                {example.image && (
                  <div
                    className="relative w-full overflow-hidden bg-muted"
                    style={{ aspectRatio: example.aspectRatio || '21/9' }}
                  >
                    <img
                      src={example.image}
                      alt={example.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Industry badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full uppercase tracking-wide mb-4">
                    {example.industry}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    {example.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {example.description}
                  </p>

                  {/* Testimonial */}
                  {example.testimonial && (
                    <div className="border-l-4 border-primary pl-6 py-2 bg-muted/30 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-foreground italic mb-3 leading-relaxed">
                            "{example.testimonial.quote}"
                          </p>
                          <div className="text-sm">
                            <p className="font-semibold text-foreground">
                              {example.testimonial.author}
                            </p>
                            <p className="text-muted-foreground">
                              {example.testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-8">
                    <Button asChild size="lg" className="group">
                      <Link href={`/${lang}${example.url}`}>
                        Przeczytaj więcej
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
