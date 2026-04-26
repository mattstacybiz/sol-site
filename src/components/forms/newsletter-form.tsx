"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analytics } from "@/lib/analytics";
import { submitNewsletterAction } from "@/app/actions/forms";

const schema = z.object({ email: z.string().email("Enter a valid email.") });
type FormValues = z.infer<typeof schema>;

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [ok, setOk] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setBusy(true);
    const res = await submitNewsletterAction({ email: values.email, source });
    setBusy(false);
    if (res.ok) {
      analytics.track("newsletter_submit", { source });
      reset();
      setOk(true);
    }
  };

  if (ok) {
    return (
      <p className="text-sm text-ink" role="status">
        You&rsquo;re on the list. Talk soon.
      </p>
    );
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="nl-email" className="sr-only">Email</label>
      <Input
        id="nl-email"
        type="email"
        placeholder="you@email.com"
        autoComplete="email"
        aria-invalid={Boolean(errors.email) || undefined}
        {...register("email")}
      />
      <Button type="submit" variant="primary" size="md" disabled={busy}>
        {busy ? "…" : "Join"}
      </Button>
    </form>
  );
}
