import citiesData from "@/data/cities.json";
import neighborhoodsData from "@/data/neighborhoods.json";
import type { City, Neighborhood } from "@/types";

const cities = citiesData as City[];
const neighborhoods = neighborhoodsData as Neighborhood[];

export async function getCities(): Promise<City[]> {
  return cities;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  return cities.find((c) => c.slug === slug);
}

export async function getCitySlugs(): Promise<string[]> {
  return cities.map((c) => c.slug);
}

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  return neighborhoods;
}

export async function getNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | undefined> {
  return neighborhoods.find((n) => n.slug === slug);
}

export async function getNeighborhoodSlugs(): Promise<string[]> {
  return neighborhoods.map((n) => n.slug);
}

export async function getNeighborhoodsByCity(
  citySlug: string,
): Promise<Neighborhood[]> {
  return neighborhoods.filter((n) => n.citySlug === citySlug);
}

export async function getNeighborhoodName(slug: string): Promise<string> {
  const n = await getNeighborhoodBySlug(slug);
  return n?.name ?? slug;
}
