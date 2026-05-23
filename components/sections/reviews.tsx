import { Star } from "lucide-react";
import { getReviews } from "@/lib/api";
import { FadeIn } from "@/components/motion/fade-in";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-gold text-gold" : "text-muted"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export async function Reviews() {
  const reviews = await getReviews();

  return (
    <section
      className="border-y border-gold-subtle bg-surface py-20 lg:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <h2
            id="reviews-heading"
            className="font-heading text-3xl font-semibold sm:text-4xl"
          >
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-muted-foreground">
            Avaliações reais de quem já experimentou barbeiro a domicílio
            premium.
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.06}>
              <blockquote className="glass-card h-full rounded-2xl p-6">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <footer className="mt-4 flex items-center justify-between">
                  <cite className="text-sm font-medium not-italic">
                    {review.author}
                  </cite>
                  {review.neighborhood && (
                    <span className="text-xs text-muted-foreground capitalize">
                      {review.neighborhood.replace("-", " ")}
                    </span>
                  )}
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
