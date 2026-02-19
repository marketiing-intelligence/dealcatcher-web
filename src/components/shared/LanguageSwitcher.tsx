"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "no", label: "NO" },
  { code: "pl", label: "PL" },
];

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-border">
      {languages.map((lang, index) => {
        const newPath = pathname.replace(`/${currentLang}`, `/${lang.code}`);
        const isActive = currentLang === lang.code;

        return (
          <span key={lang.code} className="flex items-center">
            {index > 0 && (
              <span className="text-muted-foreground/40 mx-0.5">/</span>
            )}
            {isActive ? (
              <span className="text-primary text-sm font-medium px-1">
                {lang.label}
              </span>
            ) : (
              <Link
                href={newPath}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium px-1"
              >
                {lang.label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
