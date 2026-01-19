"use client";

import { Container } from "@/components/shared/Container";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  lang: Locale;
  dict: {
    description: string;
    services: string;
    contact: string;
    newWebsite: string;
    wcagCompliance: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
}

export function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#0A0A0A] py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              href={`/${lang}`}
              className="text-2xl font-semibold text-foreground"
            >
              Deal<span className="text-primary">Catcher</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              {dict.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {dict.services}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/no-website`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {dict.newWebsite}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/wcag-compliance`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {dict.wcagCompliance}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {dict.contact}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@dealcatcher.io"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  hello@dealcatcher.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} DealCatcher. {dict.copyright}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors">
              {dict.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors">
              {dict.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
