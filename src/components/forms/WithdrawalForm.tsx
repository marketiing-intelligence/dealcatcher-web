"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { Locale } from "@/lib/i18n/config";

type FormStatus = "idle" | "loading" | "success" | "error";

const withdrawalSchema = z.object({
  serviceDescription: z.string().min(1, "Required"),
  orderedOn: z.string().min(1, "Required"),
  consumerName: z.string().min(1, "Required"),
  consumerAddress: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

interface WithdrawalFormProps {
  lang: Locale;
  dict: {
    serviceLabel: string;
    orderedOnLabel: string;
    nameLabel: string;
    addressLabel: string;
    dateLabel: string;
    submit: string;
    success: string;
    error: string;
  };
}

export function WithdrawalForm({ lang, dict }: WithdrawalFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: WithdrawalFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/withdrawal", {
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
        className="text-center py-12 bg-card border border-border rounded-lg"
      >
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">
          {lang === "no" ? "Sendt!" : "Submitted!"}
        </h3>
        <p className="text-muted-foreground">{dict.success}</p>
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
      className="space-y-6 bg-card border border-border rounded-lg p-6"
    >
      {/* Service Description */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.serviceLabel}
        </label>
        <Textarea
          {...register("serviceDescription")}
          rows={3}
          error={errors.serviceDescription?.message}
        />
      </motion.div>

      {/* Ordered On */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.orderedOnLabel}
        </label>
        <Input
          {...register("orderedOn")}
          type="date"
          error={errors.orderedOn?.message}
        />
      </motion.div>

      {/* Consumer Name */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.nameLabel}
        </label>
        <Input
          {...register("consumerName")}
          error={errors.consumerName?.message}
        />
      </motion.div>

      {/* Consumer Address */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.addressLabel}
        </label>
        <Textarea
          {...register("consumerAddress")}
          rows={2}
          error={errors.consumerAddress?.message}
        />
      </motion.div>

      {/* Date */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.dateLabel}
        </label>
        <Input {...register("date")} type="date" error={errors.date?.message} />
      </motion.div>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-red-500"
        >
          <AlertCircle className="h-4 w-4" />
          <span>{dict.error}</span>
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
            dict.submit
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
