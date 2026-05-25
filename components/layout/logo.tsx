import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  linkToHome?: boolean;
}

export function Logo({
  className,
  imageClassName,
  showTagline = false,
  linkToHome = true,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo.png"
        alt={`${siteConfig.name} — Barbearia a domicílio`}
        width={showTagline ? 56 : 44}
        height={showTagline ? 56 : 44}
        className={cn(
          "h-10 w-auto object-contain sm:h-11",
          imageClassName,
        )}
        priority
      />
      {showTagline && (
        <div className="hidden flex-col sm:flex">
          <span className="font-heading text-lg font-medium leading-tight text-foreground">
            Studio Banks
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Barbearia a domicílio
          </span>
        </div>
      )}
    </div>
  );

  if (!linkToHome) return content;

  return (
    <Link href="/" className="transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
