import blogPostsData from "@/data/blog-posts.json";
import faqData from "@/data/faq.json";
import reviewsData from "@/data/reviews.json";
import type { BlogPost, FAQ, Review } from "@/types";

const blogPosts = blogPostsData as BlogPost[];
const faqs = faqData as FAQ[];
const reviews = reviewsData as Review[];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  return blogPosts.find((p) => p.slug === slug);
}

export async function getBlogSlugs(): Promise<string[]> {
  return blogPosts.map((p) => p.slug);
}

export async function getFAQs(): Promise<FAQ[]> {
  return faqs;
}

export async function getReviews(): Promise<Review[]> {
  return reviews;
}

export async function getReviewsByBarber(barberSlug: string): Promise<Review[]> {
  return reviews.filter((r) => r.barberSlug === barberSlug);
}
