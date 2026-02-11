import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { ReportSource } from "@/lib/reports/types";

interface ReportFooterProps {
  sources: ReportSource[];
  dataDate: string;
  dict: {
    title: string;
    description: string;
    sourceLabel: string;
  };
}

export function ReportFooter({ sources, dataDate, dict }: ReportFooterProps) {
  const description = dict.description.replace("{dataDate}", dataDate);

  return (
    <section className="py-12 border-t border-border">
      <Container>
        <AnimatedSection className="max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {dict.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{description}</p>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {dict.sourceLabel}
            </h4>
            <ul className="space-y-1.5">
              {sources.map((source, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors underline underline-offset-2"
                    >
                      {source.name}
                    </a>
                  ) : (
                    source.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
