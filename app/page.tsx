import { createPageMetadata } from "@/lib/metadata";
import { getFAQs } from "@/lib/api";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  faqSchema,
} from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeaturedBarbers } from "@/components/sections/featured-barbers";
import { Reviews } from "@/components/sections/reviews";
import { FAQSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata = createPageMetadata({
  title: "Studio Banks — Barbearia a Domicílio em São Paulo",
  description:
    "Studio Banks: barbearia a domicílio em São Paulo com profissionais curados. Corte masculino em casa, atendimento refinado. Agende pelo WhatsApp.",
  path: "/",
  keywords: [
    "barbeiro a domicilio",
    "barbeiro delivery",
    "barbeiro em casa",
    "barbeiro a domicilio sao paulo",
    "corte masculino em domicilio",
  ],
});

export default async function HomePage() {
  const faqs = await getFAQs();

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          localBusinessSchema(),
          faqSchema(faqs),
        ]}
      />
      <Hero />
      <Benefits />
      <HowItWorks />
      <FeaturedBarbers />
      <Reviews />
      <FAQSection faqs={faqs} />
      <CtaSection />
    </>
  );
}
