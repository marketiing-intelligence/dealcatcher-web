import { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { Container } from "@/components/shared/Container";
import { PrototypeForm } from "@/components/forms/PrototypeForm";
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
import { PreviewCard } from "@/components/shared/PreviewCard";
import { getPortfolioItems } from "@/lib/portfolio-data";

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
    pl: "Darmowy Prototyp | DealCatcher",
    en: "Free Prototype | DealCatcher",
  };

  const descriptions: Record<Locale, string> = {
    pl: "Otrzymaj darmowy prototyp strony w 48h. Zobacz efekt zanim zapłacisz.",
    en: "Get a free website prototype in 48h. See the result before you pay.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/formularz"),
  };
}

export default async function FormularzPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const portfolioItems = getPortfolioItems(lang);
  const templates = portfolioItems.filter(item => item.industry !== "case-study");
  const configurators = portfolioItems.filter(item =>
    item.id === "mirco-case-study" || item.id === "candle-configurator"
  );

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-semibold mb-6 tracking-wide">
                Prototyp Twojej strony{" "}
                <GradientText>bez zobowiązań</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Zaprojektujemy Twoją stronę w 48h. Zobaczysz efekt, ocenisz,
                <br />
                potem zdecydujesz. Zero presji, zero zaliczek.
              </p>

              {/* Process Steps */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Wypełnij formularz</h3>
                  <p className="text-sm text-muted-foreground">
                    Opowiedz nam o swojej firmie i wizji strony - zajmie to
                    tylko 5 minut
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">
                    Otrzymaj prototyp w 48h
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Przygotujemy dla Ciebie nowoczesną propozycję strony
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Ty decydujesz</h3>
                  <p className="text-sm text-muted-foreground">
                    Prezentujemy prototyp → Ci się podoba → wdrażamy. Nie
                    podoba? Żadnych zobowiązań.
                  </p>
                </div>
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
                  Opowiedz nam o swojej firmie
                </h2>
                <PrototypeForm lang={lang} />
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
                  Najczęściej zadawane <GradientText>pytania</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Wszystko co musisz wiedzieć o prototypie
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Czy prototyp jest naprawdę darmowy?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Tak, przygotowanie prototypu jest całkowicie darmowe i bez zobowiązań.
                      Nie pobieramy żadnych zaliczek ani opłat wstępnych. Płacisz tylko wtedy,
                      gdy prototyp Ci się spodoba i zdecydujesz się na realizację projektu.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Co dokładnie dostanę w prototypie?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Otrzymasz w pełni zaprojektowaną stronę główną z Twoimi danymi,
                      kolorystyką dopasowaną do branży (lub Twojego logo), oraz układem
                      sekcji odzwierciedlającym Twoją ofertę. To nie jest szablon —
                      każdy prototyp projektujemy indywidualnie.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Jak szybko otrzymam prototyp?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Prototyp otrzymasz w ciągu 48 godzin od wypełnienia formularza.
                      W większości przypadków jesteśmy w stanie dostarczyć go jeszcze szybciej.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Co jeśli prototyp mi się nie spodoba?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      To w porządku! Nie masz żadnych zobowiązań. Jeśli projekt nie będzie
                      odpowiadał Twoim oczekiwaniom, po prostu dziękujesz i na tym kończymy.
                      Bez presji, bez dziwnych pytań.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Czy muszę mieć gotowe teksty i zdjęcia?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Nie. Do prototypu używamy przykładowych treści, które oddają charakter
                      Twojej branży. Jeśli masz własne materiały — super, wykorzystamy je.
                      Jeśli nie — nie ma problemu, prototyp i tak powstanie.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Ile kosztuje realizacja po akceptacji prototypu?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Koszt zależy od zakresu projektu (liczba podstron, funkcje, integracje).
                      Po akceptacji prototypu przedstawiamy szczegółową wycenę i harmonogram.
                      Dopiero wtedy decydujesz, czy idziemy dalej.{" "}
                      <a href="/pl/no-website#pricing" className="text-primary hover:underline">
                        Zobacz orientacyjny cennik
                      </a>
                      .
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7" className="border-white/10">
                    <AccordionTrigger className="text-base">
                      Jak wygląda proces po akceptacji?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Po akceptacji prototypu ustalamy zakres prac, terminy i cenę.
                      Następnie przechodzimy do realizacji: zbieramy treści, programujemy
                      stronę, testujemy i wdrażamy. Cały proces trwa zazwyczaj 2-4 tygodnie.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Container>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-semibold mb-4">
                Szablony które <GradientText>oferujemy</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Wybierz gotowy szablon — dostosujemy go pod Twoją firmę
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((item) => (
                <div key={item.id}>
                  <PreviewCard item={item} lang={lang} showPremiumBadge />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Configurators Section */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-clash font-semibold mb-4">
                Konfiguratory które <GradientText>stworzyliśmy</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Interaktywne narzędzia dla naszych klientów — sprzedaż produktów online
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {configurators.map((item) => (
                <div key={item.id}>
                  <PreviewCard item={item} lang={lang} showPremiumBadge={false} />
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
