"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { Locale } from "@/lib/i18n/config";

type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  lang: Locale;
  dict: {
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      gdpr: string;
      gdprLink: string;
      submit: string;
      sending: string;
      success: string;
      successMessage: string;
      error: string;
    };
    validation: {
      nameRequired: string;
      emailInvalid: string;
      messageMin: string;
      gdprRequired: string;
    };
  };
}

export function ContactForm({ lang, dict }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      gdprConsent: false as unknown as true,
    },
  });

  const gdprConsent = watch("gdprConsent");

  // Map zod errors to i18n messages
  const getErrorMessage = (field: keyof ContactFormData) => {
    const error = errors[field];
    if (!error) return undefined;

    switch (field) {
      case "name":
        return dict.validation.nameRequired;
      case "email":
        return dict.validation.emailInvalid;
      case "message":
        return dict.validation.messageMin;
      case "gdprConsent":
        return dict.validation.gdprRequired;
      default:
        return error.message;
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });

      if (response.ok) {
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
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">{dict.form.success}</h3>
        <p className="text-muted-foreground">{dict.form.successMessage}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <Input
          {...register("name")}
          placeholder={dict.form.name}
          error={getErrorMessage("name")}
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Input
          {...register("email")}
          type="email"
          placeholder={dict.form.email}
          error={getErrorMessage("email")}
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Input {...register("company")} placeholder={dict.form.company} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Textarea
          {...register("message")}
          placeholder={dict.form.message}
          rows={5}
          error={getErrorMessage("message")}
        />
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-start gap-3">
        <Checkbox
          id="gdprConsent"
          checked={gdprConsent as boolean}
          onCheckedChange={(checked) =>
            setValue("gdprConsent", checked as unknown as true, { shouldValidate: true })
          }
          error={getErrorMessage("gdprConsent")}
        />
        <label
          htmlFor="gdprConsent"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          {dict.form.gdpr}{" "}
          <a
            href={`/${lang}/privacy`}
            className="text-primary hover:underline"
          >
            {dict.form.gdprLink}
          </a>
        </label>
      </motion.div>
      {errors.gdprConsent && (
        <p className="text-sm text-red-500">{getErrorMessage("gdprConsent")}</p>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-red-500"
        >
          <AlertCircle className="h-4 w-4" />
          <span>{dict.form.error}</span>
        </motion.div>
      )}

      <motion.div variants={fadeUp}>
        <Button
          type="submit"
          disabled={status === "loading"}
          size="lg"
          className="w-full"
        >
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            dict.form.submit
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
