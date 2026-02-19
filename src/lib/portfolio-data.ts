import type { Locale } from "@/lib/i18n/config";

export type Industry = "contractor" | "service" | "finishing";
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
};

const industryLabelsByLocale: Record<Locale, Record<Industry, string>> = {
  en: { contractor: "Total Contractor", service: "Service Specialist", finishing: "Finishing Expert" },
  no: { contractor: "Totalentreprenør", service: "Servicespesialist", finishing: "Overflateekspert" },
  pl: { contractor: "Generalny wykonawca", service: "Specjalista usługowy", finishing: "Wykończenia" },
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

const itemTranslations: Record<string, Record<Locale, { description: string; features: string[] }>> = {
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
