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

const configuratorSchema = z.object({
  // Contact
  email: z.string().email("Podaj poprawny email"),
  phone: z.string().min(9, "Podaj poprawny numer telefonu"),

  // Business info
  companyName: z.string().min(2, "Podaj nazwę firmy"),
  industry: z.string().min(3, "Opisz czym się zajmujesz"),

  // Product specifics
  productType: z.string().min(3, "Opisz jaki produkt chcesz konfigurować"),
  configuratorOptions: z.string().min(10, "Opisz jakie opcje powinien mieć konfigurator"),
  variantsCount: z.enum(["10-50", "50-200", "200+"], {
    required_error: "Wybierz liczbę wariantów",
  }),

  // Assets
  hasAssets: z.enum(["photos", "3d", "none"], {
    required_error: "Wybierz czy masz materiały",
  }),
  assetsLink: z.string().optional(),

  // Features
  showPricing: z.enum(["yes", "no"], {
    required_error: "Wybierz czy pokazywać ceny",
  }),

  // Target audience
  targetAudience: z.enum(["b2b", "b2c", "both"], {
    required_error: "Wybierz grupę docelową",
  }),

  // References
  inspirationUrl: z.string().url("Podaj poprawny URL").optional().or(z.literal("")),

  // Additional
  additionalInfo: z.string().optional(),
});

type ConfiguratorFormData = z.infer<typeof configuratorSchema>;

interface ConfiguratorFormProps {
  lang: Locale;
}

