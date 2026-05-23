"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BarberSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BarberSearch({ value, onChange }: BarberSearchProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        strokeWidth={1.5}
      />
      <Input
        type="search"
        placeholder="Buscar por nome ou especialidade..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gold-subtle bg-surface pl-10"
        aria-label="Buscar barbeiros"
      />
    </div>
  );
}
