import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { SEARCH_PRODUCTS_QUERY } from "@/sanity/queries/query";
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json([]);
  const products = await client.fetch(SEARCH_PRODUCTS_QUERY, { q: `${q}*` });
  return NextResponse.json(products);
}