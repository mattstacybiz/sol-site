import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container py-24 text-center">
      <p className="font-display text-7xl text-sunset">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
        That page wandered off.
      </h1>
      <p className="mt-3 text-ink-muted">
        It happens. Try the shop or read up on kava — both more useful than this page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="sunset"><Link href="/shop">Shop Sol</Link></Button>
        <Button asChild variant="outline"><Link href="/kava-101">Kava 101</Link></Button>
      </div>
    </section>
  );
}
