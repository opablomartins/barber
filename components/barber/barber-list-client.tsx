"use client";

import { useMemo, useState } from "react";
import type { Barber } from "@/types";
import { BarberList } from "@/components/barber/barber-list";
import { BarberSearch } from "@/components/barber/barber-search";
import { RegionFilter } from "@/components/barber/region-filter";

interface BarberListClientProps {
  barbers: Barber[];
  neighborhoods: { slug: string; name: string }[];
}

export function BarberListClient({
  barbers,
  neighborhoods,
}: BarberListClientProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return barbers.filter((b) => {
      const matchesRegion =
        region === "all" || b.neighborhoods.includes(region);
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.specialties.some((s) => s.toLowerCase().includes(q));
      return matchesRegion && matchesSearch;
    });
  }, [barbers, search, region]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <BarberSearch value={search} onChange={setSearch} />
        </div>
        <div className="sm:w-64">
          <RegionFilter
            neighborhoods={neighborhoods}
            value={region}
            onChange={setRegion}
          />
        </div>
      </div>

      <BarberList barbers={filtered} />
    </div>
  );
}
