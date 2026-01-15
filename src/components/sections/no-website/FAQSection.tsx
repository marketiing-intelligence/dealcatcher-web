"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const faqs = [
  {
    question: "I don't need a website — I have enough work from referrals",
    answer:
      "That's great! But a website lets you choose better jobs and charge higher prices. When clients see your professional online presence, they're willing to pay premium rates. Plus, referrals dry up eventually — a website gives you a consistent stream of new leads.",
  },
  {
    question: "It's too expensive",
    answer:
      "A website pays for itself after 1-2 new clients. If you charge $500+ per job, the $1,000 investment is covered almost immediately. Plus, the monthly plan is less than what you'd pay for a single hour of work — and it includes hosting, maintenance, and compliance monitoring.",
  },
  {
    question: "I don't have time for this",
    answer:
      "We designed the process specifically for busy craftsmen. The brief takes 15 minutes. One 15-minute call. That's it. We handle absolutely everything else — design, development, hosting, domain setup, and ongoing maintenance. You don't need to learn anything technical.",
  },
  {
    question: "I have a Facebook page — isn't that enough?",
    answer:
      "Facebook is a complement, not a replacement for a website. Google doesn't index Facebook profiles well. AI assistants like ChatGPT can't recommend you based on your Facebook page. And many clients expect a 'real' business to have its own website — a Facebook-only presence can look unprofessional.",
  },
  {
    question: "Can I update the website myself?",
    answer:
      "You don't need to. Content changes are included in the Premium plan (unlimited) or available on request for the Basic plan. Just email us what you want changed, and we'll do it within 24 hours. No technical skills required on your end.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "You can cancel the monthly plan anytime — no questions asked. If you cancel, you keep ownership of your domain. We'll help you migrate to another provider if needed. We're confident you'll stay because the value is obvious, but there's zero lock-in.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-32 bg-[#141414]">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Common questions"
          subtitle="Still have questions? Email us at hello@dealcatcher.io"
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
