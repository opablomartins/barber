import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <h1 className="font-heading text-6xl font-semibold text-gold">404</h1>
      <p className="mt-4 text-xl font-semibold">Página não encontrada</p>
      <p className="mt-2 text-muted-foreground">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
