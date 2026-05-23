import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedBarbers } from "@/lib/api";
import { BarberCard } from "@/components/barber/barber-card";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function FeaturedBarbers() {
  const barbers = await getFeaturedBarbers();

  return (
    <section className="py-20 lg:py-28" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="featured-heading"
              className="font-heading text-3xl font-semibold sm:text-4xl"
            >
              Barbeiros em destaque
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Profissionais selecionados com as melhores avaliações em São
              Paulo.
            </p>
          </div>
          <Link
            href="/barbeiros"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "gap-2 text-gold hover:text-gold",
            )}
          >
            Ver todos
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </Link>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((barber, i) => (
            <FadeIn key={barber.slug} delay={i * 0.08}>
              <BarberCard barber={barber} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
