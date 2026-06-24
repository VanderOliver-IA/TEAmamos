"use client";

import { Heart } from "lucide-react";
import { SectionReveal } from "./Animations";
import { APP_VERSION } from "@/lib/version";
import { BrandLogo, BrandName } from "./BrandLogo";

const LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "O projeto", href: "#origem" },
  { label: "Colabore", href: "#colabore" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-marinho text-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <SectionReveal className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <BrandLogo variant="vertical" className="h-24 w-auto" />
          </div>

          {/* Brand */}
          <div className="flex justify-center mb-4">
            <span className="rounded-md bg-white/95 px-3 py-2">
              <BrandLogo variant="text" className="h-10 w-auto" />
            </span>
          </div>

          {/* Tagline */}
          <p className="font-nunito text-lg font-bold text-teal mb-6">
            Organizar o cuidado sem perder o amor no processo.
          </p>

          {/* Description */}
          <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed mb-8">
            O <BrandName className="rounded-sm bg-white/90 px-1" /> é um projeto em construção colaborativa, idealizado por Vanderson Oliveira,
            para criar uma ferramenta mais humana, prática e organizada para pessoas TEA, famílias,
            cuidadores e profissionais.
          </p>

          {/* CTA */}
          <button
            onClick={() => handleScroll("#colabore")}
            className="btn-primary"
          >
            <Heart size={18} />
            Quero colaborar com o projeto
          </button>
        </SectionReveal>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/30 text-xs max-w-lg mx-auto leading-relaxed mb-4">
            O <BrandName className="rounded-sm bg-white/90 px-1" /> não realiza diagnóstico, não prescreve condutas e não substitui acompanhamento profissional.
          </p>
          <p className="text-center text-white/20 text-xs">
            © {new Date().getFullYear()} <BrandName className="rounded-sm bg-white/90 px-1" /> — Todos os direitos reservados.
          </p>
          <p className="text-center text-white/30 text-[11px] font-mono mt-3 tracking-normal">
            {APP_VERSION}
          </p>
        </div>
      </div>
    </footer>
  );
}
