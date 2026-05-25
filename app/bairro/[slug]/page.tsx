import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import {
  getNeighborhoodBySlug,
  getNeighborhoodSlugs,
  getCityBySlug,
  getNeighborhoodsByCity,
  getBarbersByNeighborhood,
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
  const slugs = await getNeighborhoodSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);
  if (!neighborhood) return {};

  return createPageMetadata({
    title: neighborhood.seoTitle,
    description: neighborhood.seoDescription,
    path: `/bairro/${slug}`,
    keywords: [...neighborhood.keywords],
  });
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const city = await getCityBySlug(neighborhood.citySlug);
  if (!city) notFound();

  const [barbers, otherNeighborhoods, faqs] = await Promise.all([
    getBarbersByNeighborhood(slug),
    getNeighborhoodsByCity(neighborhood.citySlug),
    getFAQs(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({ city, neighborhood }),
          serviceSchema(
            `Barbeiro a domicílio em ${neighborhood.name}`,
            neighborhood.description,
          ),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: city.name, path: `/cidade/${city.slug}` },
            { name: neighborhood.name, path: `/bairro/${slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: city.name, href: `/cidade/${city.slug}` },
            { label: neighborhood.name },
          ]}
        />

        <div className="mb-12 max-w-3xl">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Barbeiro a domicílio em {neighborhood.name}, {city.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {neighborhood.description}
          </p>
        </div>

        <section className="mb-16" aria-labelledby="barbers-heading">
          <h2 id="barbers-heading" className="mb-8 text-2xl font-semibold">
            Barbeiros em {neighborhood.name}
          </h2>
          <BarberList barbers={barbers} />
        </section>

        <section aria-labelledby="nearby-heading">
          <h2 id="nearby-heading" className="mb-6 text-xl font-semibold">
            Outros bairros atendidos
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherNeighborhoods
              .filter((n) => n.slug !== slug)
              .map((n) => (
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
      </div>

      <FAQSection
        faqs={faqs}
        title={`FAQ — Barbeiro em ${neighborhood.name}`}
        description={`Dúvidas sobre barbeiro a domicílio em ${neighborhood.name}, ${city.name}.`}
      />

      <CtaSection
        title={`Barbeiro a domicílio em ${neighborhood.name}`}
        message={`Olá! Gostaria de agendar um barbeiro a domicílio em ${neighborhood.name}, ${city.name}.`}
      />
    </>
  );
}
