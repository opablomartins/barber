"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Logo } from "@/components/layout/logo";
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
    <header className="sticky top-0 z-50 w-full border-b border-subtle bg-background/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <Logo variant="nav" />

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
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

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/barbeiros"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-subtle text-brown hover:bg-pastel-cream",
            )}
          >
            Ver barbeiros
          </Link>
          <a
            href={getWhatsAppUrl(
              "Olá! Gostaria de agendar com a Studio Banks.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-brand text-primary-foreground hover:bg-brand-muted",
            )}
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
          "border-t border-subtle bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-pastel-cream hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de agendar com a Studio Banks.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "w-full bg-brand text-primary-foreground hover:bg-brand-muted",
              )}
            >
              Agendar agora
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
