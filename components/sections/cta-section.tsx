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
  title = "Reserve seu momento de cuidado",
  description = "Profissionais selecionados, ambiente preparado e atenção em cada detalhe — tudo no conforto da sua casa.",
  message = "Olá! Gostaria de agendar um barbeiro a domicílio em São Paulo.",
}: CtaSectionProps) {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-subtle bg-brand px-8 py-16 text-center text-primary-foreground sm:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,232,213,0.12),transparent)]" />
            <div className="relative space-y-6">
              <h2
                id="cta-heading"
                className="font-heading text-3xl font-medium sm:text-4xl"
              >
                {title}
              </h2>
              <p className="mx-auto max-w-lg text-cream/90">
                {description}
              </p>
              <a
                href={getWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-cream text-brand-deep hover:bg-cream-muted",
                )}
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
