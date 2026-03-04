import type { Locale } from "@/lib/i18n/config";

export type Industry = "contractor" | "service" | "finishing" | "case-study";
export type Template =
  | "standard"
  | "swiss"
  | "technical"
  | "terminal"
  | "blueprint"
  | "pulse"
  | "gallery"
  | "studio"
  | "canvas";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  industry: Industry;
  industryLabel: string;
  template: Template;
  thumbnail: string;
  fullPreview?: string; // Full-page screenshot (fallback)
  previewVideo?: string; // Scroll video for preview (.webm)
  demoUrl: string;
  features: string[];
  isPremium?: boolean;
}

export const industryLabels: Record<Industry, string> = {
  contractor: "Total Contractor",
  service: "Service Specialist",
  finishing: "Finishing Expert",
  "case-study": "Case Study",
};

const industryLabelsByLocale: Record<Locale, Record<Industry, string>> = {
  en: { contractor: "Total Contractor", service: "Service Specialist", finishing: "Finishing Expert", "case-study": "Case Study" },
  no: { contractor: "Totalentreprenør", service: "Servicespesialist", finishing: "Overflateekspert", "case-study": "Casestudie" },
  pl: { contractor: "Generalny wykonawca", service: "Specjalista usługowy", finishing: "Wykończenia", "case-study": "Case Study" },
};

// Placeholder images - replace with actual screenshots later
// Demo files are in: demo1/total-contractor/*.html
const placeholders = {
  swiss: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
  standard: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  technical: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop",
  terminal: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=500&fit=crop",
  blueprint: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop",
  gallery: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop",
};

