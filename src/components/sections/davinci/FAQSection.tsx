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
    <section className="py-20 md:py-32 relative overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            {dict.badge}
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-12 leading-tight"
          >
            {dict.title}
          </motion.h2>

          {/* FAQ Accordion in glassmorphism card */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8"
          >
            <Accordion type="single" collapsible className="w-full">
              {dict.items.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/[0.06]">
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
