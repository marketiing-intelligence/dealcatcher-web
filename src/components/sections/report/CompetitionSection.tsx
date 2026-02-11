"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/reports/types";
import type { SerpKeyword } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface CompetitionSectionProps {
  serpKeywords: SerpKeyword[];
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    organicTitle: string;
    mapsTitle: string;
    rank: string;
    domain: string;
    business: string;
    rating: string;
    reviews: string;
    noMaps: string;
  };
}

export function CompetitionSection({ serpKeywords, lang, dict }: CompetitionSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = serpKeywords[activeTab];

  return (
    <section id="competition" className="py-20 md:py-28 bg-gradient-to-b from-[#0A0A0A] to-[#141414]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <Trophy className="w-4 h-4" />
            {dict.badge}
          </span>
          <h2 className="mb-4">{dict.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{dict.subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          {/* Keyword tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {serpKeywords.map((sk, i) => (
              <button
                key={sk.keyword}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border",
                  i === activeTab
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-card text-muted-foreground border-border hover:border-border-hover"
                )}
              >
                {sk.keyword}
                {sk.volume > 0 && (
                  <span className="ml-2 text-xs opacity-60">{sk.volume}/mo</span>
                )}
              </button>
            ))}
          </div>

          {active && (
            <div className={cn("grid gap-6", active.maps.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1")}>
              {/* Organic results */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-400 text-xs font-bold">G</span>
                  </div>
                  {dict.organicTitle}
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 w-8 font-medium">{dict.rank}</th>
                      <th className="text-left py-2 font-medium">{dict.domain}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.organic.map((r) => (
                      <tr key={r.rank} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 text-muted-foreground font-mono">{r.rank}</td>
                        <td className="py-2.5 font-mono text-foreground">{r.domain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Maps results or empty state */}
              {active.maps.length > 0 ? (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-green-500/10 flex items-center justify-center">
                      <MapPinIcon />
                    </div>
                    {dict.mapsTitle}
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="text-left py-2 w-8 font-medium">{dict.rank}</th>
                        <th className="text-left py-2 font-medium">{dict.business}</th>
                        <th className="text-right py-2 font-medium">{dict.rating}</th>
                        <th className="text-right py-2 font-medium">{dict.reviews}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {active.maps.map((m) => (
                        <tr key={m.rank} className="border-b border-border/50 last:border-0">
                          <td className="py-2.5 text-muted-foreground font-mono">{m.rank}</td>
                          <td className="py-2.5 text-foreground text-xs">{m.title}</td>
                          <td className="py-2.5 text-right">
                            {m.rating > 0 ? (
                              <span className="inline-flex items-center gap-1 text-amber-400">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span className="text-xs font-mono">{m.rating}</span>
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground/50">—</span>
                            )}
                          </td>
                          <td className="py-2.5 text-right text-muted-foreground font-mono text-xs">
                            {m.reviews > 0 ? m.reviews : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl p-6 flex items-center">
                  <div>
                    <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-green-500/10 flex items-center justify-center">
                        <MapPinIcon />
                      </div>
                      {dict.mapsTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">{dict.noMaps}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Keyword insight */}
          {active && (
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground">
                {t(active, lang, "insight")}
              </p>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
