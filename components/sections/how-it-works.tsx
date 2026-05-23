import { FadeIn } from "@/components/motion/fade-in";

const steps = [
  {
    step: "01",
    title: "Escolha seu barbeiro",
    description:
      "Navegue pelos perfis verificados, veja especialidades, avaliações e preços.",
  },
  {
    step: "02",
    title: "Agende pelo WhatsApp",
    description:
      "Envie uma mensagem com data, horário e endereço. Resposta em minutos.",
  },
  {
    step: "03",
    title: "Receba em casa",
    description:
      "O profissional chega com equipamentos completos. Relaxe e aproveite.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="border-y border-gold-subtle bg-surface py-20 lg:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <h2
            id="how-it-works-heading"
            className="font-heading text-3xl font-semibold sm:text-4xl"
          >
            Como funciona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Três passos simples para o corte masculino perfeito em domicílio.
          </p>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.1}>
              <div className="relative text-center md:text-left">
                <span className="font-heading text-5xl font-bold text-gold/20">
                  {item.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
