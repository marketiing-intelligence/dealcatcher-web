"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Factory,
  Calendar,
  MapPin,
  Users,
  TrendingDown,
  Search,
  Wrench,
  Target,
  Zap,
  BarChart3,
  Settings,
  Palette,
  Store,
  Car,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const viewportConfig = { once: true, margin: "-50px" };

export default function MircoCaseStudy() {
  return (
    <main className="bg-background">
      {/* Back nav */}
      <div className="border-b border-white/[0.06] bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link href="/pl" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Powrót
            </Link>
            <Button size="sm" className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
              Umów rozmowę
            </Button>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>

        <Container className="relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] rounded-full border border-primary/20 bg-primary/5 px-3 py-1">Case Study</span>
              <span className="text-[10px] font-medium text-muted-foreground rounded-full border border-white/[0.08] px-3 py-1">Automotive / Motorsport</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl leading-[1.1] mb-6">
              Jak w 2 miesiące zbudowaliśmy producentowi foteli kompletny system pozyskiwania partnerów
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-muted-foreground max-w-3xl mb-10">
              Mirco — polski producent foteli rajdowych z 30-letnią historią — przyszedł ze spadającą sprzedażą i brakiem pomysłu na nowe kanały. Odszedł z bazą 400+ dystrybutorów, konfiguratorem produktów i portalem afiliacyjnym.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Factory className="h-4 w-4 text-primary" /><span>Producent foteli rajdowych</span></div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /><span>Od 1995 roku (~30 lat)</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><span>Skoczów, Polska</span></div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span>~15 osób</span></div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20 bg-[#0e0e0e]">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] block mb-3">Problem</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Z czym przyszedł klient</h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { icon: TrendingDown, color: "text-red-400", title: "Spadająca sprzedaż", desc: "Trend w dół, obecne kanały się wyczerpywały. Mirek widział problem, ale nie wiedział jak go odwrócić." },
                { icon: Search, color: "text-orange-400", title: "Brak strategii", desc: "Mirek jest producentem — zna się na fotelach, nie na marketingu. Miał pomysł na markę premium, ale projekt utknął." },
                { icon: Wrench, color: "text-yellow-400", title: "Problem ze zwrotami", desc: "Zamawianie custom foteli przez maile i telefony — klienci odsyłali bo coś się nie zgadzało." },
                { icon: Target, color: "text-blue-400", title: "Niewykorzystany potencjał", desc: "Mirco ma własną szwalnię i może customizować wszystko. Ta przewaga nie była wykorzystywana." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="rounded-xl bg-[#141414] border border-white/[0.08] p-5">
                  <item.icon className={`h-6 w-6 ${item.color} mb-3`} />
                  <h3 className="text-sm font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Discovery */}
      <section className="py-16 md:py-20 bg-background">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] block mb-3">Faza 1</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Warsztat Discovery</h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">Zanim cokolwiek zaproponowaliśmy, musieliśmy głęboko zrozumieć biznes.</p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={fadeUp}>
                <h3 className="text-base font-semibold mb-4">Pytania które zadaliśmy</h3>
                <ul className="space-y-2.5">
                  {["Co sprzedajesz? Jakie modele foteli?", "Kto kupuje? Kim są Twoi dystrybutorzy?", "Jak dystrybutorzy sprzedają dalej?", "Czy możesz customizować produkty?", "Co się najlepiej sprzedaje i dlaczego?"].map((q, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] text-primary font-medium">{i + 1}</span>
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-xl border border-primary/20 bg-primary/[0.04] p-6">
                <Zap className="h-6 w-6 text-primary mb-3" />
                <h3 className="text-base font-semibold mb-3">Kluczowe odkrycia</h3>
                <ul className="space-y-2.5">
                  {["Fotele z homologacją FIA sprzedają się lepiej niż gamingowe", "Mirco może customizować absolutnie wszystko (własna szwalnia)", "Między tanimi chińskimi fotelami a premium Recaro jest nisza dla Mirco", "Mirek nie znał swojego ICP — zmapowaliśmy go na podstawie obecnych dystrybutorów"].map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Baza dystrybutorów */}
      <section className="py-16 md:py-20 bg-[#0e0e0e]">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] block mb-3">Faza 2</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Baza potencjalnych partnerów</h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">Znajdźmy więcej takich samych dystrybutorów jak ci, z którymi już współpracuje.</p>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-3">
              <motion.div variants={fadeUp} className="rounded-xl bg-[#141414] border border-white/[0.08] p-5">
                <h3 className="text-sm font-semibold mb-3">Co zrobiliśmy</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {["Scraper przeszukujący każdy kraj UE + UK", "Zmapowaliśmy konkurencję (polska, chińska, Recaro)", "Research: gdzie konkurencja sprzedaje swoje fotele", "Agregacja i deduplikacja wyników"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
                <BarChart3 className="h-6 w-6 text-primary mb-3" />
                <h3 className="text-lg font-bold text-primary mb-1">400+ firm</h3>
                <p className="text-sm text-muted-foreground mb-3">Sklepy tuningowe w UE i UK, które sprzedają podobne produkty.</p>
                <p className="text-xs text-muted-foreground/60">Każdy rekord: nazwa firmy, kraj, osoba decyzyjna, email, opis.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-xl bg-[#141414] border border-white/[0.08] p-5">
                <Settings className="h-6 w-6 text-muted-foreground mb-3" />
                <h3 className="text-sm font-semibold mb-3">System outreach</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {["Instantly — cold email z personalizacją", "Pipedrive — CRM do zarządzania pipeline", "Automatyzacja z human-in-the-loop"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3 Sieci Sprzedaży */}
      <section className="py-16 md:py-20 bg-background">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] block mb-3">Strategia</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">3 Sieci Sprzedaży</h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">Nie budowaliśmy jednego kanału — zbudowaliśmy trzy kompletne sieci sprzedaży.</p>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-3">
              {[
                { icon: Video, color: "purple", title: "Influencerzy → B2C", desc: "Drifterzy, tunerzy, YouTuberzy motorsportowi. Sprzedają fotele przez kody rabatowe.", items: ["100 influencerów w teście", "27% zainteresowanych współpracą", "Portal afiliacyjny z trackerem"] },
                { icon: Store, color: "primary", title: "Sklepy tuningowe → B2B", desc: "Dystrybutorzy i sklepy tuningowe w całej Europie.", items: ["400+ firm w bazie (UE + UK)", "Konfigurator do embedowania", "Gotowe kampanie cold email"], highlighted: true },
                { icon: Car, color: "orange", title: "Warsztaty → Custom Cars", desc: "Firmy zajmujące się restomodami i custom buildami.", items: ["23 firmy w segmencie", "Wysokomarżowy segment premium", "Customizacja jako główny USP"] },
              ].map((net, i) => (
                <motion.div key={i} variants={fadeUp} className={`rounded-xl p-5 ${net.highlighted ? "border border-primary/20 bg-primary/[0.04]" : "bg-[#141414] border border-white/[0.08]"}`}>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-4 ${net.highlighted ? "bg-primary/10" : net.color === "purple" ? "bg-purple-500/10" : "bg-orange-500/10"}`}>
                    <net.icon className={`h-5 w-5 ${net.highlighted ? "text-primary" : net.color === "purple" ? "text-purple-400" : "text-orange-400"}`} />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{net.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{net.desc}</p>
                  <ul className="space-y-1.5">
                    {net.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${net.highlighted ? "text-primary" : net.color === "purple" ? "text-purple-400" : "text-orange-400"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Konfigurator */}
      <section className="py-16 md:py-20 bg-[#0e0e0e]">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] block mb-3">Faza 4</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Konfigurator fotela</h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">Narzędzie które zamienia problem (zwroty) w przewagę rynkową (customizacja jako USP).</p>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10 rounded-xl border border-white/[0.08] overflow-hidden">
              <img src="/images/examples/mirco-configurator.png" alt="Konfigurator foteli Mirco" className="w-full h-auto" />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Palette, title: "Pełna personalizacja", desc: "Model, materiał, kolor nici, logo, kolor skorupy, akcesoria." },
                { icon: Check, title: "Zero pomyłek", desc: "Klient widzi wizualizację w czasie rzeczywistym. Wie co zamawia." },
                { icon: Users, title: "Wartość dla dystrybutorów", desc: "Dystrybutor wdraża konfigurator u siebie za darmo. Ma coś, czego konkurencja nie ma." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="rounded-xl bg-[#141414] border border-white/[0.08] p-5">
                  <f.icon className="h-5 w-5 text-primary mb-3" />
                  <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-[1.7]">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Chcesz podobne wyniki?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Zaczynamy od X-Ray — prześwietlenia Twojego biznesu. 30-minutowa rozmowa, zero zobowiązań.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 h-11 px-6">
                Umów bezpłatną rozmowę
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/[0.1] hover:bg-white/[0.04] h-11 px-6" asChild>
                <Link href="/pl">Wróć do strony głównej</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
