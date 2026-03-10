"use client";

import { Container } from "@/components/shared/Container";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { Calendar, Menu, X, ChevronDown } from "lucide-react";
import { CALCOM_BOOKING_URL } from "@/lib/constants";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

interface NavbarProps {
  lang: Locale;
  dict: {
    nav: {
      services: string;
      portfolio: string;
      xray?: string;
      newWebsite: string;
      wcagCompliance?: string;
      freePrototype: string;
      configurators: string;
      googleAds: string;
      auditMarketing: string;
      customerDatabase: string;
      customTools: string;
      contact: string;
    };
  };
}

const bookCallLabels: Record<Locale, string> = {
  en: "Book a call",
  no: "Book en samtale",
  pl: "Umów rozmowę",
};

export function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const serviceLinks = [
    ...(dict.nav.xray ? [{ href: `/${lang}/xray`, label: dict.nav.xray }] : []),
    { href: `/${lang}/no-website`, label: dict.nav.newWebsite },
    { href: `/${lang}/konfiguratory`, label: dict.nav.configurators },
    { href: `/${lang}/google-ads`, label: dict.nav.googleAds },
    { href: `/${lang}/audyt-marketingowy`, label: dict.nav.auditMarketing },
    { href: `/${lang}/baza-klientow`, label: dict.nav.customerDatabase },
    { href: `/${lang}/narzedzia-na-miare`, label: dict.nav.customTools },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="text-xl md:text-2xl font-semibold text-foreground group"
          >
            <span className="transition-colors">Deal</span>
            <span className="text-primary group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all">Catcher</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger suppressHydrationWarning>
                {dict.nav.services}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href={`/${lang}/portfolio`}
              className="relative text-muted-foreground hover:text-foreground transition-colors group"
            >
              {dict.nav.portfolio}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="relative text-muted-foreground hover:text-foreground transition-colors group"
            >
              {dict.nav.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Button
              asChild
              className="relative bg-primary text-primary-foreground overflow-hidden group"
            >
              <a href={CALCOM_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {bookCallLabels[lang]}
                </span>
              </a>
            </Button>
            <LanguageSwitcher currentLang={lang} />
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </Container>

      {/* Mobile Navigation - Glass effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background/80 backdrop-blur-xl"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-2">
                {/* Services Submenu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                >
                  <MobileServicesMenu
                    lang={lang}
                    serviceLinks={serviceLinks}
                    servicesLabel={dict.nav.services}
                    onLinkClick={() => setIsOpen(false)}
                  />
                </motion.div>

                {/* Portfolio Link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href={`/${lang}/portfolio`}
                    className="flex items-center text-foreground py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.nav.portfolio}
                  </Link>
                </motion.div>

                {/* Contact Link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href={`/${lang}/contact`}
                    className="flex items-center text-foreground py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.nav.contact}
                  </Link>
                </motion.div>

                {/* Book Call Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2"
                >
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-accent-hover w-full"
                  >
                    <a href={CALCOM_BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      {bookCallLabels[lang]}
                    </a>
                  </Button>
                </motion.div>

                {/* Language Switcher */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="py-2 px-4"
                >
                  <LanguageSwitcher currentLang={lang} />
                </motion.div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Mobile Services Submenu Component
interface MobileServicesMenuProps {
  lang: Locale;
  serviceLinks: Array<{ href: string; label: string }>;
  servicesLabel: string;
  onLinkClick: () => void;
}

function MobileServicesMenu({
  serviceLinks,
  servicesLabel,
  onLinkClick,
}: MobileServicesMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-foreground py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
      >
        <span>{servicesLabel}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 overflow-hidden"
          >
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center text-muted-foreground py-2 px-4 rounded-lg hover:bg-white/5 hover:text-foreground transition-colors"
                onClick={() => {
                  setIsExpanded(false);
                  onLinkClick();
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
