"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { formatNumber, formatCpc, competitionColor, groupColorClasses } from "@/lib/reports/helpers";
import { t } from "@/lib/reports/types";
import { Search, Globe, AlertTriangle } from "lucide-react";
import type { KeywordGroup } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface KeywordsSectionProps {
  groups: KeywordGroup[];
  lang: Locale;
  currency: string;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    volume: string;
    competition: string;
    cpc: string;
    groupTotal: string;
    nationalBadge?: string;
    nationalNote?: string;
  };
  nicheLower: string;
  city: string;
  disclaimer?: string;
}

export function KeywordsSection({ groups, lang, currency, dict, nicheLower, city, disclaimer }: KeywordsSectionProps) {
  const subtitle = dict.subtitle
    .replaceAll("{nicheLower}", nicheLower)
    .replaceAll("{city}", city);

  const hasRestricted = groups.some((g) => g.keywords.some((kw) => kw.adRestricted));

  return (
    <section id="keywords" className="py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <Search className="w-4 h-4" />
            {dict.badge}
          </span>
          <h2 className="mb-4">{dict.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {disclaimer && hasRestricted && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-3xl mx-auto mb-6"
          >
            <div className="flex gap-3 items-start p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 text-sm text-amber-200/80 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>{disclaimer}</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="multiple" defaultValue={[groups[0]?.id ?? ""]}>
            {groups.map((group) => {
              const colors = groupColorClasses(group.color);
              const groupName = t(group, lang, "name");
              const isNational = group.isNational === true;

              return (
                <AccordionItem key={group.id} value={group.id} className="border-border">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${isNational ? "bg-amber-400" : colors.dot} shrink-0`} />
                      <span className="font-semibold text-base">{groupName}</span>
                      {isNational && dict.nationalBadge && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Globe className="w-3 h-3" />
                          {dict.nationalBadge}
                        </span>
                      )}
                      <span className={`ml-auto mr-4 text-xs px-2 py-0.5 rounded-full ${isNational ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : `${colors.bg} ${colors.text} ${colors.border}`} border`}>
                        {dict.groupTotal}: {formatNumber(group.totalVolume, lang)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {isNational && dict.nationalNote && (
                      <p className="text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2 mb-4">
                        {dict.nationalNote}
                      </p>
                    )}
                    {t(group, lang, "description") && (
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {t(group, lang, "description")}
                      </p>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground">
                            <th className="text-left py-2 pr-4 font-medium">Keyword</th>
                            {lang === "en" && (
                              <th className="text-left py-2 pr-4 font-medium hidden sm:table-cell">Translation</th>
                            )}
                            <th className="text-right py-2 pr-4 font-medium">{dict.volume}</th>
                            <th className="text-center py-2 pr-4 font-medium hidden sm:table-cell">{dict.competition}</th>
                            <th className="text-right py-2 font-medium">{dict.cpc}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.keywords.map((kw) => (
                            <tr key={kw.keyword} className={`border-b border-border/50 last:border-0 ${kw.adRestricted ? "opacity-60" : ""}`}>
                              <td className="py-2.5 pr-4 font-mono text-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                  {kw.keyword}
                                  {kw.adRestricted && (
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-label="Ad restrictions may apply" />
                                  )}
                                </span>
                              </td>
                              {lang === "en" && (
                                <td className="py-2.5 pr-4 text-muted-foreground hidden sm:table-cell">{kw.translation}</td>
                              )}
                              <td className="py-2.5 pr-4 text-right font-mono">{formatNumber(kw.volume, lang)}</td>
                              <td className="py-2.5 pr-4 text-center hidden sm:table-cell">
                                <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${competitionColor(kw.competition)}`}>
                                  {kw.competition}
                                </span>
                              </td>
                              <td className="py-2.5 text-right font-mono">{formatCpc(kw.cpc, lang, currency)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
