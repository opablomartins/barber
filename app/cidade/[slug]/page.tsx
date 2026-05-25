import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { seoKeywords } from "@/lib/seo/keywords";
import {
  getCityBySlug,
  getCitySlugs,
  getNeighborhoodsByCity,
  getBarbersByCity,
  getFAQs,
} from "@/lib/api";
import {
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { BarberList } from "@/components/barber/barber-list";
import { FAQSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta-section";
import { Breadcrumbs } from "@/components/barber/barber-profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return {};

  return createPageMetadata({
    title: city.seoTitle,
    description: city.seoDescription,
    path: `/cidade/${slug}`,
    keywords: [...city.keywords, ...seoKeywords.city(city.name)],
  });
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const [neighborhoods, barbers, faqs] = await Promise.all([
    getNeighborhoodsByCity(slug),
    getBarbersByCity(slug),
    getFAQs(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({ city }),
          serviceSchema(
            "Corte masculino a domicílio",
            `Serviço de barbeiro a domicílio em ${city.name} com profissionais verificados.`,
          ),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: city.name, path: `/cidade/${slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: city.name },
          ]}
        />

        <div className="mb-12 max-w-3xl">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Barbeiro a domicílio em {city.name}, {city.state}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {city.description}
          </p>
        </div>

        <section className="mb-16" aria-labelledby="neighborhoods-heading">
          <h2 id="neighborhoods-heading" className="mb-6 text-2xl font-semibold">
            Bairros atendidos em {city.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/bairro/${n.slug}`}
                className="rounded-full border border-subtle bg-surface px-5 py-2.5 text-sm transition-colors hover:border-brand hover:text-brand"
              >
                {n.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="barbers-heading">
          <h2 id="barbers-heading" className="mb-8 text-2xl font-semibold">
            Barbeiros disponíveis em {city.name}
          </h2>
          <BarberList barbers={barbers} />
        </section>
      </div>

      <FAQSection
        faqs={faqs}
        title={`FAQ — Barbeiro a domicílio em ${city.name}`}
        description={`Dúvidas frequentes sobre barbeiro delivery em ${city.name}.`}
      />

      <CtaSection
        title={`Agende seu barbeiro em ${city.name}`}
        message={`Olá! Gostaria de agendar um barbeiro a domicílio em ${city.name}.`}
      />
    </>
  );
}
