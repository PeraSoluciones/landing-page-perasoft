"use client";

import { motion } from "framer-motion";

export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="animate-mesh-drift absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-emerald-500/5 blur-[120px]" />
      <div
        className="animate-mesh-drift absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/8 blur-[100px]"
        style={{ animationDelay: "-7s" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}