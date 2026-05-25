import { siteConfig, getAbsoluteUrl } from "@/lib/config/site";
import type { Barber, City, FAQ, Neighborhood, Review, BlogPost } from "@/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: getAbsoluteUrl("/images/studio-banks-logo.png"),
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsapp}`,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/barbeiros?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema(options?: {
  city?: City;
  neighborhood?: Neighborhood;
}) {
  const areaServed = options?.neighborhood
    ? {
        "@type": "Place",
        name: `${options.neighborhood.name}, ${options.city?.name ?? "São Paulo"}`,
      }
    : options?.city
      ? {
          "@type": "City",
          name: options.city.name,
        }
      : {
          "@type": "City",
          name: "São Paulo",
        };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: options?.neighborhood
      ? `${siteConfig.name} — ${options.neighborhood.name}`
      : options?.city
        ? `${siteConfig.name} — ${options.city.name}`
        : siteConfig.name,
    description: options?.neighborhood?.description ??
      options?.city?.description ??
      siteConfig.description,
    url: siteConfig.url,
    telephone: `+${siteConfig.whatsapp}`,
    priceRange: "$$",
    areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: options?.city?.name ?? "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "City",
      name: "São Paulo",
    },
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function barberPersonSchema(barber: Barber) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: barber.name,
    jobTitle: barber.title,
    description: barber.bio,
    image: getAbsoluteUrl(barber.image),
    url: getAbsoluteUrl(`/barbeiro/${barber.slug}`),
    knowsAbout: barber.specialties,
  };
}

export function barberAggregateRatingSchema(barber: Barber) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: barber.name,
    image: getAbsoluteUrl(barber.image),
    url: getAbsoluteUrl(`/barbeiro/${barber.slug}`),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: barber.rating,
      reviewCount: barber.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function reviewSchema(reviews: Review[]) {
  return reviews.slice(0, 5).map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.comment,
    datePublished: review.date,
  }));
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/images/studio-banks-logo.png"),
      },
    },
    mainEntityOfPage: getAbsoluteUrl(`/blog/${post.slug}`),
    keywords: post.keywords.join(", "),
  };
}
