import { getWhatsAppUrl } from "@/lib/config/site";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  title?: string;
  description?: string;
  message?: string;
}

export function CtaSection({
  title = "Pronto para o melhor corte em casa?",
  description = "Agende agora pelo WhatsApp e receba um barbeiro verificado no conforto do seu lar.",
  message = "Olá! Gostaria de agendar um barbeiro a domicílio em São Paulo.",
}: CtaSectionProps) {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-gold-subtle bg-surface-elevated px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-gold-glow" />
            <div className="relative space-y-6">
              <h2
                id="cta-heading"
                className="font-heading text-3xl font-semibold sm:text-4xl"
              >
                {title}
              </h2>
              <p className="mx-auto max-w-lg text-muted-foreground">
                {description}
              </p>
              <a
                href={getWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "mt-2")}
              >
                Agendar via WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
