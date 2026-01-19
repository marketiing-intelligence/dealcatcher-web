"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";

interface FloatingContactProps {
  lang: Locale;
  dict: {
    whatsapp: string;
    call: string;
    quickContact: string;
    phonePlaceholder: string;
    submit: string;
    success: string;
    callbackPromise: string;
  };
  phoneNumber: string;
}

export function FloatingContact({ lang, dict, phoneNumber }: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/quick-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, lang }),
      });
      setSubmitted(true);
      setPhone("");
    } catch {
      // Still show success for UX
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    lang === "no"
      ? "Hei! Jeg er interessert i en nettside for bedriften min."
      : "Hi! I'm interested in a website for my business."
  )}`;

  const callUrl = `tel:${phoneNumber}`;

  return (
    <>
      {/* Floating action buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Quick contact form */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="bg-card border border-border rounded-2xl p-4 shadow-2xl w-72"
              >
                {submitted ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Send className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="font-medium text-foreground">{dict.success}</p>
                    <p className="text-sm text-muted-foreground mt-1">{dict.callbackPromise}</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit}>
                    <p className="text-sm font-medium text-foreground mb-3">{dict.quickContact}</p>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={dict.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">{dict.submit}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {dict.submit}
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {dict.callbackPromise}
                    </p>
                  </form>
                )}
              </motion.div>

              {/* Call button */}
              <motion.a
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.1 }}
                href={callUrl}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">{dict.call}</span>
              </motion.a>

              {/* WhatsApp button */}
              <motion.a
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{dict.whatsapp}</span>
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setSubmitted(false);
          }}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            isOpen
              ? "bg-muted-foreground hover:bg-muted-foreground/80"
              : "bg-primary hover:bg-primary/90"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse animation on closed state */}
        {!isOpen && (
          <motion.div
            className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </>
  );
}
