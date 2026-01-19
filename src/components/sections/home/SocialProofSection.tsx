"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Star, Quote, TrendingUp, Users, Calendar, Target } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  company: string;
  location: string;
  image?: string;
  quote: string;
  result: string;
  date: string;
}

interface SocialProofSectionProps {
  dict: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    stats: {
      websites: { value: string; label: string };
      leads: { value: string; label: string };
      avgLeads: { value: string; label: string };
      satisfaction: { value: string; label: string };
    };
    testimonials: Testimonial[];
    cta: string;
  };
}

const statIcons = [Target, TrendingUp, Users, Star];

export function SocialProofSection({ dict }: SocialProofSectionProps) {
  const stats = [
    { ...dict.stats.websites, icon: Target },
    { ...dict.stats.leads, icon: TrendingUp },
    { ...dict.stats.avgLeads, icon: Users },
    { ...dict.stats.satisfaction, icon: Star },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <Container className="relative z-10">
        {/* Stats Counter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center p-6 rounded-2xl bg-card/50 border border-border/50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            {dict.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-semibold mb-4">
            {dict.title}{" "}
            <span className="bg-gradient-to-r from-primary to-accent-hover bg-clip-text text-transparent">
              {dict.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dict.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={staggerItem}
              className="bg-card border border-border rounded-2xl p-6 relative group hover:border-primary/50 transition-colors"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Result highlight */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 mb-6">
                <div className="flex items-center gap-2 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{testimonial.result}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}, {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{testimonial.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
