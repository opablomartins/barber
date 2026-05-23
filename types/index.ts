export interface BarberService {
  name: string;
  price: number;
  duration: number;
}

export interface Barber {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  verified: boolean;
  neighborhoods: string[];
  city: string;
  services: BarberService[];
  experience: number;
  specialties: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  barberSlug?: string;
  neighborhood?: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  neighborhoods: string[];
}

export interface Neighborhood {
  slug: string;
  name: string;
  citySlug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: string;
  keywords: string[];
  image?: string;
}
