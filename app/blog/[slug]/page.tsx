import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/api";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/barber/barber-profile";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="mb-10 space-y-4">
        <Badge variant="outline" className="border-subtle">
          {post.category}
        </Badge>
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </header>

      <div className="prose prose-invert max-w-none space-y-6">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-12 border-t border-subtle pt-8">
        <Link
          href="/blog"
          className="text-sm text-brand transition-colors hover:text-brand-muted"
        >
          ← Voltar ao blog
        </Link>
      </footer>
    </article>
  );
}
