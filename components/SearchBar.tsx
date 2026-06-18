"use client";

import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import { Command } from "cmdk";

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        setResults(await res.json());
      } catch (error) {
        console.log("Abort Error", error);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-surface hover:bg-surface-2 rounded-md p-2 hover:cursor-pointer active:scale-95 md:rounded-xl md:p-3"
      >
        <Search className="text-ink hoverEffect hover:text-accent-p h-4 w-4" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search for products..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && (
              <div className="text-ink-muted p-4 text-sm">Searching...</div>
            )}
            {!loading && query.length >= 2 && (
              <CommandEmpty className="text-ink-muted/30 font-bold tracking-wider">No results... {query}</CommandEmpty>
            )}
            <CommandGroup>
              {results.map((p) => (
                <CommandItem
                  key={p._id}
                  value={p._id}
                  onSelect={() => setOpen(false)}
                >
                  <Link
                    href={`/product/${p.slug?.current}`}
                    className="flex w-full items-center gap-3"
                  >
                    <div className="flex w-full">
                      {p.images?.[0] && (
                        <Image
                          src={urlFor(p.images[0]).url()}
                          alt={p.name ?? ""}
                          width={40}
                          height={40}
                          className="rounded-md object-contain"
                        />
                      )}
                      <div className="flex w-full justify-between">
                        <span className="">{p.name}</span>
                        <PriceFormatter amount={p.price} />
                      </div>
                    </div>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export default SearchBar;