export function ConfiguratorForm({ lang }: ConfiguratorFormProps) {
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
  } = useForm<ConfiguratorFormData>({
    resolver: zodResolver(configuratorSchema),
  });

  const hasAssets = watch("hasAssets");

  // Track InitiateCheckout when user starts filling the form
  const handleFormStart = () => {
    if (!hasTrackedCheckout) {
      trackMetaEvent("InitiateCheckout", {
        content_name: "Configurator Form",
        content_category: "configurator_request",
        value: 15000,
        currency: "PLN",
      });
      setHasTrackedCheckout(true);
    }
  };

  const onSubmit = async (data: ConfiguratorFormData) => {
    setStatus("loading");
    try {
      // Get Meta Pixel cookies for CAPI
      const metaCookies = getMetaCookies();

      const response = await fetch("/api/configurator", {
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
          Otrzymaliśmy Twój formularz. Skontaktujemy się w ciągu 24h żeby omówić szczegóły konfiguratora.
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
            placeholder="Np. Mirco Racing Seats"
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
            placeholder="Np. Produkcja mebli, Ecommerce, Motoryzacja..."
            {...register("industry")}
            className={errors.industry ? "border-red-500" : ""}
          />
          {errors.industry && (
            <p className="text-sm text-red-500 mt-1">
              {errors.industry.message}
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
                      <div className="font-medium">B2B</div>
                      <div className="text-sm text-muted-foreground">
                        Sprzedajesz firmom / dystrybutorom / partnerom
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
                      <div className="font-medium">B2C</div>
                      <div className="text-sm text-muted-foreground">
                        Sprzedajesz konsumentom końcowym
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("targetAudience", "both", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "both"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "both" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "both" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">B2B + B2C</div>
                      <div className="text-sm text-muted-foreground">
                        Sprzedajesz zarówno firmom jak i konsumentom
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

      {/* ========== SEKCJA 3: PRODUKT ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">O produkcie</h3>

        {/* Product Type */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="productType" className="text-sm font-medium">
            Jaki produkt chcesz konfigurować? *
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Np. fotele wyścigowe, świece, meble, ubrania, rowery...
          </p>
          <Input
            id="productType"
            placeholder="Np. Fotele biurowe ergonomiczne"
            {...register("productType")}
            className={errors.productType ? "border-red-500" : ""}
          />
          {errors.productType && (
            <p className="text-sm text-red-500 mt-1">
              {errors.productType.message}
            </p>
          )}
        </motion.div>

        {/* Configurator Options */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="configuratorOptions" className="text-sm font-medium">
            Jakie opcje powinien mieć konfigurator? *
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Opisz co klient będzie mógł zmieniać (np. kolor, materiał, rozmiar, dodatki)
          </p>
          <Textarea
            id="configuratorOptions"
            rows={4}
            placeholder="Np. Kolor tapicerki (8 opcji), materiał (skóra/alcantara/tkanina), kolor szwów, logo haftowane, regulacja lumbar..."
            {...register("configuratorOptions")}
            className={errors.configuratorOptions ? "border-red-500" : ""}
          />
          {errors.configuratorOptions && (
            <p className="text-sm text-red-500 mt-1">
              {errors.configuratorOptions.message}
            </p>
          )}
        </motion.div>

        {/* Variants Count */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Ile kombinacji/wariantów przewidujesz? *
          </Label>
          <Controller
            name="variantsCount"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("variantsCount", "10-50", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "10-50"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "10-50" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "10-50" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">10-50 kombinacji</div>
                      <div className="text-sm text-muted-foreground">
                        Prosty konfigurator (kilka opcji, mało wariantów)
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("variantsCount", "50-200", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "50-200"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "50-200" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "50-200" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">50-200 kombinacji</div>
                      <div className="text-sm text-muted-foreground">
                        Średnio złożony (wiele opcji, średnio wariantów)
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("variantsCount", "200+", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "200+"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "200+" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "200+" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">200+ kombinacji</div>
                      <div className="text-sm text-muted-foreground">
                        Bardzo złożony (dziesiątki opcji, tysiące wariantów)
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.variantsCount && (
            <p className="text-sm text-red-500 mt-2">
              {errors.variantsCount.message}
            </p>
          )}
        </motion.div>
      </div>

      {/* ========== SEKCJA 4: MATERIAŁY ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Materiały wizualne</h3>

        {/* Has Assets */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Czy masz zdjęcia produktu lub modele 3D? *
          </Label>
          <Controller
            name="hasAssets"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("hasAssets", "photos", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "photos"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "photos" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "photos" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">Tak, mam zdjęcia produktu</div>
                      <div className="text-sm text-muted-foreground">
                        Zdjęcia w różnych wariantach/kolorach
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("hasAssets", "3d", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "3d"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "3d" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "3d" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">Tak, mam modele 3D</div>
                      <div className="text-sm text-muted-foreground">
                        Pliki 3D (.obj, .fbx, .gltf) gotowe do renderowania
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("hasAssets", "none", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                  className={`flex items-start space-x-3 rounded-lg border p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    field.value === "none"
                      ? "border-primary bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    field.value === "none" ? "border-primary" : "border-white/30"
                  }`}>
                    {field.value === "none" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <Label className="cursor-pointer flex-1">
                    <div>
                      <div className="font-medium">Nie, nie mam</div>
                      <div className="text-sm text-muted-foreground">
                        Potrzebuję sesji foto lub stworzenia modelu 3D
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.hasAssets && (
            <p className="text-sm text-red-500 mt-2">
              {errors.hasAssets.message}
            </p>
          )}
        </motion.div>

        {/* Assets Link (conditional) */}
        {(hasAssets === "photos" || hasAssets === "3d") && (
          <motion.div
            variants={fadeUp}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Label htmlFor="assetsLink" className="text-sm font-medium">
              Link do materiałów (opcjonalnie)
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Google Drive, Dropbox, WeTransfer, etc.
            </p>
            <Input
              id="assetsLink"
              type="url"
              placeholder="https://drive.google.com/..."
              {...register("assetsLink")}
            />
          </motion.div>
        )}
      </div>

      {/* ========== SEKCJA 5: FUNKCJE ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Funkcjonalność</h3>

        {/* Show Pricing */}
        <motion.div variants={fadeUp}>
          <Label className="text-sm font-medium mb-3 block">
            Czy konfigurator ma pokazywać cenę w czasie rzeczywistym? *
          </Label>
          <Controller
            name="showPricing"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                <div
                  onClick={() => setValue("showPricing", "yes", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
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
                      <div className="font-medium">Tak, pokazuj cenę</div>
                      <div className="text-sm text-muted-foreground">
                        Cena aktualizuje się podczas konfiguracji (jak u Mirco)
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  onClick={() => setValue("showPricing", "no", { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
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
                      <div className="font-medium">Nie, bez ceny</div>
                      <div className="text-sm text-muted-foreground">
                        Użytkownik konfiguruje → dostaje wycenę mailem
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            )}
          />
          {errors.showPricing && (
            <p className="text-sm text-red-500 mt-2">
              {errors.showPricing.message}
            </p>
          )}
        </motion.div>
      </div>

      {/* ========== SEKCJA 6: INSPIRACJE ========== */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold">Inspiracje (opcjonalnie)</h3>

        {/* Inspiration URL */}
        <motion.div variants={fadeUp}>
          <Label htmlFor="inspirationUrl" className="text-sm font-medium">
            Link do konfiguratora który Ci się podoba
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Np. konfigurator konkurencji lub z innej branży
          </p>
          <Input
            id="inspirationUrl"
            type="url"
            placeholder="https://przykladowy-konfigurator.com"
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
            placeholder="Np. integracja z WooCommerce, eksport do PDF, wysyłka konfiguracji do dystrybutora..."
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
            "Umów bezpłatną konsultację"
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
