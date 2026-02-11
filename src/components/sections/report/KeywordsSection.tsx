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
import { Search } from "lucide-react";
import type { KeywordGroup } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface KeywordsSectionProps {
  groups: KeywordGroup[];
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    volume: string;
    competition: string;
    cpc: string;
    groupTotal: string;
  };
  nicheLower: string;
  city: string;
}

export function KeywordsSection({ groups, lang, dict, nicheLower, city }: KeywordsSectionProps) {
  const subtitle = dict.subtitle
    .replaceAll("{nicheLower}", nicheLower)
    .replaceAll("{city}", city);

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
              const groupName = lang === "no" ? group.nameNO : group.nameEN;

              return (
                <AccordionItem key={group.id} value={group.id} className="border-border">
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${colors.dot} shrink-0`} />
                      <span className="font-semibold text-base">{groupName}</span>
                      <span className={`ml-auto mr-4 text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {dict.groupTotal}: {formatNumber(group.totalVolume, lang)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
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
                            <tr key={kw.keyword} className="border-b border-border/50 last:border-0">
                              <td className="py-2.5 pr-4 font-mono text-foreground">{kw.keyword}</td>
                              {lang === "en" && (
                                <td className="py-2.5 pr-4 text-muted-foreground hidden sm:table-cell">{kw.translation}</td>
                              )}
                              <td className="py-2.5 pr-4 text-right font-mono">{formatNumber(kw.volume, lang)}</td>
                              <td className="py-2.5 pr-4 text-center hidden sm:table-cell">
                                <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${competitionColor(kw.competition)}`}>
                                  {kw.competition}
                                </span>
                              </td>
                              <td className="py-2.5 text-right font-mono">{formatCpc(kw.cpc, lang)}</td>
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
