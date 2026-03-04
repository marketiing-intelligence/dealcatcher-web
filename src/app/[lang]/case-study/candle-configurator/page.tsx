import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { Container } from "@/components/shared/Container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    en: "Candle Configurator Case Study — Premium Product Customization | DealCatcher",
    no: "Candle Configurator Casestudie — Premium produkttilpasning | DealCatcher",
    pl: "Case Study Konfigurator Zniczy — Personalizacja Premium | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "How we built a 3D candle configurator with real-time preview and production integration: reduced returns, automated workflow, better customer experience.",
    no: "Hvordan vi bygde en 3D lysestøtte-konfigurator med sanntidsforhåndsvisning og produksjonsintegrasjon: reduserte returer, automatisert arbeidsflyt, bedre kundeopplevelse.",
    pl: "Jak stworzyliśmy konfigurator zniczy 3D z podglądem na żywo i integracją produkcyjną: zmniejszone zwroty, zautomatyzowany proces, lepsza obsługa klienta.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/case-study/candle-configurator"),
  };
}

export default async function CandleConfiguratorCaseStudyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

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
              Powrót do portfolio
            </Link>

            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full uppercase tracking-wide mb-6">
                Case Study
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Konfigurator Zniczy —{" "}
                <span className="text-gradient bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Personalizacja Premium 3D
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Dystrybutor zniczy premium potrzebował narzędzia do personalizacji produktów online.
                Stworzyliśmy konfigurator 3D z podglądem w czasie rzeczywistym, integracją z produkcją
                i eksportem do formatu .gbl.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground mt-1">Zwrotów przez błędną konfigurację</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Automatyzacja procesu</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">3D</div>
                  <div className="text-sm text-muted-foreground mt-1">Podgląd Real-Time</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">.gbl</div>
                  <div className="text-sm text-muted-foreground mt-1">Eksport do produkcji</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Image */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="/images/examples/candle-configurator1.png"
                  alt="Konfigurator Zniczy 3D - Podgląd Real-time"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="/images/examples/candle-configurator2.png"
                  alt="Konfigurator Zniczy 3D - Opcje Personalizacji"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Problem</h2>

              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-foreground font-semibold text-xl">
                  Dystrybutor zniczy premium obsługiwał zamówienia niestandardowe mailem i telefonem.
                  Klienci nie widzieli jak będzie wyglądać finalny produkt, co prowadziło do zwrotów i niezadowolenia.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Główne wyzwania:</h3>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-foreground">Brak wizualizacji produktu:</strong> Klient zamawiał znicz przez telefon/mail,
                    opisując co chce (tekst, czcionka, kolor). Nie widział jak to będzie wyglądać przed produkcją.
                  </li>
                  <li>
                    <strong className="text-foreground">Zwroty przez niezgodności:</strong> "Myślałem że tekst będzie większy",
                    "Ten kolor wygląda inaczej niż sobie wyobrażałem". Zwroty przez niezgodność z wyobrażeniami klienta.
                  </li>
                  <li>
                    <strong className="text-foreground">Czasochłonny proces zamawiania:</strong> Każde zamówienie wymagało rozmowy telefonicznej
                    lub kilku maili z pytaniami doprecyzowującymi (jaki rozmiar, gdzie tekst, jaka czcionka?).
                  </li>
                  <li>
                    <strong className="text-foreground">Błędy w produkcji:</strong> Ręczne przekazywanie specyfikacji do produkcji
                    prowadziło do błędów transkrypcji i niejasności.
                  </li>
                  <li>
                    <strong className="text-foreground">Niewykorzystany potencjał customizacji:</strong> Klient mógł wybrać spośród
                    dziesiątek opcji (rozmiar, tekst, czcionka, kolor, wyrównanie), ale ta przewaga nie była wykorzystywana jako narzędzie sprzedaży.
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Solution */}
        <section className="py-20 md:py-32">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Rozwiązanie</h2>

              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-foreground text-lg">
                  Stworzyliśmy konfigurator 3D z podglądem w czasie rzeczywistym. Klient widzi dokładnie jak będzie wyglądać znicz
                  przed złożeniem zamówienia.
                </p>

                <div className="space-y-12 mt-8">
                  {/* Real-time 3D Preview */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">1. Podgląd 3D w czasie rzeczywistym</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Model 3D znicza renderowany bezpośrednio w przeglądarce. Każda zmiana (tekst, czcionka, kolor, rozmiar)
                        natychmiast widoczna na modelu. Klient może obracać znicz, przybliżać, sprawdzić jak wygląda z każdej strony.
                      </p>
                      <ul>
                        <li><strong>Wybór rozmiaru:</strong> Mały / średni / duży (wymiary widoczne w cm)</li>
                        <li><strong>Personalizacja tekstu:</strong> Imię, nazwisko, daty, dedykacja (max 50 znaków)</li>
                        <li><strong>Wybór czcionki:</strong> 8 rodzajów czcionek (elegancka, klasyczna, nowoczesna, tradycyjna)</li>
                        <li><strong>Kolor:</strong> Biały, złoty, srebrny, czarny</li>
                        <li><strong>Wyrównanie:</strong> Do lewej, wyśrodkowany, do prawej</li>
                        <li><strong>Rotacja modelu:</strong> 360° obracanie dla pełnego podglądu</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Klient widzi co zamawiał. Zero zwrotów przez niezgodność z oczekiwaniami.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Production Integration */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">2. Integracja z produkcją (eksport .gbl)</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Po zatwierdzeniu konfiguracji system generuje plik .gbl gotowy do wykorzystania w produkcji.
                        Bez ręcznego przepisywania, bez błędów.
                      </p>
                      <ul>
                        <li><strong>Automatyczny eksport:</strong> Konfiguracja zapisywana jako plik .gbl (format produkcyjny)</li>
                        <li><strong>Specyfikacja PDF:</strong> Wygenerowany dokument z pełną specyfikacją (rozmiar, tekst, czcionka, kolor) do archiwum</li>
                        <li><strong>Numer zamówienia:</strong> Każde zamówienie dostaje unikalny ID powiązany z konfiguracją</li>
                        <li><strong>Zero błędów transkrypcji:</strong> Co klient skonfigurował = co trafia do produkcji</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Zautomatyzowany workflow. Brak błędów w produkcji. Czas realizacji skrócony o 40%.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Better Customer Experience */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">3. Lepsza obsługa klienta</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Konfigurator pracuje 24/7. Klient może projektować znicz o własnym tempie, bez presji rozmowy telefonicznej.
                      </p>
                      <ul>
                        <li><strong>Self-service:</strong> Klient sam konfiguruje, bez potrzeby dzwonienia/mailowania</li>
                        <li><strong>Dostępność 24/7:</strong> Zamówienia przyjmowane nawet gdy biuro jest zamknięte</li>
                        <li><strong>Mniej pytań:</strong> Konfigurator odpowiada na 90% pytań które wcześniej wymagały kontaktu z BOK</li>
                        <li><strong>Zapis projektu:</strong> Klient może zapisać konfigurację i wrócić do niej później</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Mniej zapytań do BOK. Klienci bardziej zadowoleni. Wyższy conversion rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Results */}
        <section className="py-20 md:py-32 bg-[#141414]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Wyniki</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-8 border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">0</div>
                  <div className="text-lg font-semibold text-foreground mb-2">Zwrotów przez błędną konfigurację</div>
                  <p className="text-sm text-muted-foreground">
                    Przed konfiguratorem: ~8% zwrotów. Po wdrożeniu: zero zwrotów przez niezgodność z oczekiwaniami.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">40%</div>
                  <div className="text-lg font-semibold text-foreground mb-2">Skrócenie czasu realizacji</div>
                  <p className="text-sm text-muted-foreground">
                    Automatyczny eksport do produkcji wyeliminował ręczne przepisywanie specyfikacji.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-lg font-semibold text-foreground mb-2">Dostępność konfiguratora</div>
                  <p className="text-sm text-muted-foreground">
                    Klienci mogą składać zamówienia personalizowane nawet gdy biuro jest zamknięte.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">90%</div>
                  <div className="text-lg font-semibold text-foreground mb-2">Redukcja zapytań do BOK</div>
                  <p className="text-sm text-muted-foreground">
                    Konfigurator odpowiada na większość pytań automatycznie. Mniej czasu na obsługę pytań.
                  </p>
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
                Potrzebujesz konfiguratora produktów?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Jeśli Twoi klienci muszą personalizować produkty (kolor, rozmiar, materiał, logo) —
                konfigurator 3D zmniejszy zwroty, zautomatyzuje proces i poprawi doświadczenie klienta.
                Porozmawiajmy o Twoim przypadku.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lang}/formularz`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Umów bezpłatną konsultację
                </Link>
                <Link
                  href={`/${lang}/portfolio`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:border-primary transition-colors"
                >
                  Zobacz więcej projektów
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
