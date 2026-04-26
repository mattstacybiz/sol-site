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
import { contactSchema, submitContactAction } from "@/app/actions/forms";

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
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
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: "general" },
  });

  const topic = watch("topic");

  const onSubmit = async (values: FormValues) => {
    setBusy(true);
    setErr(null);
    const res = await submitContactAction(values);
    setBusy(false);
    if (res.ok) {
      analytics.track("contact_submit", { topic: values.topic });
      setOk(true);
    } else {
      setErr(res.error);
    }
  };

  if (ok) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center" role="status">
        <h2 className="font-display text-2xl text-ink">Got it.</h2>
        <p className="mt-2 text-ink-muted">We&rsquo;ll get back to you within a couple of business days.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot */}
      <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-2">
        <Label htmlFor="c-name">Name</Label>
        <Input id="c-name" autoComplete="name" {...register("name")} />
        {errors.name ? <p className="text-xs text-sunset-700">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-email">Email</Label>
        <Input id="c-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email ? <p className="text-xs text-sunset-700">{errors.email.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-topic">Topic</Label>
        <Select value={topic} onValueChange={(v) => setValue("topic", v as FormValues["topic"])}>
          <SelectTrigger id="c-topic"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="press">Press</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-message">Message</Label>
        <Textarea id="c-message" {...register("message")} />
        {errors.message ? <p className="text-xs text-sunset-700">{errors.message.message}</p> : null}
      </div>

      {err ? <p className="text-sm text-sunset-700">{err}</p> : null}

      <Button type="submit" variant="sunset" size="lg" disabled={busy}>
        {busy ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
