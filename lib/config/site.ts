export const siteConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "BarberHome",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5511999999999",
  defaultCity: process.env.NEXT_PUBLIC_DEFAULT_CITY ?? "sao-paulo",
  locale: "pt_BR",
  description:
    "Barbeiro a domicílio premium em São Paulo. Corte masculino em casa com profissionais verificados, higiene impecável e agendamento rápido via WhatsApp.",
  keywords: [
    "barbeiro a domicilio",
    "barbeiro delivery",
    "barbeiro em casa",
    "barbeiro a domicilio sao paulo",
    "corte masculino em domicilio",
  ],
} as const;

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getAbsoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
