"use client";

import { Container } from "@/components/shared/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface FAQSectionProps {
  dict: {
    badge: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
}

export function FAQSection({ dict }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <Container>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.span
                variants={staggerItem}
                className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 block"
              >
                {dict.badge}
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25]"
              >
                {dict.title}
              </motion.h2>
            </div>

            {/* Accordion in glass card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-white/[0.06] backdrop-blur-sm bg-white/[0.02] p-5 md:p-8"
            >
              <Accordion type="single" collapsible className="w-full">
                {dict.items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium hover:text-primary transition-colors py-4 gap-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-[1.7] pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
