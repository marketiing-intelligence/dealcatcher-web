"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface CookieConsentBannerProps {
  lang: Locale;
  dict: {
    title: string;
    description: string;
    acceptAll: string;
    acceptEssential: string;
    customize: string;
    savePreferences: string;
    categories: {
      essential: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
    };
    privacyLink: string;
    privacyLinkText: string;
  };
}

const COOKIE_CONSENT_KEY = "dealcatcher-cookie-consent";

type ConsentState = {
  essential: boolean;
  analytics: boolean;
  timestamp: number;
};

export function CookieConsentBanner({ lang, dict }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load existing preferences and apply them
      try {
        const parsed: ConsentState = JSON.parse(consent);
        if (parsed.analytics) {
          enableAnalytics();
        }
      } catch {
        // Invalid consent, show banner
        setIsVisible(true);
      }
    }
  }, []);

  const enableAnalytics = () => {
    // Enable Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const disableAnalytics = () => {
    // Disable Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  const saveConsent = (analytics: boolean) => {
    const consent: ConsentState = {
      essential: true, // Always true
      analytics,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

    if (analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleAcceptEssential = () => {
    saveConsent(false);
  };

  const handleSavePreferences = () => {
    saveConsent(analyticsEnabled);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Main content */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <Cookie className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {dict.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {dict.description}{" "}
                    <Link
                      href={`/${lang}/privacy`}
                      className="text-primary hover:underline"
                    >
                      {dict.privacyLinkText}
                    </Link>
                    .
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleAcceptAll} size="sm">
                      {dict.acceptAll}
                    </Button>
                    <Button
                      onClick={handleAcceptEssential}
                      variant="outline"
                      size="sm"
                    >
                      {dict.acceptEssential}
                    </Button>
                    <Button
                      onClick={() => setShowCustomize(!showCustomize)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      {dict.customize}
                      {showCustomize ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Customize panel */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {/* Essential cookies - always on */}
                    <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {dict.categories.essential.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {dict.categories.essential.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {lang === "no" ? "Alltid pa" : "Always on"}
                        </span>
                      </div>
                    </div>

                    {/* Analytics cookies - toggleable */}
                    <div className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {dict.categories.analytics.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {dict.categories.analytics.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={analyticsEnabled}
                          onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            analyticsEnabled ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              analyticsEnabled
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Save button */}
                    <div className="flex justify-end pt-2">
                      <Button onClick={handleSavePreferences} size="sm">
                        {dict.savePreferences}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export a function to open cookie settings from footer
export function openCookieSettings() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.location.reload();
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, string>
    ) => void;
  }
}
