"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "./Animations";
import { BrandLogo, BrandName } from "./BrandLogo";

const CARDS = [
  {
    id: "tea",
    title: "TEA",
    color: "border-marinho bg-marinho/5",
    textColor: "text-marinho",
    description: "Representa a comunidade, a individualidade e os diferentes níveis de suporte. O Transtorno do Espectro Autista e toda a diversidade que ele carrega.",
  },
  {
    id: "amamos",
    title: "amamos",
    color: "border-coral bg-coral/5",
    textColor: "text-coral",
    description: "Representa vínculo, cuidado e presença. O amor que sustenta a rotina de tantas famílias que vivem o TEA de perto.",
  },
  {
    id: "teamamos",
    title: "brand",
    color: "border-teal bg-teal/5",
    textColor: "text-teal",
    description: "Representa a união entre organização e amor. Cuidamos porque amamos. Organizamos porque precisamos. Construímos porque ninguém deveria carregar tudo sozinho.",
  },
];

export function NameSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="nome" className="section-padding bg-areia">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-coral text-sm font-semibold tracking-wider uppercase mb-4">
            O Nome
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            <BrandName className="text-[1.05em]" /> é mais do que um nome.
            <br />
            <span className="text-teal">É uma declaração.</span>
          </h2>
          <p className="text-marinho/70 max-w-2xl mx-auto leading-relaxed">
            O nome nasce da união entre <strong>TEA</strong> e <strong>amamos</strong>.
            É simples, direto e fácil de reconhecer. Não nasce como uma marca fria de tecnologia.
            Nasce como uma forma de dizer que cuidamos, organizamos e construímos juntos.
          </p>
        </SectionReveal>

        {/* Interactive cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <StaggerItem key={card.id}>
              <motion.div
                className={`rounded-2xl p-6 border-2 ${card.color} cursor-pointer card-hover relative overflow-hidden`}
                onClick={() => setExpanded(expanded === card.id ? null : card.id)}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <h3 className={`font-nunito text-2xl font-extrabold ${card.textColor} mb-3`}>
                  {card.title === "brand" ? (
                    <BrandLogo variant="text" className="h-8 w-auto" />
                  ) : (
                    card.title
                  )}
                </h3>
                <motion.div
                  initial={false}
                  animate={{ height: expanded === card.id ? "auto" : 0, opacity: expanded === card.id ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-marinho/70 text-sm leading-relaxed pt-2 border-t border-current/10">
                    {card.description}
                  </p>
                </motion.div>
                {expanded !== card.id && (
                  <p className="text-xs text-marinho/40 mt-3">Clique para expandir</p>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Emotional quote */}
        <SectionReveal delay={0.4} className="mt-16 text-center">
          <blockquote className="font-nunito text-xl sm:text-2xl font-bold text-marinho/80 italic max-w-2xl mx-auto">
            &ldquo;Cuidamos porque amamos. Organizamos porque precisamos. Construímos porque ninguém deveria carregar tudo sozinho.&rdquo;
          </blockquote>
        </SectionReveal>
      </div>
    </section>
  );
}
