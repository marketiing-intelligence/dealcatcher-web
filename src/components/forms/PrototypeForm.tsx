"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { Locale } from "@/lib/i18n/config";
import { z } from "zod";
import { trackMetaEvent } from "@/components/analytics/MetaPixel";
import { getMetaCookies } from "@/lib/utils/cookies";

type FormStatus = "idle" | "loading" | "success" | "error";

const prototypeSchema = z.object({
  // Contact
  email: z.string().email("Podaj poprawny email"),
  phone: z.string().min(9, "Podaj poprawny numer telefonu"),

  // Business info
  companyName: z.string().min(2, "Podaj nazwę firmy"),
  industry: z.string().min(3, "Opisz czym się zajmujesz"),
  currentWebsite: z.string().url("Podaj poprawny URL").optional().or(z.literal("")),

  // Project specifics
  language: z.enum(["pl", "en"], {
    required_error: "Wybierz język strony",
  }),
  targetAudience: z.enum(["b2b", "b2c", "b2g"], {
    required_error: "Wybierz grupę docelową",
  }),

  // Services & USP
  service1: z.string().min(3, "Podaj pierwszą usługę"),
  service2: z.string().min(3, "Podaj drugą usługę"),
  service3: z.string().min(3, "Podaj trzecią usługę"),
  usp: z.string().min(10, "Opisz główną korzyść (min 10 znaków)"),

  // Branding
  hasLogo: z.enum(["yes", "no"], {
    required_error: "Wybierz czy masz logo",
  }),
  brandingLink: z.string().optional(),

  // Page structure
  goal: z.enum(["info", "form", "consultation", "sales"], {
    required_error: "Wybierz cel strony",
  }),

  // References
  inspirationUrl: z.string().url("Podaj poprawny URL").optional().or(z.literal("")),

  // Additional
  additionalInfo: z.string().optional(),
});

type PrototypeFormData = z.infer<typeof prototypeSchema>;

interface PrototypeFormProps {
  lang: Locale;
}

