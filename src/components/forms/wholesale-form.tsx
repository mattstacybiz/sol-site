"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { analytics } from "@/lib/analytics";
import { submitWholesaleAction, wholesaleSchema } from "@/app/actions/forms";

type FormValues = z.infer<typeof wholesaleSchema>;

export function WholesaleForm() {
  const [ok, setOk] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(wholesaleSchema),
    defaultValues: { businessType: "kava-bar" },
  });
  const businessType = watch("businessType");

  const onSubmit = async (values: FormValues) => {
    setBusy(true);
    setErr(null);
    const res = await submitWholesaleAction(values);
    setBusy(false);
    if (res.ok) {
      analytics.track("wholesale_submit", { businessType: values.businessType });
      setOk(true);
    } else {
      setErr(res.error);
    }
  };

  if (ok) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center" role="status">
        <h2 className="font-display text-2xl text-ink">Thanks — we&rsquo;ll be in touch.</h2>
        <p className="mt-2 text-ink-muted">
          Wholesale lead times are 1&ndash;2 business days. Tampa accounts get priority.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="w-business">Business name</Label>
          <Input id="w-business" {...register("businessName")} />
          {errors.businessName ? <p className="text-xs text-sunset-700">{errors.businessName.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-type">Business type</Label>
          <Select value={businessType} onValueChange={(v) => setValue("businessType", v as FormValues["businessType"])}>
            <SelectTrigger id="w-type"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="kava-bar">Kava bar</SelectItem>
              <SelectItem value="smoke-shop">Smoke shop</SelectItem>
              <SelectItem value="retail">Retail / convenience</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-city">City</Label>
          <Input id="w-city" {...register("city")} />
          {errors.city ? <p className="text-xs text-sunset-700">{errors.city.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-state">State</Label>
          <Input id="w-state" placeholder="FL" maxLength={2} {...register("state")} />
          {errors.state ? <p className="text-xs text-sunset-700">{errors.state.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-name">Contact name</Label>
          <Input id="w-name" autoComplete="name" {...register("contactName")} />
          {errors.contactName ? <p className="text-xs text-sunset-700">{errors.contactName.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-email">Email</Label>
          <Input id="w-email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-sunset-700">{errors.email.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-phone">Phone (optional)</Label>
          <Input id="w-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="w-volume">Estimated monthly volume</Label>
          <Input id="w-volume" placeholder="e.g. 6 cases / month" {...register("estimatedMonthlyVolume")} />
          {errors.estimatedMonthlyVolume ? (
            <p className="text-xs text-sunset-700">{errors.estimatedMonthlyVolume.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="w-message">Anything else?</Label>
        <Textarea id="w-message" placeholder="Tell us about your bar / shop." {...register("message")} />
      </div>

      {err ? <p className="text-sm text-sunset-700">{err}</p> : null}

      <Button type="submit" variant="sunset" size="lg" disabled={busy}>
        {busy ? "Sending…" : "Request wholesale info"}
      </Button>
    </form>
  );
}