const itemTranslations: Record<string, Record<Locale, { title?: string; description: string; features: string[] }>> = {
  "swiss-contractor": {
    en: { description: "Museum-grade layout with strict Swiss grid. 4-corner navigation, grayscale-to-color hover effects.", features: ["Swiss Grid", "4-Corner Nav", "Art House Design"] },
    no: { description: "Museumskvalitet med streng sveitsisk rutenett. 4-hjørne navigasjon, gråtone-til-farge hover-effekter.", features: ["Sveitsisk Rutenett", "4-hjørne Nav", "Art House Design"] },
    pl: { description: "Muzealny layout z precyzyjną siatką Swiss. Nawigacja w 4 rogach, efekty hover ze skali szarości do koloru.", features: ["Siatka Swiss", "Nawigacja 4-rogowa", "Design Art House"] },
  },
  "standard-contractor": {
    en: { description: "Professional and trustworthy design. Perfect for government contracts and large projects.", features: ["Kinetic Typography", "Video Hero", "Trust Badges"] },
    no: { description: "Profesjonell og tillitvekkende design. Perfekt for offentlige anbud og store prosjekter.", features: ["Kinetisk Typografi", "Video Hero", "Tillitsmerker"] },
    pl: { description: "Profesjonalny design budujący zaufanie. Idealny dla dużych projektów i przetargów.", features: ["Kinetyczna Typografia", "Sekcja Hero z Wideo", "Odznaki Zaufania"] },
  },
  "technical-contractor": {
    en: { description: "Raw, data-driven wireframe aesthetic. Monospace typography, high information density.", features: ["Wireframe Style", "Monospace Fonts", "Data-Dense"] },
    no: { description: "Rå, datadrevet wireframe-estetikk. Monospace typografi, høy informasjonstetthet.", features: ["Wireframe Stil", "Monospace Skrifter", "Datatett"] },
    pl: { description: "Surowa estetyka wireframe oparta na danych. Typografia monospace, duża gęstość informacji.", features: ["Styl Wireframe", "Czcionki Monospace", "Wysoka Gęstość Danych"] },
  },
  "terminal-service": {
    en: { description: "Green-on-black CLI aesthetic. Perfect for 24/7 emergency service providers.", features: ["CLI Aesthetic", "Neon Accents", "24/7 Focus"] },
    no: { description: "Grønn-på-svart CLI-estetikk. Perfekt for 24/7 nødtjenesteleverandører.", features: ["CLI Estetikk", "Neon Aksenter", "24/7 Fokus"] },
    pl: { description: "Estetyka CLI — zielony na czarnym. Idealny dla usług dostępnych 24/7.", features: ["Estetyka CLI", "Neonowe Akcenty", "Fokus 24/7"] },
  },
  "blueprint-service": {
    en: { description: "Technical grid with crosshairs and paper-white background. Engineering precision.", features: ["Blueprint Grid", "Technical Lines", "Precise Layout"] },
    no: { description: "Teknisk rutenett med siktekryss og papirhvit bakgrunn. Ingeniørpresisjon.", features: ["Blueprint Rutenett", "Tekniske Linjer", "Presis Layout"] },
    pl: { description: "Techniczny grid z celownikami i białym tłem. Precyzja inżynieryjna.", features: ["Siatka Blueprint", "Linie Techniczne", "Precyzyjny Layout"] },
  },
  "gallery-finishing": {
    en: { description: "Museum-grade presentation for finishing experts. Serif typography, gold accents.", features: ["Museum Grade", "Serif Typography", "Gold Accents"] },
    no: { description: "Museumskvalitet presentasjon for overflateeksperter. Serif typografi, gullaksenter.", features: ["Museumskvalitet", "Serif Typografi", "Gullaksenter"] },
    pl: { description: "Muzealna prezentacja dla ekspertów wykończeniowych. Typografia szeryfowa, złote akcenty.", features: ["Klasa Muzealna", "Typografia Szeryfowa", "Złote Akcenty"] },
  },
  "mirco-case-study": {
    en: { title: "Mirco — Full B2B Growth System", description: "Complete B2B growth system: influencer portal, sales messaging, lead database, marketing strategy — all built from scratch in 8 weeks.", features: ["400+ B2B Leads", "3 Sales Frameworks", "Influencer Portal"] },
    no: { title: "Mirco — Komplett B2B-vekstsystem", description: "Komplett B2B-vekstsystem: influencer-portal, salgsbudskap, kundebase, markedsstrategi — alt bygget fra bunnen av på 8 uker.", features: ["400+ B2B-leads", "3 Salgsrammer", "Influencer-portal"] },
    pl: { title: "Mirco — Kompletny System Wzrostu B2B", description: "Kompletny system wzrostu B2B: portal dla influencerów, strategia sprzedaży, baza leadów, strategia marketingowa — wszystko zbudowane od zera w 8 tygodni.", features: ["400+ leadów B2B", "3 strategie sprzedażowe", "Portal dla influencerów"] },
  },
  "candle-configurator": {
    en: { title: "Premium Candle Configurator — 3D Real-time Preview", description: "3D configurator for premium memorial candles with real-time preview. Customers design their own candle: size, text, font, color, alignment. Integrated with production system (export to .gbl file).", features: ["3D Real-time Preview", "Production Integration", "Custom Personalization"] },
    no: { title: "Premium Minnelys-konfigurator — 3D Sanntidsforhåndsvisning", description: "3D-konfigurator for premium minnelys med sanntidsforhåndsvisning. Kunder designer sitt eget lys: størrelse, tekst, skrift, farge, justering. Integrert med produksjonssystem (eksport til .gbl-fil).", features: ["3D Sanntidsforhåndsvisning", "Produksjonsintegrasjon", "Tilpasset Personalisering"] },
    pl: { title: "Konfigurator Zniczy Premium — Podgląd 3D Real-time", description: "Konfigurator 3D dla premium zniczy z podglądem w czasie rzeczywistym. Klienci projektują własny znicz: rozmiar, tekst, czcionka, kolor, wyrównanie. Zintegrowany z systemem produkcji (eksport do pliku .gbl).", features: ["Podgląd 3D Real-time", "Integracja z Produkcją", "Personalizacja na Zamówienie"] },
  },
  "rop-calculator": {
    en: { title: "ROP Calculator — Packaging Fee Calculator 2026-2028", description: "Packaging fee calculator (EPR) for Polish e-commerce and FMCG companies. Calculates annual packaging costs 2026-2028, compares materials (cardboard/plastic/glass), shows savings when switching materials, generates PDF reports. Pure frontend, zero backend costs.", features: ["2026-2028 Cost Projection", "Material Comparison", "PDF Export"] },
    no: { title: "ROP-kalkulator — Emballasjeavgiftskalkulator 2026-2028", description: "Emballasjeavgiftskalkulator (EPR) for polske e-handels- og FMCG-bedrifter. Beregner årlige emballasjekostnader 2026-2028, sammenligner materialer (papp/plast/glass), viser besparelser ved materialbytte, genererer PDF-rapporter. Ren frontend, ingen backendkostnader.", features: ["2026-2028 Kostnadsframskriving", "Materialsammenligning", "PDF-eksport"] },
    pl: { title: "Kalkulator ROP — Opłaty za Opakowania 2026-2028", description: "Kalkulator opłat ROP (Rozszerzona Odpowiedzialność Producenta) dla polskich firm e-commerce i FMCG. Wylicza roczne koszty opakowań 2026-2028, porównuje materiały (karton/plastik/szkło), pokazuje oszczędności przy zamianie materiału, generuje raport PDF. Pure frontend, zero kosztów backend.", features: ["Projekcja Kosztów 2026-2028", "Porównanie Materiałów", "Eksport do PDF"] },
  },
  "wieruszow-travel": {
    en: { title: "TravelPL — Complete Digital System for Travel Agency", description: "Complete digital transformation for Polish coach tour operator: professional website showcasing 12 tours, mobile PWA travel guide for trip participants, and Google Ads campaigns. From zero online presence to modern digital travel agency.", features: ["Website + Mobile App", "Google Ads Campaigns", "PWA Travel Guide"] },
    no: { title: "TravelPL — Komplett digitalt system for reisebyrå", description: "Komplett digital transformasjon for polsk bussreisebyrå: profesjonell nettside med 12 reiser, mobil PWA-reiseguide for deltakere og Google Ads-kampanjer. Fra null online tilstedeværelse til moderne digitalt reisebyrå.", features: ["Nettside + Mobil app", "Google Ads-kampanjer", "PWA Reiseguide"] },
    pl: { title: "TravelPL — Kompletny System Cyfrowy dla Biura Podróży", description: "Kompletna transformacja cyfrowa dla biura podróży organizującego wycieczki autokarowe: profesjonalna strona www z 12 wycieczkami, aplikacja mobilna PWA dla uczestników wycieczek oraz kampanie Google Ads. Od zera do nowoczesnego biura podróży online.", features: ["Strona www + Aplikacja", "Kampanie Google Ads", "PWA Przewodnik"] },
  },
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "swiss-contractor",
    title: "Swiss Art House",
    description: "Museum-grade layout with strict Swiss grid. 4-corner navigation, grayscale-to-color hover effects.",
    industry: "contractor",
    industryLabel: "Total Contractor",
    template: "swiss",
    thumbnail: placeholders.swiss,
    previewVideo: "/previews/swiss-scroll.webm",
    demoUrl: "/demo/swiss.html",
    features: ["Swiss Grid", "4-Corner Nav", "Art House Design"],
    isPremium: true,
  },
  {
    id: "standard-contractor",
    title: "Corporate Standard",
    description: "Professional and trustworthy design. Perfect for government contracts and large projects.",
    industry: "contractor",
    industryLabel: "Total Contractor",
    template: "standard",
    thumbnail: placeholders.standard,
    previewVideo: "/previews/standard-scroll.webm",
    demoUrl: "/demo/standard.html",
    features: ["Kinetic Typography", "Video Hero", "Trust Badges"],
    isPremium: false,
  },
  {
    id: "technical-contractor",
    title: "Technical Brutalist",
    description: "Raw, data-driven wireframe aesthetic. Monospace typography, high information density.",
    industry: "contractor",
    industryLabel: "Total Contractor",
    template: "technical",
    thumbnail: placeholders.technical,
    previewVideo: "/previews/technical-scroll.webm",
    demoUrl: "/demo/technical.html",
    features: ["Wireframe Style", "Monospace Fonts", "Data-Dense"],
    isPremium: false,
  },
  {
    id: "terminal-service",
    title: "Cyber Terminal",
    description: "Green-on-black CLI aesthetic. Perfect for 24/7 emergency service providers.",
    industry: "service",
    industryLabel: "Service Specialist",
    template: "terminal",
    thumbnail: placeholders.terminal,
    previewVideo: "/previews/terminal-scroll.webm",
    demoUrl: "/demo/terminal.html",
    features: ["CLI Aesthetic", "Neon Accents", "24/7 Focus"],
    isPremium: true,
  },
  {
    id: "blueprint-service",
    title: "Blueprint Technical",
    description: "Technical grid with crosshairs and paper-white background. Engineering precision.",
    industry: "service",
    industryLabel: "Service Specialist",
    template: "blueprint",
    thumbnail: placeholders.blueprint,
    previewVideo: "/previews/blueprint-scroll.webm",
    demoUrl: "/demo/blueprint.html",
    features: ["Blueprint Grid", "Technical Lines", "Precise Layout"],
    isPremium: false,
  },
  {
    id: "gallery-finishing",
    title: "Gallery Museum",
    description: "Museum-grade presentation for finishing experts. Serif typography, gold accents.",
    industry: "finishing",
    industryLabel: "Finishing Expert",
    template: "gallery",
    thumbnail: placeholders.gallery,
    previewVideo: "/previews/gallery-scroll.webm",
    demoUrl: "/demo/gallery.html",
    features: ["Museum Grade", "Serif Typography", "Gold Accents"],
    isPremium: true,
  },
  {
    id: "mirco-case-study",
    title: "Mirco — Full B2B Growth System",
    description: "Complete B2B growth system: influencer portal, sales messaging, lead database, marketing strategy — all built from scratch in 8 weeks.",
    industry: "case-study",
    industryLabel: "Case Study",
    template: "canvas",
    thumbnail: "/images/examples/mirco-configurator.png",
    demoUrl: "/case-study/mirco",
    features: ["400+ B2B Leads", "3 Sales Frameworks", "Influencer Portal"],
    isPremium: false,
  },
  {
    id: "candle-configurator",
    title: "Premium Candle Configurator — 3D Real-time Preview",
    description: "3D configurator for premium memorial candles with real-time preview. Customers design their own candle: size, text, font, color, alignment. Integrated with production system (export to .gbl file).",
    industry: "case-study",
    industryLabel: "Case Study",
    template: "canvas",
    thumbnail: "/images/examples/candle-configurator1.png",
    demoUrl: "/case-study/candle-configurator",
    features: ["3D Real-time Preview", "Production Integration", "Custom Personalization"],
    isPremium: false,
  },
  {
    id: "rop-calculator",
    title: "ROP Calculator — Packaging Fee Calculator 2026-2028",
    description: "Packaging fee calculator (EPR) for Polish e-commerce and FMCG companies. Calculates annual packaging costs 2026-2028, compares materials (cardboard/plastic/glass), shows savings when switching materials, generates PDF reports. Pure frontend, zero backend costs.",
    industry: "case-study",
    industryLabel: "Case Study",
    template: "canvas",
    thumbnail: "/images/examples/kalkulator1.png",
    demoUrl: "/case-study/rop-calculator",
    features: ["2026-2028 Cost Projection", "Material Comparison", "PDF Export"],
    isPremium: false,
  },
  {
    id: "wieruszow-travel",
    title: "TravelPL — Complete Digital System for Travel Agency",
    description: "Complete digital transformation for Polish coach tour operator: professional website showcasing 12 tours, mobile PWA travel guide for trip participants, and Google Ads campaigns. From zero online presence to modern digital travel agency.",
    industry: "case-study",
    industryLabel: "Case Study",
    template: "canvas",
    thumbnail: "/images/examples/travel.png",
    demoUrl: "/case-study/wieruszow-travel",
    features: ["Website + Mobile App", "Google Ads Campaigns", "PWA Travel Guide"],
    isPremium: false,
  },
];

// Get localized portfolio items
export function getPortfolioItems(lang: Locale): PortfolioItem[] {
  return portfolioItems.map((item) => {
    const t = itemTranslations[item.id]?.[lang];
    return {
      ...item,
      description: t?.description ?? item.description,
      features: t?.features ?? item.features,
      industryLabel: industryLabelsByLocale[lang]?.[item.industry] ?? item.industryLabel,
    };
  });
}

// Featured items for homepage (3-4 best ones)
export const featuredPortfolioItems = portfolioItems.filter(
  (item) => item.isPremium
);

// Get localized featured items
export function getFeaturedPortfolioItems(lang: Locale): PortfolioItem[] {
  return getPortfolioItems(lang).filter((item) => item.isPremium);
}

// Filter helper
export function filterPortfolio(
  items: PortfolioItem[],
  filters: { industry?: Industry; template?: Template }
): PortfolioItem[] {
  return items.filter((item) => {
    if (filters.industry && item.industry !== filters.industry) return false;
    if (filters.template && item.template !== filters.template) return false;
    return true;
  });
}