export function PrototypeForm({ lang }: PrototypeFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm<PrototypeFormData>({
    resolver: zodResolver(prototypeSchema),
  });

  const hasLogo = watch("hasLogo");

  // Track InitiateCheckout when user starts filling the form
  const handleFormStart = () => {
    if (!hasTrackedCheckout) {
      trackMetaEvent("InitiateCheckout", {
        content_name: "Prototype Form",
        content_category: "prototype_request",
        value: 3500,
        currency: "PLN",
      });
      setHasTrackedCheckout(true);
    }
  };

  const onSubmit = async (data: PrototypeFormData) => {
    setStatus("loading");
    try {
      // Get Meta Pixel cookies for CAPI
      const metaCookies = getMetaCookies();

      const response = await fetch("/api/prototype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang, ...metaCookies }),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => {
        if (status !== "loading") setStatus("idle");
      }, 5000);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Dziękujemy!</h3>
        <p className="text-muted-foreground">
          Otrzymamy Twój formularz i skontaktujemy się w ciągu 24h.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* ========== SEKCJA 1: KONTAKT ========== */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Dane kontaktowe</h3>

        {/* Email */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="email" className="text-sm font-medium">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="twoj@email.pl"
            {...register("email")}
            onFocus={handleFormStart}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="phone" className="text-sm font-medium">
            Telefon *
          </Label>
          <div className="flex gap-2 mt-2">
            <div className="w-20">
              <Input value="+48" disabled className="text-center" />
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="123 456 789"
              {...register("phone")}
              className={errors.phone ? "border-red-500" : ""}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </motion.div>
      </div>

      {/* ========== SEKCJA 2: FIRMA ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">O Twojej firmie</h3>

        {/* Company Name */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="companyName" className="text-sm font-medium">
            Nazwa firmy *
          </Label>
          <Input
            id="companyName"
            placeholder="Np. Studio Beauty & Spa"
            {...register("companyName")}
            className={errors.companyName ? "border-red-500" : ""}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.companyName.message}
            </p>
          )}
        </motion.div>

        {/* Industry */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="industry" className="text-sm font-medium">
            Branża / czym się zajmujesz? *
          </Label>
          <Input
            id="industry"
            placeholder="Np. Fizjoterapia, Beauty, Usługi budowlane..."
            {...register("industry")}
            className={errors.industry ? "border-red-500" : ""}
          />
          {errors.industry && (
            <p className="text-sm text-red-500 mt-1">
              {errors.industry.message}
            </p>
          )}
        </motion.div>

        {/* Current Website */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="currentWebsite" className="text-sm font-medium">
            Link do obecnej strony (jeśli istnieje)
          </Label>
          <Input
            id="currentWebsite"
            type="url"
            placeholder="https://twoja-strona.pl"
            {...register("currentWebsite")}
            className={errors.currentWebsite ? "border-red-500" : ""}
          />
          {errors.currentWebsite && (
            <p className="text-sm text-red-500 mt-1">
              {errors.currentWebsite.message}
            </p>
          )}
        </motion.div>

        {/* Language */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Język strony *
          </Label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("language", "pl", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "pl"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "pl" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "pl" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    Polski
                  </Label>
                </div>
                <div
                  onClick={() => setValue("language", "en", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "en"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "en" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "en" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    Angielski
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.language && (
            <p className="text-sm text-red-500 mt-2">
              {errors.language.message}
            </p>
          )}
        </motion.div>

        {/* Target Audience */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Grupa docelowa *
          </Label>
          <Controller
            name="targetAudience"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("targetAudience", "b2b", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "b2b"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "b2b" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "b2b" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">B2B (Business to Business)</div>
                      <div className="text-sm text-muted-foreground">
                        Sprzedajesz firmom / przedsiębiorcom
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("targetAudience", "b2c", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "b2c"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "b2c" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "b2c" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">B2C (Business to Consumer)</div>
                      <div className="text-sm text-muted-foreground">
                        Sprzedajesz konsumentom końcowym
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("targetAudience", "b2g", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "b2g"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "b2g" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "b2g" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">B2G (Business to Government)</div>
                      <div className="text-sm text-muted-foreground">
                        Sprzedajesz instytucjom publicznym / rządowym
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.targetAudience && (
            <p className="text-sm text-red-500 mt-2">
              {errors.targetAudience.message}
            </p>
          )}
        </motion.div>
      </div>

      {/* ========== SEKCJA 3: USŁUGI & USP ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Oferta</h3>

        <motion.div variants={fadeUp} className="space-y-4">
          <Label className="text-sm font-medium">
            3 główne usługi / produkty *
          </Label>
          <p className="text-sm text-muted-foreground -mt-2">
            Te usługi będą promowane na stronie
          </p>

          <Input
            placeholder="1. Np. Fizjoterapia sportowa"
            {...register("service1")}
            className={errors.service1 ? "border-red-500" : ""}
          />
          {errors.service1 && (
            <p className="text-sm text-red-500">{errors.service1.message}</p>
          )}

          <Input
            placeholder="2. Np. Rehabilitacja pourazowa"
            {...register("service2")}
            className={errors.service2 ? "border-red-500" : ""}
          />
          {errors.service2 && (
            <p className="text-sm text-red-500">{errors.service2.message}</p>
          )}

          <Input
            placeholder="3. Np. Masaż leczniczy"
            {...register("service3")}
            className={errors.service3 ? "border-red-500" : ""}
          />
          {errors.service3 && (
            <p className="text-sm text-red-500">{errors.service3.message}</p>
          )}
        </motion.div>

        {/* USP */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="usp" className="text-sm font-medium">
            Główna korzyść dla klienta (USP) *
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Czym różnisz się od konkurencji? Co sprawia że klient powinien
            wybrać Ciebie?
          </p>
          <Input
            id="usp"
            placeholder="Np. Indywidualne podejście + 15 lat doświadczenia + wizyty domowe"
            {...register("usp")}
            className={errors.usp ? "border-red-500" : ""}
          />
          {errors.usp && (
            <p className="text-sm text-red-500 mt-1">{errors.usp.message}</p>
          )}
        </motion.div>
      </div>

      {/* ========== SEKCJA 4: BRANDING ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Identyfikacja wizualna</h3>

        {/* Has Logo */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Czy masz już logo i kolory firmowe? *
          </Label>
          <Controller
            name="hasLogo"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("hasLogo", "yes", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "yes"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "yes" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "yes" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">Tak, mam logo i kolory</div>
                      <div className="text-sm text-muted-foreground">
                        Użyjemy Twojego brandingu
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("hasLogo", "no", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "no"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "no" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "no" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">Nie, nie mam</div>
                      <div className="text-sm text-muted-foreground">
                        Dobierzemy kolory odpowiednie dla Twojej branży
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.hasLogo && (
            <p className="text-sm text-red-500 mt-2">
              {errors.hasLogo.message}
            </p>
          )}
        </motion.div>

        {/* Branding Link (conditional) */}
        {hasLogo === "yes" && (
          <motion.div
            variants={fadeUp}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Label htmlFor="brandingLink" className="text-sm font-medium">
              Link do logo / brandbooka (opcjonalnie)
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Google Drive, Dropbox, WeTransfer, etc.
            </p>
            <Input
              id="brandingLink"
              type="url"
              placeholder="https://drive.google.com/..."
              {...register("brandingLink")}
            />
          </motion.div>
        )}
      </div>

      {/* ========== SEKCJA 5: STRUKTURA STRONY ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Struktura strony</h3>

        {/* Goal */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Główny cel strony *
          </Label>
          <Controller
            name="goal"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("goal", "info", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "info"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "info" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "info" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    Strona informacyjna / wizytówka
                  </Label>
                </div>
                <div
                  onClick={() => setValue("goal", "form", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "form"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "form" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "form" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    Wypełnienie formularza kontaktowego
                  </Label>
                </div>
                <div
                  onClick={() => setValue("goal", "consultation", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "consultation"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "consultation" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "consultation" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    Umówienie konsultacji / wizyty
                  </Label>
                </div>
                <div
                  onClick={() => setValue("goal", "sales", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "sales"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "sales" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "sales" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    Sprzedaż produktu / usługi
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.goal && (
            <p className="text-sm text-red-500 mt-2">{errors.goal.message}</p>
          )}
        </motion.div>

      </div>

      {/* ========== SEKCJA 6: INSPIRACJE ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Inspiracje (opcjonalnie)</h3>

        {/* Inspiration URL */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="inspirationUrl" className="text-sm font-medium">
            Link do strony którą lubisz
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Pokaż nam stronę konkurencji lub z innej branży którą uważasz za
            świetną
          </p>
          <Input
            id="inspirationUrl"
            type="url"
            placeholder="https://przykladowa-strona.pl"
            {...register("inspirationUrl")}
            className={errors.inspirationUrl ? "border-red-500" : ""}
          />
          {errors.inspirationUrl && (
            <p className="text-sm text-red-500 mt-1">
              {errors.inspirationUrl.message}
            </p>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="additionalInfo" className="text-sm font-medium">
            Dodatkowe informacje
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Wszystko co jeszcze powinniśmy wiedzieć
          </p>
          <Textarea
            id="additionalInfo"
            rows={4}
            placeholder="Np. masz już zdjęcia, potrzebujesz sesji foto, specjalne wymagania techniczne..."
            {...register("additionalInfo")}
          />
        </motion.div>
      </div>

      {/* Submit */}
      <motion.div variants={fadeUp} className="pt-6">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wysyłanie...
            </>
          ) : (
            "Wyślij i odbierz prototyp w 48h"
          )}
        </Button>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-500 text-sm mt-4">
            <AlertCircle className="h-4 w-4" />
            Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio.
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center mt-4">
          Wypełnienie formularza zajmuje ~5 minut
        </p>
      </motion.div>
    </motion.form>
  );
}
