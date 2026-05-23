import barbersData from "@/data/barbers.json";
import type { Barber } from "@/types";

const barbers = barbersData as Barber[];

export async function getBarbers(): Promise<Barber[]> {
  return barbers;
}

export async function getBarberBySlug(slug: string): Promise<Barber | undefined> {
  return barbers.find((b) => b.slug === slug);
}

export async function getFeaturedBarbers(): Promise<Barber[]> {
  return barbers.filter((b) => b.featured);
}

export async function getBarbersByNeighborhood(
  neighborhoodSlug: string,
): Promise<Barber[]> {
  return barbers.filter((b) => b.neighborhoods.includes(neighborhoodSlug));
}

export async function getBarbersByCity(citySlug: string): Promise<Barber[]> {
  return barbers.filter((b) => b.city === citySlug);
}

export async function getBarberSlugs(): Promise<string[]> {
  return barbers.map((b) => b.slug);
}

export async function searchBarbers(query: string): Promise<Barber[]> {
  const q = query.toLowerCase().trim();
  if (!q) return barbers;
  return barbers.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.specialties.some((s) => s.toLowerCase().includes(q)) ||
      b.neighborhoods.some((n) => n.toLowerCase().includes(q)),
  );
}
