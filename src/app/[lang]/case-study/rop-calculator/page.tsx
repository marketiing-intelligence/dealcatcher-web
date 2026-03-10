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
    en: "ROP Calculator Case Study — Packaging Fee Compliance Tool | DaVinci",
    pl: "Case Study Kalkulator ROP — Narzędzie Compliance Opłat Opakowaniowych | DaVinci",
  };
  const descriptions: Record<Locale, string> = {
    en: "How we built a free packaging fee calculator for Polish e-commerce companies: helping hundreds plan budgets for 2026-2028 regulations.",
    pl: "Jak stworzyliśmy darmowy kalkulator opłat ROP dla polskich firm e-commerce: pomoc setkom firm w planowaniu budżetów na lata 2026-2028.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/case-study/rop-calculator"),
  };
}

export default async function ROPCalculatorCaseStudyPage({
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
                Kalkulator ROP —{" "}
                <span className="text-gradient bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Narzędzie Publiczne dla Setek Firm
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Nowe przepisy dotyczące opłat za opakowania na lata 2026-2028 zmusiły polskie firmy e-commerce
                i FMCG do ponownej kalkulacji kosztów. Stworzyliśmy darmowy kalkulator porównujący materiały
                i generujący raporty PDF — publicznie dostępne narzędzie które pomaga setkom firm planować budżety.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Darmowe narzędzie</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground mt-1">Lata prognozy (2026-2028)</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">PDF</div>
                  <div className="text-sm text-muted-foreground mt-1">Eksport raportu</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground mt-1">Kosztów backendowych</div>
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
                  src="/images/examples/kalkulator1.png"
                  alt="Kalkulator ROP 2026-2028 - Symulator Opłat Recyklingowych"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="/images/examples/kalkulator2.png"
                  alt="Kalkulator ROP 2026-2028 - Porównanie Materiałów i Koszty"
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
                  Polski system opłat ROP (Rozszerzona Odpowiedzialność Producenta) zmienił się radykalnie na lata 2026-2028.
                  Firmy e-commerce i FMCG stanęły przed problemem: ile będą kosztować opakowania przez kolejne 3 lata?
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Główne wyzwania:</h3>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-foreground">Nowe stawki opłat ROP:</strong> Roczne opłaty za opakowania kartonowe, plastikowe,
                    szklane uległy zmianie. Firmy musiały przeliczyć roczne koszty na lata 2026, 2027, 2028.
                  </li>
                  <li>
                    <strong className="text-foreground">Brak prostych narzędzi do kalkulacji:</strong> Oficjalne dokumenty zawierały tabele z opłatami,
                    ale żadnego kalkulatora. Firmy musiały liczyć ręcznie w Excelu.
                  </li>
                  <li>
                    <strong className="text-foreground">Pytanie: czy zamienić materiał?</strong> "Czy plastik nadal jest tańszy niż karton?"
                    "Ile zaoszczędzę jeśli przejdę na opakowania papierowe?" — brak narzędzia do porównywania wariantów.
                  </li>
                  <li>
                    <strong className="text-foreground">Konieczność raportowania w firmie:</strong> CFO, zespoły zakupowe, dyrektorzy operacyjni
                    potrzebowali raportu który można pokazać zarządowi. Tabela w Excelu nie wystarczała.
                  </li>
                  <li>
                    <strong className="text-foreground">Problem compliance:</strong> Błędna kalkulacja = zaniżone opłaty = kary finansowe.
                    Firmy potrzebowały pewności że liczą prawidłowo.
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
                  Stworzyliśmy publicznie dostępny kalkulator ROP działający w przeglądarce (pure frontend, zero backendowych kosztów).
                  Porównuje koszty opakowań dla różnych materiałów i generuje raport PDF gotowy do prezentacji zarządowi.
                </p>

                <div className="space-y-12 mt-8">
                  {/* Material Comparison Engine */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">1. Porównywarka materiałów</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Kalkulator pozwala wprowadzić wagę opakowań w różnych materiałach i natychmiast pokazuje roczne koszty
                        dla lat 2026, 2027, 2028.
                      </p>
                      <ul>
                        <li><strong>Obsługiwane materiały:</strong> Karton, plastik (PET, PE, PP), szkło, metal (aluminium), drewno</li>
                        <li><strong>Waga w tonach:</strong> Użytkownik wprowadza wagę opakowań rocznie (np. 50 ton kartonu, 20 ton plastiku)</li>
                        <li><strong>Automatyczna kalkulacja:</strong> System mnoży wagę przez stawki ROP i pokazuje koszt per rok</li>
                        <li><strong>Porównanie wariantów:</strong> "Co jeśli zamienię 10 ton plastiku na karton?" — kalkulator pokazuje oszczędność</li>
                        <li><strong>Prognoza 3-letnia:</strong> Koszty wyświetlane osobno dla 2026, 2027, 2028 (stawki rosną co roku)</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Firmy widzą dokładne koszty opłat i mogą porównać scenariusze (np. przejście na eco-opakowania).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PDF Export & Reporting */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">2. Raport PDF do prezentacji zarządowi</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Kalkulator generuje profesjonalny raport PDF z podsumowaniem opłat, tabelami, wykresami.
                        Gotowe do pokazania CFO lub zarządowi.
                      </p>
                      <ul>
                        <li><strong>Podsumowanie opłat:</strong> Całkowity koszt ROP na lata 2026-2028 (suma dla wszystkich materiałów)</li>
                        <li><strong>Breakdown per materiał:</strong> Ile kosztuje karton, ile plastik, ile szkło (tabela z rozbiciem)</li>
                        <li><strong>Wykres porównawczy:</strong> Wizualizacja kosztów roku do roku (pokazuje jak rosną stawki)</li>
                        <li><strong>Rekomendacje:</strong> Sugestie optymalizacji (np. "Zamiana 15% plastiku na karton = oszczędność 12k zł/rok")</li>
                        <li><strong>Export PDF:</strong> Jeden klik, gotowy dokument do wydruku/maila</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Dyrektorzy operacyjni mają gotowy raport do prezentacji. Zamiast tabeli w Excelu — profesjonalny dokument.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pure Frontend (No Backend Costs) */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">3. Pure Frontend — Zero kosztów utrzymania</h3>
                    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                      <p>
                        Wszystkie kalkulacje wykonywane w przeglądarce użytkownika. Brak serwera, baz danych, API.
                        Narzędzie działa bezpłatnie dla wszystkich.
                      </p>
                      <ul>
                        <li><strong>JavaScript tylko:</strong> Wszystkie obliczenia w przeglądarce (nie wysyłamy danych na serwer)</li>
                        <li><strong>Hosting statyczny:</strong> Aplikacja to zestaw plików HTML/CSS/JS hostowanych na Vercel (darmowy plan)</li>
                        <li><strong>Prywatność:</strong> Dane użytkownika nie opuszczają jego komputera (zero backendu = zero ryzyka wycieku danych)</li>
                        <li><strong>Błyskawiczna szybkość:</strong> Brak opóźnień związanych z wysyłaniem requestów do serwera</li>
                        <li><strong>Skalowanie:</strong> Narzędzie obsłuży 1000 użytkowników jednocześnie bez dodatkowych kosztów</li>
                      </ul>
                      <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-6">
                        <p className="text-foreground font-semibold">
                          Wynik: Narzędzie publicznie dostępne dla każdego. Zero kosztów operacyjnych dla nas. Win-win.
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

              <div className="bg-card rounded-xl p-8 border border-border mb-12">
                <h3 className="text-xl font-bold text-foreground mb-6">Dostarczone rozwiązanie:</h3>
                <ul className="space-y-3">
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Kalkulator opłat ROP 2026-2028</strong> — projekcja kosztów opakowań na 3 lata (karton, plastik, szkło, aluminium, inne)
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Porównanie materiałów</strong> — analiza "co jeśli" przy zmianie materiału opakowań (ile zaoszczędzę przy przejściu na karton?)
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Eksport PDF</strong> — profesjonalny raport gotowy do prezentacji zarządowi/CFO
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Pure frontend (zero backend)</strong> — brak kosztów serwerowych, hosting statyczny, działa offline
                  </li>
                  <li className="text-muted-foreground">
                    • <strong className="text-foreground">Compliance z przepisami</strong> — stawki zgodne z rozporządzeniem na lata 2026-2028
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-primary/10 rounded-xl border-l-4 border-primary">
                <p className="text-foreground leading-relaxed mb-4">
                  <strong>Kontekst projektu:</strong> Kalkulator powstał na zlecenie klienta z branży e-commerce/FMCG w odpowiedzi
                  na zmiany w polskich przepisach dotyczących opłat za opakowania (ROP — Rozszerzona Odpowiedzialność Producenta).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nowe rozporządzenie wprowadziło zróżnicowane stawki opłat dla różnych materiałów opakowaniowych oraz rosnące
                  koszty na lata 2026-2028. Firmy potrzebowały narzędzia do szybkiej kalkulacji budżetów i porównania wariantów
                  materiałowych. Kalkulator rozwiązał ten problem — pure frontend oznaczał zero kosztów operacyjnych, a eksport
                  do PDF umożliwił profesjonalne raportowanie do zarządu.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0A0A0A]">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Potrzebujesz podobnego narzędzia?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Kalkulatory, narzędzia compliance, raporty PDF — jeśli potrafisz to opisać, my potrafimy to zbudować.
                Porozmawiajmy o Twoim przypadku i zobacz jak możemy pomóc.
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
