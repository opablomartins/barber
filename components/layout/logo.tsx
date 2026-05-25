import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

/** Caminho versionado evita cache antigo do navegador / Next Image */
const LOGO_SRC = "/images/studio-banks-logo.png";

type LogoVariant = "nav" | "footer";

interface LogoProps {
  className?: string;
  variant?: LogoVariant;
  linkToHome?: boolean;
}

const variantStyles: Record<
  LogoVariant,
  { width: number; height: number; wrapper: string; image: string }
> = {
  nav: {
    width: 200,
    height: 100,
    wrapper: "h-12 w-12 rounded-xl sm:h-14 sm:w-14",
    image: "h-full w-full object-cover",
  },
  footer: {
    width: 280,
    height: 140,
    wrapper: "h-28 w-28 rounded-2xl sm:h-32 sm:w-32",
    image: "h-full w-full object-cover",
  },
};

export function Logo({
  className,
  variant = "nav",
  linkToHome = true,
}: LogoProps) {
  const styles = variantStyles[variant];

  const content = (
    <div className={cn("flex shrink-0 items-center", className)}>
      <div
        className={cn(
          "overflow-hidden shadow-sm ring-1 ring-brand/10",
          styles.wrapper,
        )}
      >
        <Image
          src={LOGO_SRC}
          alt={`${siteConfig.name} — Barbearia a domicílio`}
          width={styles.width}
          height={styles.height}
          className={styles.image}
          priority={variant === "nav"}
          unoptimized
        />
      </div>
    </div>
  );

  if (!linkToHome) return content;

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 transition-opacity hover:opacity-90"
      aria-label={`${siteConfig.name} — página inicial`}
    >
      {content}
    </Link>
  );
}
