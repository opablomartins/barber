"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/types";
import { FadeIn } from "@/components/motion/fade-in";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
}

export function FAQSection({
  faqs,
  title = "Perguntas frequentes",
  description = "Tudo o que você precisa saber sobre barbeiro a domicílio.",
}: FAQSectionProps) {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-semibold sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-subtle bg-surface px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
