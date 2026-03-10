"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { xraySchema, type XRayFormData } from "@/lib/validations/xray";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { Locale } from "@/lib/i18n/config";
import { trackMetaEvent } from "@/components/analytics/MetaPixel";
import { getMetaCookies } from "@/lib/utils/cookies";

type FormStatus = "idle" | "loading" | "success" | "error";

interface XRayFormProps {
  lang: Locale;
  dict: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      company: string;
      companySize: string;
      companySizeOptions: string[];
      problem: string;
      phone: string;
      gdpr: string;
      gdprLink: string;
    };
    submit: string;
    sending: string;
    success: string;
    successMessage: string;
    error: string;
  };
}

export function XRayForm({ lang, dict }: XRayFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<XRayFormData>({
    resolver: zodResolver(xraySchema),
    defaultValues: {
      gdprConsent: false as unknown as true,
      companySize: undefined,
    },
  });

  const gdprConsent = watch("gdprConsent");
  const companySize = watch("companySize");

  // Map zod errors to i18n messages
  const getErrorMessage = (field: keyof XRayFormData) => {
    const error = errors[field];
    if (!error) return undefined;
    return error.message;
  };

  const onSubmit = async (data: XRayFormData) => {
    setStatus("loading");
    try {
      // Get Meta Pixel cookies for CAPI
      const metaCookies = getMetaCookies();

      const response = await fetch("/api/xray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang, ...metaCookies }),
      });

      if (response.ok) {
        // Track Lead event with Meta Pixel (client-side)
        trackMetaEvent("Lead", {
          content_name: "X-Ray Form Submission",
          content_category: "xray",
          currency: lang === "pl" ? "PLN" : "USD",
        });

        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h3 className="text-2xl font-semibold mb-2">{dict.success}</h3>
        <p className="text-muted-foreground">{dict.successMessage}</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold mb-3">{dict.title}</h3>
        <p className="text-muted-foreground">{dict.subtitle}</p>
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-6"
      >
        {/* Name */}
        <motion.div variants={fadeUp}>
          <Input {...register("name")} placeholder={dict.fields.name} error={getErrorMessage("name")} />
        </motion.div>

        {/* Email */}
        <motion.div variants={fadeUp}>
          <Input
            {...register("email")}
            type="email"
            placeholder={dict.fields.email}
            error={getErrorMessage("email")}
          />
        </motion.div>

        {/* Company */}
        <motion.div variants={fadeUp}>
          <Input
            {...register("company")}
            placeholder={dict.fields.company}
            error={getErrorMessage("company")}
          />
        </motion.div>

        {/* Company Size - Dropdown using custom select */}
        <motion.div variants={fadeUp}>
          <Controller
            name="companySize"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">{dict.fields.companySize}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["1-10", "10-20", "20-50", "50-100", "100+"].map((size, index) => (
                    <div
                      key={size}
                      onClick={() => setValue("companySize", size as any, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                      className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                        field.value === size
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/50 hover:border-primary/50"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          field.value === size ? "border-primary" : "border-muted-foreground"
                        }`}
                      >
                        {field.value === size && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </div>
                      <span className="text-sm">{dict.fields.companySizeOptions[index]}</span>
                    </div>
                  ))}
                </div>
                {errors.companySize && (
                  <p className="text-sm text-red-500">{getErrorMessage("companySize")}</p>
                )}
              </div>
            )}
          />
        </motion.div>

        {/* Problem/Goal */}
        <motion.div variants={fadeUp}>
          <Textarea
            {...register("problem")}
            placeholder={dict.fields.problem}
            rows={5}
            error={getErrorMessage("problem")}
          />
        </motion.div>

        {/* Phone (optional) */}
        <motion.div variants={fadeUp}>
          <Input {...register("phone")} type="tel" placeholder={dict.fields.phone} />
        </motion.div>

        {/* GDPR Consent */}
        <motion.div variants={fadeUp} className="flex items-start gap-3">
          <Checkbox
            id="gdprConsent"
            checked={gdprConsent as boolean}
            onCheckedChange={(checked) =>
              setValue("gdprConsent", checked as unknown as true, { shouldValidate: true })
            }
            error={getErrorMessage("gdprConsent")}
          />
          <label htmlFor="gdprConsent" className="text-sm text-muted-foreground cursor-pointer">
            {dict.fields.gdpr}{" "}
            <a href={`/${lang}/privacy`} className="text-primary hover:underline">
              {dict.fields.gdprLink}
            </a>
          </label>
        </motion.div>
        {errors.gdprConsent && <p className="text-sm text-red-500">{getErrorMessage("gdprConsent")}</p>}

        {/* Error message */}
        {status === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>{dict.error}</span>
          </motion.div>
        )}

        {/* Submit button */}
        <motion.div variants={fadeUp}>
          <Button
            type="submit"
            disabled={status === "loading"}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : dict.submit}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}
