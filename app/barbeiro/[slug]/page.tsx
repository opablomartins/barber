import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { seoKeywords } from "@/lib/seo/keywords";
import {
  getBarberBySlug,
  getBarberSlugs,
  getReviewsByBarber,
} from "@/lib/api";
import {
  barberPersonSchema,
  barberAggregateRatingSchema,
  breadcrumbSchema,
} from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { BarberProfile, Breadcrumbs } from "@/components/barber/barber-profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBarberSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);
  if (!barber) return {};

  return createPageMetadata({
    title: `${barber.name} — Barbeiro a Domicílio`,
    description: `${barber.bio.slice(0, 155)}...`,
    path: `/barbeiro/${slug}`,
    keywords: seoKeywords.barber(barber.name),
  });
}

export default async function BarberPage({ params }: PageProps) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);
  if (!barber) notFound();

  const reviews = await getReviewsByBarber(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <JsonLd
        data={[
          barberPersonSchema(barber),
          barberAggregateRatingSchema(barber),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Barbeiros", path: "/barbeiros" },
            { name: barber.name, path: `/barbeiro/${slug}` },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Barbeiros", href: "/barbeiros" },
          { label: barber.name },
        ]}
      />

      <BarberProfile barber={barber} reviews={reviews} />
    </div>
  );
}
