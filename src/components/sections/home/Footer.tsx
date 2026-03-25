"use client";

import { Container } from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  lang: Locale;
  dict: {
    description: string;
    services: string;
    contact: string;
    xray: string;
    copyright: string;
    privacy: string;
    terms: string;
    cookieSettings?: string;
    withdrawal?: string;
  };
}

export function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A] py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${lang}`} className="inline-block">
              <Image
                src="/Logo_white.png"
                alt="DaVinci"
                width={140}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {dict.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-4">
              {dict.contact}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:apps@davinci.agency"
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  apps@davinci.agency
                </a>
              </li>
              <li>
                <Link
                  href={`/${lang}/case-study/mirco`}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  Case Study
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/50">
            &copy; {currentYear} DaVinci. {dict.copyright}
            <br />
            NIP: 7011297183 | KRS: 0001221058 | REGON: 543861552
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground/50">
            <Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors">
              {dict.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors">
              {dict.terms}
            </Link>
            {dict.withdrawal && (
              <Link href={`/${lang}/withdrawal`} className="hover:text-foreground transition-colors">
                {dict.withdrawal}
              </Link>
            )}
            {dict.cookieSettings && (
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("davinci-cookie-consent");
                  window.location.reload();
                }}
                className="hover:text-foreground transition-colors"
              >
                {dict.cookieSettings}
              </button>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
