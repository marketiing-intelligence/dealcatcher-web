"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Shield, RefreshCw, Scale, Check } from "lucide-react";

const reasons = [
  {
    icon: Scale,
    title: "We Know Norwegian Law",
    points: [
      "Deep understanding of WCAG 2.0 AA requirements",
      "Experience with Tilsynet compliance expectations",
      "Up-to-date with regulatory changes",
    ],
  },
  {
    icon: RefreshCw,
    title: "Ongoing Compliance",
    points: [
      "Monthly automated compliance scans",
      "Proactive issue detection",
      "Updates when regulations change",
    ],
  },
  {
    icon: Shield,
    title: "Compliance Guarantee",
    points: [
      "100% WCAG 2.0 AA compliant delivery",
      "We fix any issues we missed for free",
      "Documentation for audit defense",
    ],
  },
];

export function TrustSection() {
  return (
    <section className="py-20 md:py-32 bg-[#141414]">
      <Container>
        <SectionHeading
          badge="Why Us"
          title="Your compliance partner"
          subtitle="We don't just build websites. We ensure long-term legal compliance."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={staggerItem}
              className="group"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <reason.icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl md:text-2xl mb-4">{reason.title}</h3>

              <ul className="space-y-3">
                {reason.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
