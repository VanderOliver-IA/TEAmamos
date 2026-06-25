"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "./Animations";

const STEPS = [
  {
    num: "01",
    title: "Apresentação pública da ideia",
    desc: "Lançamento da landing page e abertura do projeto para a comunidade.",
    color: "teal",
    status: "active",
  },
  {
    num: "02",
    title: "Escuta da comunidade",
    desc: "Coleta de relatos, dores e sugestões de famílias e profissionais.",
    color: "coral",
    status: "active",
  },
  {
    num: "03",
    title: "Pesquisa de soluções existentes",
    desc: "Benchmark de apps, sistemas e ferramentas já disponíveis no mercado.",
    color: "mostarda",
    status: "upcoming",
  },
  {
    num: "04",
    title: "Organização das necessidades reais",
    desc: "Agrupamento e priorização das principais dores identificadas.",
    color: "azul",
    status: "upcoming",
  },
  {
    num: "05",
    title: "Definição do MVP",
    desc: "Escolha das funcionalidades essenciais para a primeira versão.",
    color: "teal",
    status: "upcoming",
  },
  {
    num: "06",
    title: "Protótipo navegável",
    desc: "Criação das primeiras telas para validação visual e de usabilidade.",
    color: "coral",
    status: "upcoming",
  },
  {
    num: "07",
    title: "Testes com usuários reais",
    desc: "Validação com famílias e profissionais que vivem o TEA.",
    color: "mostarda",
    status: "upcoming",
  },
  {
    num: "08",
    title: "Primeira versão do sistema",
    desc: "Desenvolvimento inicial da plataforma funcional.",
    color: "azul",
    status: "upcoming",
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  teal: { bg: "bg-teal/10", border: "border-teal/30", text: "text-teal", dot: "bg-teal" },
  coral: { bg: "bg-coral/10", border: "border-coral/30", text: "text-coral", dot: "bg-coral" },
  mostarda: { bg: "bg-mostarda/10", border: "border-mostarda/30", text: "text-mostarda", dot: "bg-mostarda" },
  azul: { bg: "bg-azul/10", border: "border-azul/30", text: "text-azul", dot: "bg-azul" },
};

export function RoadmapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-areia">
      <div className="max-w-3xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-azul text-sm font-semibold tracking-wider uppercase mb-4">
            Roadmap
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Como a ideia vai
            <br />
            <span className="text-azul">sair do papel.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mb-10">
          <div className="rounded-xl border border-teal/25 bg-white/85 px-5 py-4 text-center shadow-sm">
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-marinho">
              Agora estamos nas etapas 01 e 02: apresentação pública e escuta da comunidade.
            </p>
          </div>
        </SectionReveal>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-areia-dark origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-6">
            {STEPS.map((step, idx) => {
              const colors = COLOR_MAP[step.color];
              const isActive = step.status === "active";
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-3.5 top-[1.125rem] z-10 h-6 w-6 rounded-full ${colors.dot} border-4 border-areia ${
                      isActive ? "animate-pulse-glow shadow-lg ring-4 ring-white" : ""
                    }`}
                  />

                  <div
                    className={`border ${colors.border} rounded-xl p-5 transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-lg shadow-teal/10 ring-2 ring-teal/15"
                        : `${colors.bg} opacity-60`
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-nunito font-extrabold text-sm ${colors.text}`}>
                        {step.num}
                      </span>
                      <h3 className="font-nunito font-bold text-marinho">{step.title}</h3>
                      {isActive && (
                        <span className="text-[10px] font-semibold bg-teal text-white rounded-full px-2.5 py-1 uppercase tracking-wide">
                          Em andamento
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-marinho/60">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
