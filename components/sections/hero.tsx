import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Star } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-ambient-glow">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(237,217,200,0.5),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <FadeIn immediate className="space-y-8">
          <Badge
            variant="outline"
            className="border-subtle bg-pastel-blush/60 px-3 py-1 font-normal tracking-wide text-brand-deep"
          >
            Studio Banks · Estd. 2015
          </Badge>

          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Barbearia a domicílio,{" "}
              <span className="text-gradient-accent">com a precisão</span> que
              você exige
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              A mesma sofisticação da Studio Banks no conforto da sua casa.
              Profissionais curados, ritmo tranquilo e agendamento em minutos.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de agendar com a Studio Banks em São Paulo.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-brand text-primary-foreground hover:bg-brand-muted",
              )}
            >
              Reservar horário
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
            <Link
              href="/barbeiros"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-subtle text-brown hover:bg-pastel-cream",
              )}
            >
              Conhecer profissionais
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="size-4 text-brand" strokeWidth={1.5} />
              Curadoria rigorosa
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 fill-brand text-brand" strokeWidth={1.5} />
              4.9 · avaliações verificadas
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} immediate>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle bg-pastel-blush shadow-sm">
            <Image
              src="/images/hero.svg"
              alt="Studio Banks — barbearia a domicílio em São Paulo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-subtle bg-brand px-5 py-4 text-primary-foreground shadow-md sm:bottom-6 sm:left-6">
              <p className="font-heading text-2xl font-medium">+2.000</p>
              <p className="text-sm text-cream/90">atendimentos realizados</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
