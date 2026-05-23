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
    <section className="relative overflow-hidden bg-gold-glow">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(201,169,98,0.08),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <FadeIn className="space-y-8">
          <Badge
            variant="outline"
            className="border-gold-subtle px-3 py-1 text-gold"
          >
            <Star className="mr-1.5 size-3.5 fill-gold text-gold" />
            Barbeiro premium a domicílio
          </Badge>

          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Barbeiro a domicílio{" "}
              <span className="text-gradient-gold">sem comprometer</span> o
              padrão
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Corte masculino em casa com profissionais verificados em São
              Paulo. Agende em minutos pelo WhatsApp e receba atendimento de
              barbearia premium no conforto do seu lar.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de agendar um barbeiro a domicílio em São Paulo.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Agendar agora
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
            <Link
              href="/barbeiros"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-gold-subtle",
              )}
            >
              Ver barbeiros
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="size-4 text-gold" strokeWidth={1.5} />
              Profissionais verificados
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 fill-gold text-gold" strokeWidth={1.5} />
              4.9 média de avaliações
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold-subtle bg-surface">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <Image
              src="/images/hero.svg"
              alt="Barbeiro profissional realizando corte masculino a domicílio em São Paulo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-gold-subtle bg-surface-elevated/90 px-5 py-4 backdrop-blur-xl sm:-left-8">
            <p className="text-2xl font-semibold text-gold">+2.000</p>
            <p className="text-sm text-muted-foreground">Atendimentos realizados</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
