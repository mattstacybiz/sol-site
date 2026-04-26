import { NextResponse } from "next/server";

import { getCurrentCart } from "@/lib/cart-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const cart = await getCurrentCart();
  return NextResponse.json(cart);
}
