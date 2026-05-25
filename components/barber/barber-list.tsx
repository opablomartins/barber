import { BarberCard } from "@/components/barber/barber-card";
import type { Barber } from "@/types";

interface BarberListProps {
  barbers: Barber[];
}

export function BarberList({ barbers }: BarberListProps) {
  if (barbers.length === 0) {
    return (
      <div className="rounded-2xl border border-subtle bg-surface py-16 text-center">
        <p className="text-muted-foreground">
          Nenhum barbeiro encontrado para os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {barbers.map((barber) => (
        <BarberCard key={barber.slug} barber={barber} />
      ))}
    </div>
  );
}
