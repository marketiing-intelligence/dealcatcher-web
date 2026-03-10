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
    en: "TravelPL Case Study — Complete Digital System for Travel Agency | DaVinci",
    pl: "Case Study TravelPL — Kompletny System Cyfrowy dla Biura Podróży | DaVinci",
  };
  const descriptions: Record<Locale, string> = {
    en: "How we built a complete digital ecosystem for a Polish travel agency: professional website, mobile travel app, and Google Ads campaigns — from zero digital presence to modern online business.",
    pl: "Jak zbudowaliśmy kompletny ekosystem cyfrowy dla polskiego biura podróży: profesjonalna strona www, aplikacja mobilna i kampanie Google Ads — od zera do nowoczesnej obecności online.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/case-study/wieruszow-travel"),
  };
}

export default async function WieruszowTravelCaseStudyPage({
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
                TravelPL —{" "}
                <span className="text-gradient bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Kompletny System Cyfrowy dla Biura Podróży
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Biuro podróży TravelPL organizujące wycieczki autokarowe przyszło bez żadnej obecności online.
                Odeszło z profesjonalną stroną www, aplikacją mobilną i kampaniami Google Ads — gotowe do konkurowania
                z dużymi biurami podróży.
              </p>

              {/* Company Details */}
              <div className="flex flex-wrap gap-4 mb-12">
                <span className="text-sm text-muted-foreground">Biuro Podróży</span>
                <span className="text-sm text-muted-foreground">Wycieczki autokarowe</span>
                <span className="text-sm text-muted-foreground">Wieruszów, Polska</span>
                <span className="text-sm text-muted-foreground">10+ lat doświadczenia</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground mt-1">Komponenty systemu</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground mt-1">Wycieczek w ofercie</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">PWA</div>
                  <div className="text-sm text-muted-foreground mt-1">Aplikacja mobilna</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">Ads</div>
                  <div className="text-sm text-muted-foreground mt-1">Kampanie reklamowe</div>
                </div>
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
                  src="/images/examples/travel.png"
                  alt="TravelPL - Website i Aplikacja Mobilna"
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

              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Brak obecności online:</h3>
                  <p className="text-muted-foreground">
                    TravelPL działało wyłącznie przez telefon i spotkania w biurze. Zero strony www, zero mediów społecznościowych.
                    Potencjalni klienci nie mogli znaleźć firmy w Google, nie mogli zobaczyć oferty wycieczek.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Ograniczony zasięg:</h3>
                  <p className="text-muted-foreground">
                    Firma pozyskiwała klientów tylko lokalnie (Wieruszów i okolice). Nie było sposobu na dotarcie do klientów
                    z innych miast. Konkurencja z dużymi biurami podróży była niemożliwa.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Brak narzędzi marketingowych:</h3>
                  <p className="text-muted-foreground">
                    Żadnej reklamy online, żadnych kampanii Google Ads. Klienci musieli już znać firmę żeby się zgłosić.
                    Brak możliwości promocji nowych wycieczek, brak newslettera, brak remarketingu.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Ręczna obsługa zapytań:</h3>
                  <p className="text-muted-foreground">
                    Każdy telefon wymagał opowiadania o wycieczkach, terminach, cenach. Klienci dzwonili wielokrotnie bo nie było
                    miejsca gdzie mogliby sprawdzić szczegóły samodzielnie. Czasochłonne i nieefektywne.
                  </p>
                </div>
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
                  Zbudowaliśmy kompletny ekosystem cyfrowy: profesjonalną stronę www, aplikację mobilną dla turystów
                  i kampanie Google Ads. TravelPL z firmy bez obecności online stało się nowoczesnym biurem podróży gotowym
                  do konkurowania z dużymi graczami.
                </p>

                <div className="space-y-12 mt-8">
                  {/* Website */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">1. Strona internetowa (travelpl-website.vercel.app)</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Profesjonalna strona www prezentująca całą ofertę wycieczek. Klienci mogą przeglądać dostępne terminy,
                        zobaczyć ceny, przeczytać opinie, sprawdzić szczegóły wycieczek — wszystko online, bez konieczności dzwonienia.
                      </p>
                      <ul>
                        <li><strong>Katalog wycieczek:</strong> 12 wycieczek na sezon 2026 (maj-wrzesień) — plaże, góry, miasta, zagranica</li>
                        <li><strong>Szczegóły tras:</strong> Każda wycieczka ma pełny opis, program, mapę trasy, listę atrakcji, zdjęcia</li>
                        <li><strong>Ceny i terminy:</strong> Przejrzysta tabela terminów i cen. Klient widzi wszystko bez pytania</li>
                        <li><strong>Opinie klientów:</strong> Autentyczne recenzje poprzednich uczestników wycieczek (social proof)</li>
                        <li><strong>Formularz kontaktowy:</strong> Rezerwacja wycieczki przez formularz online (zamiast telefonu)</li>
                        <li><strong>SEO zoptymalizowane:</strong> Strona indeksowana w Google, widoczna w wynikach wyszukiwania</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Klienci mogą przeglądać ofertę o każdej porze. Firma obecna w Google. Profesjonalny wizerunek online.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile App */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">2. Aplikacja mobilna PWA (przewodnik wycieczek)</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Progressive Web App dla uczestników wycieczek — mobilny przewodnik po trasie, mapach, atrakcjach.
                        Działa offline, można zainstalować na telefonie jak zwykłą aplikację.
                      </p>
                      <ul>
                        <li><strong>Interaktywna mapa trasy:</strong> Uczestnicy widzą trasę wycieczki, miejsca postojów, atrakcje</li>
                        <li><strong>Przewodnik po atrakcjach:</strong> Opisy zabytków, restauracji, punktów widokowych na trasie</li>
                        <li><strong>Działa offline:</strong> Aplikacja zapisuje dane i działa bez internetu (przydatne w autokarze, w górach)</li>
                        <li><strong>PWA (Progressive Web App):</strong> Instaluje się jak aplikacja mobilna, ale bez App Store/Google Play</li>
                        <li><strong>Geolokalizacja:</strong> Pokazuje aktualne położenie autokaru na mapie (opcjonalnie)</li>
                        <li><strong>Push notifications:</strong> Powiadomienia o zbliżających się atrakcjach, postojach, zmianach w planie</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Uczestnicy mają przewodnik turystyczny w telefonie. Lepsza obsługa klienta. Nowoczesny standard obsługi.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Google Ads */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">3. Kampanie Google Ads (pozyskiwanie klientów)</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Profesjonalne kampanie reklamowe w Google — docieranie do klientów szukających wycieczek autokarowych,
                        wakacji na Bałtyku, wyjazdów w góry. Targeted reklamy dla konkretnych typów wycieczek.
                      </p>
                      <ul>
                        <li><strong>Kampanie Search:</strong> Reklamy w Google gdy ktoś szuka "wycieczki autokarowe", "wyjazd na Bałtyk"</li>
                        <li><strong>Remarketing:</strong> Przypominanie o ofercie osobom które odwiedziły stronę ale nie zarezerwowały</li>
                        <li><strong>Lokalizacja geograficzna:</strong> Targetowanie klientów z okolicznych miast (Wrocław, Opole, Częstochowa)</li>
                        <li><strong>Kampanie sezonowe:</strong> Promocja wycieczek plażowych w maju-czerwcu, górskich we wrześniu</li>
                        <li><strong>Tracking konwersji:</strong> Śledzenie który kanał przynosi rezerwacje, optymalizacja budżetu</li>
                        <li><strong>A/B testing:</strong> Testowanie różnych kreacji reklamowych, wybór najskuteczniejszych</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Rozszerzenie zasięgu poza Wieruszów. Dotarcie do nowych klientów z całego regionu. Mierzalny ROI.
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

              <div className="bg-card rounded-xl p-8 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Dostarczone rozwiązanie:</h3>
                <ul className="space-y-3">
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Strona internetowa (travelpl-website.vercel.app)</strong> — katalog 12 wycieczek sezon 2026, szczegóły tras, ceny, terminy, opinie klientów, formularz rezerwacji
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Aplikacja mobilna PWA</strong> — przewodnik turystyczny dla uczestników wycieczek, mapy tras, atrakcje, działa offline, instalowalna jak natywna aplikacja
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Kampanie Google Ads</strong> — reklamy Search, remarketing, geotargeting (Wrocław, Opole, Częstochowa), tracking konwersji, kampanie sezonowe
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">SEO i widoczność online</strong> — strona zindeksowana w Google, ruch organiczny, obecność w wynikach wyszukiwania dla fraz "wycieczki autokarowe", "wyjazd na Bałtyk"
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Automatyzacja obsługi klienta</strong> — szczegóły wycieczek dostępne 24/7 online, rezerwacje przez formularz, mniej telefonów z pytaniami "ile kosztuje", "jakie terminy"
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Rozszerzony zasięg geograficzny</strong> — dotarcie do klientów z całego regionu (nie tylko Wieruszów i okolice), kampanie reklamowe targetujące miasta w promieniu 100+ km
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0A0A0A]">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prowadzisz firmę bez obecności online?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Zbudujemy kompletny system: stronę www, aplikację mobilną i kampanie reklamowe.
                Wszystko dostosowane do Twojej branży i klientów.
              </p>
              <Link
                href={`/${lang}/formularz`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-lg"
              >
                Umów bezpłatną rozmowę
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
