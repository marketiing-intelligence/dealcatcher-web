"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchTo = currentLang === "en" ? "no" : "en";
  const newPath = pathname.replace(`/${currentLang}`, `/${switchTo}`);

  return (
    <Link
      href={newPath}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary/50 transition-colors text-sm font-medium"
    >
      <span
        className={
          currentLang === "en" ? "text-primary" : "text-muted-foreground"
        }
      >
        EN
      </span>
      <span className="text-muted-foreground">/</span>
      <span
        className={
          currentLang === "no" ? "text-primary" : "text-muted-foreground"
        }
      >
        NO
      </span>
    </Link>
  );
}
