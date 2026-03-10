import { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { Container } from "@/components/shared/Container";
import { ConfiguratorForm } from "@/components/forms/ConfiguratorForm";
import { GradientText } from "@/components/ui/gradient-text";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    en: "Free Configurator Consultation | DealCatcher",
    pl: "Bezpłatna Konsultacja Konfiguratora | DealCatcher",
  };

  const descriptions: Record<Locale, string> = {
    en: "Get a free consultation for your product configurator. See how 3D visualization can boost your sales.",
    pl: "Otrzymaj bezpłatną konsultację konfiguratora produktu. Zobacz jak wizualizacja 3D zwiększy Twoją sprzedaż.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/konfigurator-formularz"),
  };
}

export default async function KonfiguratorFormularzPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.konfiguratorFormularz;

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-semibold mb-6 tracking-wide">
                {t.hero.title}{" "}
                <GradientText>{t.hero.titleHighlight}</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t.hero.description}
              </p>

              {/* Process Steps */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                {t.hero.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-primary font-bold">{idx + 1}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Form Section */}
        <section className="pb-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
                <h2 className="text-2xl font-semibold mb-6">
                  {t.form.heading}
                </h2>
                <ConfiguratorForm lang={lang} />
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-clash font-semibold mb-4">
                  {t.faq.title} <GradientText>{t.faq.titleHighlight}</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.faq.subtitle}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
                <Accordion type="single" collapsible className="space-y-4">
                  {t.faq.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx + 1}`}
                      className="border-white/10"
                    >
                      <AccordionTrigger className="text-base">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </section>

        {/* Examples Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-semibold mb-4">
                {t.examples.title} <GradientText>{t.examples.titleHighlight}</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.examples.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {t.examples.items.map((example, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
                >
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {example.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {example.description}
                    </p>
                    <a
                      href={`/${lang}${example.url}`}
                      className="text-primary hover:underline"
                    >
                      {t.examples.cta} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
