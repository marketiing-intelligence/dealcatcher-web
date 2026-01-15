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

export const portfolioItems: PortfolioItem[] = [
  {
    id: "swiss-contractor",
    title: "Swiss Art House",
    description:
      "Museum-grade layout with strict Swiss grid. 4-corner navigation, grayscale-to-color hover effects.",
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
    description:
      "Professional and trustworthy design. Perfect for government contracts and large projects.",
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
    description:
      "Raw, data-driven wireframe aesthetic. Monospace typography, high information density.",
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
    description:
      "Green-on-black CLI aesthetic. Perfect for 24/7 emergency service providers.",
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
    description:
      "Technical grid with crosshairs and paper-white background. Engineering precision.",
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
    description:
      "Museum-grade presentation for finishing experts. Serif typography, gold accents.",
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

// Featured items for homepage (3-4 best ones)
export const featuredPortfolioItems = portfolioItems.filter(
  (item) => item.isPremium
);

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
