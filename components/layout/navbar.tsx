"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Scissors } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/barbeiros", label: "Barbeiros" },
  { href: "/cidade/sao-paulo", label: "São Paulo" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-subtle bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Scissors className="size-5 text-gold" strokeWidth={1.5} />
          <span className="font-heading text-xl font-semibold tracking-wide text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/barbeiros"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-gold-subtle",
            )}
          >
            Ver barbeiros
          </Link>
          <a
            href={getWhatsAppUrl(
              "Olá! Gostaria de agendar um barbeiro a domicílio.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Agendar agora
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? (
            <X className="size-5" strokeWidth={1.5} />
          ) : (
            <Menu className="size-5" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-gold-subtle bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de agendar um barbeiro a domicílio.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "w-full")}
            >
              Agendar agora
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
