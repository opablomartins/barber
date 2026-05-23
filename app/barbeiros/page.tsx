import { createPageMetadata } from "@/lib/metadata";
import { getBarbers, getNeighborhoods } from "@/lib/api";
import { BarberListClient } from "@/components/barber/barber-list-client";

export const metadata = createPageMetadata({
  title: "Barbeiros a Domicílio em São Paulo",
  description:
    "Lista completa de barbeiros a domicílio verificados em São Paulo. Compare avaliações, especialidades e preços. Agende corte masculino em casa.",
  path: "/barbeiros",
  keywords: [
    "barbeiros a domicilio sao paulo",
    "lista barbeiro delivery",
    "barbeiro em casa sp",
  ],
});

export default async function BarbeirosPage() {
  const [barbers, neighborhoods] = await Promise.all([
    getBarbers(),
    getNeighborhoods(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
          Barbeiros a domicílio
        </h1>
        <p className="mt-4 text-muted-foreground">
          Encontre o barbeiro ideal para corte masculino em domicílio em São
          Paulo. Todos os profissionais são verificados e avaliados por clientes
          reais.
        </p>
      </div>

      <BarberListClient
        barbers={barbers}
        neighborhoods={neighborhoods.map((n) => ({
          slug: n.slug,
          name: n.name,
        }))}
      />
    </div>
  );
}
