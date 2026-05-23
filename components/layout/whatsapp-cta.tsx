"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppCtaProps {
  message?: string;
  variant?: "floating" | "inline";
  className?: string;
  label?: string;
}

export function WhatsAppCta({
  message = "Olá! Gostaria de agendar um barbeiro a domicílio.",
  variant = "floating",
  className,
  label = "Agendar via WhatsApp",
}: WhatsAppCtaProps) {
  const href = getWhatsAppUrl(message);

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "gap-2", className)}
      >
        <MessageCircle className="size-5" strokeWidth={1.5} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:scale-105 active:scale-95",
        className,
      )}
      aria-label="Agendar via WhatsApp"
    >
      <MessageCircle className="size-7" strokeWidth={1.5} />
    </a>
  );
}
