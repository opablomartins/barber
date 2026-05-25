"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
  /** Conteúdo acima da dobra — visível sem depender só de whileInView */
  immediate?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  immediate = false,
}: FadeInProps) {
  const offset = direction === "up" ? 24 : direction === "down" ? -24 : 0;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={immediate ? false : { opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
        viewport={immediate ? undefined : { once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
