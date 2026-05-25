import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { getNeighborhoods } from "@/lib/api";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";

export async function Footer() {
  const neighborhoods = await getNeighborhoods();

  return (
    <footer className="border-t border-subtle bg-pastel-cream/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo showTagline imageClassName="h-14 sm:h-16" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Barbearia a domicílio em São Paulo. Profissionais curados,
              atendimento refinado e agendamento rápido via WhatsApp.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">
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
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">
              Bairros
            </h3>
            <ul className="space-y-2.5">
              {neighborhoods.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/bairro/${n.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">
              Serviços
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Corte masculino a domicílio</li>
              <li>Barba e barboterapia</li>
              <li>Atendimento executivo</li>
              <li>Pacotes sob medida</li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Estd. 2015 · São Paulo, SP
          </p>
        </div>
      </div>
    </footer>
  );
}
