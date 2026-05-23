import Link from "next/link";
import { Scissors } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { getNeighborhoods } from "@/lib/api";
import { Separator } from "@/components/ui/separator";

export async function Footer() {
  const neighborhoods = await getNeighborhoods();

  return (
    <footer className="border-t border-gold-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Scissors className="size-5 text-gold" strokeWidth={1.5} />
              <span className="font-heading text-xl font-semibold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Barbeiro a domicílio premium em São Paulo. Profissionais
              verificados, atendimento exclusivo e agendamento rápido.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Início" },
                { href: "/barbeiros", label: "Barbeiros" },
                { href: "/cidade/sao-paulo", label: "São Paulo" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Bairros
            </h3>
            <ul className="space-y-2.5">
              {neighborhoods.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/bairro/${n.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Serviços
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Corte masculino a domicílio</li>
              <li>Barba e barboterapia</li>
              <li>Atendimento executivo</li>
              <li>Pacotes premium</li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-gold-subtle" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Barbeiro a domicílio · São Paulo, SP
          </p>
        </div>
      </div>
    </footer>
  );
}
