import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = createPageMetadata({
  title: "Blog — Dicas de Barbeiro a Domicílio",
  description:
    "Artigos sobre barbeiro a domicílio, corte masculino em casa, tendências e dicas para escolher o melhor barbeiro delivery em São Paulo.",
  path: "/blog",
  keywords: [
    "blog barbeiro a domicilio",
    "dicas corte masculino",
    "barbeiro em casa",
  ],
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Guias, tendências e dicas sobre barbeiro a domicílio e corte masculino
          premium.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full border-gold-subtle bg-surface transition-colors hover:border-gold/30">
              <CardContent className="space-y-4 p-6">
                <Badge variant="outline" className="border-gold-subtle">
                  {post.category}
                </Badge>
                <h2 className="text-xl font-semibold transition-colors group-hover:text-gold">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
