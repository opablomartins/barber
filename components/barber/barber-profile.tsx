import Image from "next/image";
import Link from "next/link";
import { Star, BadgeCheck, MapPin, Clock, Scissors } from "lucide-react";
import type { Barber } from "@/types";
import type { Review } from "@/types";
import { getWhatsAppUrl } from "@/lib/config/site";
import { getNeighborhoods } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BarberProfileProps {
  barber: Barber;
  reviews: Review[];
}

export async function BarberProfile({ barber, reviews }: BarberProfileProps) {
  const neighborhoods = await getNeighborhoods();
  const barberNeighborhoods = neighborhoods.filter((n) =>
    barber.neighborhoods.includes(n.slug),
  );

  const whatsappMessage = `Olá! Gostaria de agendar um corte a domicílio com ${barber.name}.`;

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-gold-subtle">
            <Image
              src={barber.image}
              alt={barber.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Agendar com {barber.name.split(" ")[0]}
          </a>
        </div>
      </div>

      <div className="space-y-8 lg:col-span-2">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
              {barber.name}
            </h1>
            {barber.verified && (
              <Badge className="gap-1 bg-gold/90 text-primary-foreground">
                <BadgeCheck className="size-3.5" strokeWidth={1.5} />
                Verificado
              </Badge>
            )}
          </div>
          <p className="mt-2 text-lg text-muted-foreground">{barber.title}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-gold text-gold" strokeWidth={1.5} />
              <strong>{barber.rating}</strong>
              <span className="text-muted-foreground">
                ({barber.reviewCount} avaliações)
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Scissors className="size-4 text-gold" strokeWidth={1.5} />
              {barber.experience} anos de experiência
            </span>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Sobre</h2>
          <p className="leading-relaxed text-muted-foreground">{barber.bio}</p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Especialidades</h2>
          <div className="flex flex-wrap gap-2">
            {barber.specialties.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="border-gold-subtle"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Regiões atendidas</h2>
          <div className="flex flex-wrap gap-2">
            {barberNeighborhoods.map((n) => (
              <Link key={n.slug} href={`/bairro/${n.slug}`}>
                <Badge
                  variant="outline"
                  className="border-gold-subtle transition-colors hover:border-gold hover:text-gold"
                >
                  <MapPin className="mr-1 size-3" strokeWidth={1.5} />
                  {n.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Serviços e preços</h2>
          <div className="space-y-3">
            {barber.services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between rounded-xl border border-gold-subtle bg-surface p-4"
              >
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="size-3.5" strokeWidth={1.5} />
                    {service.duration} min
                  </p>
                </div>
                <p className="text-lg font-semibold text-gold">
                  R$ {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {reviews.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Avaliações</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <blockquote
                  key={review.id}
                  className="rounded-xl border border-gold-subtle bg-surface p-5"
                >
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-gold text-gold"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <footer className="mt-2 text-sm text-muted-foreground">
                    — {review.author}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <Separator orientation="vertical" className="h-4" />}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
