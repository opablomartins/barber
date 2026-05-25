import { Clock, Home, ShieldCheck, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

const benefits = [
  {
    icon: Home,
    title: "Conforto total",
    description:
      "Atendimento no seu lar ou escritório. Sem trânsito, sem filas, sem stress.",
  },
  {
    icon: ShieldCheck,
    title: "Profissionais verificados",
    description:
      "Cada barbeiro passa por verificação de identidade, técnica e referências.",
  },
  {
    icon: Sparkles,
    title: "Higiene impecável",
    description:
      "Equipamentos esterilizados e produtos premium a cada atendimento.",
  },
  {
    icon: Clock,
    title: "Horário flexível",
    description:
      "Agende quando quiser — manhã, tarde, noite ou finais de semana.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <h2
            id="benefits-heading"
            className="font-heading text-3xl font-medium sm:text-4xl"
          >
            Uma experiência pensada para o seu ritmo
          </h2>
          <p className="mt-4 text-muted-foreground">
            Menos barbearia convencional, mais cuidado personalizado — com a
            calma e a qualidade que você merece.
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <FadeIn key={benefit.title} delay={i * 0.08}>
              <div className="glass-card group h-full rounded-2xl p-6 transition-colors hover:border-brand/30">
                <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-3">
                  <benefit.icon
                    className="size-6 text-brand"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
