import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { Container } from "@/components/shared/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    en: "Mirco Case Study — B2B Expansion Strategy | DaVinci",
    pl: "Case Study Mirco — Strategia Ekspansji B2B | DaVinci",
  };
  const descriptions: Record<Locale, string> = {
    en: "How we built a complete B2B sales infrastructure for a Polish racing seat manufacturer: 400+ qualified partners, 3 sales channels, custom tools in 8 weeks.",
    pl: "Jak zbudowaliśmy kompletną infrastrukturę sprzedażową B2B dla polskiego producenta foteli wyścigowych: 400+ partnerów, 3 kanały sprzedaży, narzędzia w 8 tygodni.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/case-study/mirco"),
  };
}

export default async function MircoCaseStudyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.mircoCaseStudy;

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20 pb-20">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-[#0A0A0A]">
          <Container>
            <Link
              href={`/${lang}/portfolio`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToPortfolio}
            </Link>

            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full uppercase tracking-wide mb-6">
                {t.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t.hero.title}{" "}
                <span className="text-gradient bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {t.hero.description}
              </p>

              {/* Company Details */}
              <div className="flex flex-wrap gap-4 mb-12">
                {t.hero.companyDetails.map((detail, idx) => (
                  <span key={idx} className="text-sm text-muted-foreground">
                    {detail}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {t.hero.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Image */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="/images/examples/mirco-configurator.png"
                  alt="Mirco Konfigurator Fotela - Real-time 3D Product Configurator"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Problem */}
        <section className="py-20 md:py-32 bg-[#141414]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.problem.title}</h2>

              <div className="space-y-6">
                {t.problem.challenges.map((challenge, idx) => (
                  <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Discovery */}
        <section className="py-20 md:py-32">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.discovery.title}</h2>

              <div className="space-y-8">
                <div className="bg-card rounded-xl p-8 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">{t.discovery.questionsHeading}</h3>
                  <ul className="space-y-2">
                    {t.discovery.questions.map((question, idx) => (
                      <li key={idx} className="text-muted-foreground">• {question}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-8 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">{t.discovery.discoveriesHeading}</h3>
                  <ul className="space-y-2">
                    {t.discovery.discoveries.map((discovery, idx) => (
                      <li key={idx} className="text-muted-foreground">• {discovery}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Execution */}
        <section className="py-20 md:py-32 bg-[#141414]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.execution.title}</h2>
              <p className="text-muted-foreground mb-12">{t.execution.subtitle}</p>

              <div className="space-y-12">
                {t.execution.phases.map((phase, idx) => (
                  <div key={idx}>
                    <div className="bg-card rounded-xl p-8 border border-border">
                      <div className="text-primary text-sm font-bold mb-2">{phase.number}</div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">{phase.heading}</h3>
                      <p className="text-muted-foreground mb-6">{phase.description}</p>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                        <p className="text-foreground font-semibold">{phase.result}</p>
                      </div>
                    </div>

                    {/* Image after FAZA 2 (Database) */}
                    {idx === 0 && (
                      <div className="mt-8 rounded-2xl overflow-hidden border border-border shadow-xl">
                        <img
                          src="/images/examples/dashboard.png"
                          alt="Mirco CRM Dashboard - Partner Database System"
                          className="w-full h-auto"
                        />
                      </div>
                    )}

                    {/* Image after FAZA 5 (Influencer Portal) */}
                    {idx === 3 && (
                      <div className="mt-8 rounded-2xl overflow-hidden border border-border shadow-xl">
                        <img
                          src="/images/examples/influencer_dashboard.png"
                          alt="Mirco Influencer Portal - Affiliate Tracking Dashboard"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <h3 className="text-2xl font-bold text-foreground mb-8">{t.execution.strategyHeading}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {t.execution.networks.map((network, idx) => (
                    <div key={idx} className="bg-card rounded-xl p-6 border border-border">
                      <h4 className="font-bold text-foreground text-lg mb-3">{network.title}</h4>
                      <p className="text-sm text-muted-foreground">{network.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Results */}
        <section className="py-20 md:py-32">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.results.title}</h2>

              <div className="bg-card rounded-xl p-8 border border-border mb-12">
                <ul className="space-y-3">
                  {t.results.deliverables.map((deliverable, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      • {deliverable}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-primary/10 rounded-xl border-l-4 border-primary">
                <p className="text-lg text-foreground font-semibold mb-3">
                  "{t.results.testimonial.quote}"
                </p>
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">{t.results.testimonial.name}</div>
                  <div>{t.results.testimonial.role}</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0A0A0A]">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lang}/formularz`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {t.cta.primaryButton}
                </Link>
                <Link
                  href="https://www.marketing-intelligence.io/case-study/mirco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:border-primary transition-colors"
                >
                  {t.cta.secondaryButton}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
