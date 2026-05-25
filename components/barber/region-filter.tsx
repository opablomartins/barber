"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface RegionFilterProps {
  neighborhoods: { slug: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function RegionFilter({
  neighborhoods,
  value,
  onChange,
}: RegionFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v ?? "all")}
    >
      <SelectTrigger
        className="border-subtle bg-surface"
        aria-label="Filtrar por região"
      >
        <MapPin className="size-4 text-brand" strokeWidth={1.5} />
        <SelectValue placeholder="Todas as regiões" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas as regiões</SelectItem>
        {neighborhoods.map((n) => (
          <SelectItem key={n.slug} value={n.slug}>
            {n.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
