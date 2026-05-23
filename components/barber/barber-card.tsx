import Link from "next/link";
import Image from "next/image";
import { Star, BadgeCheck, MapPin } from "lucide-react";
import type { Barber } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function formatNeighborhood(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface BarberCardProps {
  barber: Barber;
}

export function BarberCard({ barber }: BarberCardProps) {
  const neighborhoodName = barber.neighborhoods[0]
    ? formatNeighborhood(barber.neighborhoods[0])
    : "São Paulo";

  return (
    <Link href={`/barbeiro/${barber.slug}`} className="group block">
      <Card className="overflow-hidden border-gold-subtle bg-surface transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
          <Image
            src={barber.image}
            alt={`${barber.name} — barbeiro a domicílio em ${neighborhoodName}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {barber.verified && (
            <Badge className="absolute right-3 top-3 gap-1 bg-gold/90 text-primary-foreground">
              <BadgeCheck className="size-3" strokeWidth={1.5} />
              Verificado
            </Badge>
          )}
        </div>
        <CardContent className="space-y-3 p-5">
          <div>
            <h3 className="text-lg font-semibold transition-colors group-hover:text-gold">
              {barber.name}
            </h3>
            <p className="text-sm text-muted-foreground">{barber.title}</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-gold text-gold" strokeWidth={1.5} />
              {barber.rating}
            </span>
            <span className="text-muted-foreground">
              ({barber.reviewCount} avaliações)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-gold" strokeWidth={1.5} />
            {neighborhoodName}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {barber.specialties.slice(0, 2).map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="border-gold-subtle text-xs font-normal"
              >
                {s}
              </Badge>
            ))}
          </div>

          <p className="text-sm font-medium text-gold">
            A partir de R$ {barber.services[0]?.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
