"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "./Animations";
import { ChevronDown } from "lucide-react";
import { BrandName } from "./BrandLogo";

const FAQS: { q: ReactNode; a: ReactNode }[] = [
  {
    q: <>O <BrandName /> é apenas para TEA?</>,
    a: "Não. O TEAmamos nasceu da vivência com o TEA, mas está sendo estruturado para apoiar diferentes pessoas neurodivergentes, incluindo TEA, TDAH, dislexia, TOD, altas habilidades, deficiência intelectual, síndromes, transtornos de aprendizagem e perfis em investigação.",
  },
  {
    q: "Por que o nome continua TEAmamos?",
    a: "Porque o projeto nasceu de uma história real com o TEA. O nome carrega essa origem, mas a proposta cresceu para acolher a neurodiversidade de forma mais ampla.",
  },
  {
    q: "O sistema vai diagnosticar alguma condição?",
    a: "Não. O TEAmamos não realiza diagnóstico, não classifica pessoas e não substitui avaliação médica, psicológica, terapêutica ou pedagógica.",
  },
  {
    q: "Pessoas com TDAH poderão usar?",
    a: "Sim. Recursos como rotina, lembretes, agenda, tarefas, medicação, escola, foco, organização e relatórios podem ser úteis para pessoas com TDAH e suas famílias.",
  },
  {
    q: "Pessoas sem diagnóstico fechado podem participar?",
    a: "Sim. Muitas famílias estão em fase de investigação ou ainda tentando entender quais apoios são necessários. O sistema deve permitir uso sem exigir diagnóstico fechado.",
  },
  {
    q: "O app será infantil?",
    a: "Não. O TEAmamos deve ser pensado para crianças, adolescentes e adultos, com linguagem, visual e recursos adaptáveis para cada fase da vida.",
  },
  {
    q: <>O <BrandName /> já existe?</>,
    a: "Ainda não. O projeto está em fase de apresentação, pesquisa e colaboração pública. Esta landing page é o primeiro passo para ouvir a comunidade antes de construir o sistema.",
  },
  {
    q: "Quem pode colaborar?",
    a: "Pais, mães, pessoas neurodivergentes, pessoas TEA, pessoas com TDAH, familiares, cuidadores, profissionais de saúde, profissionais de educação e pessoas interessadas em tecnologia assistiva. Toda contribuição é bem-vinda.",
  },
  {
    q: "Como os dados serão usados?",
    a: "As informações serão usadas exclusivamente para pesquisa, validação e desenvolvimento do projeto. Nenhuma informação sensível será publicada sem autorização.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-areia">
      <div className="max-w-3xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-azul text-sm font-semibold tracking-wider uppercase mb-4">
            FAQ
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Antes de colaborar,
            <br />
            <span className="text-azul">talvez você queira saber isso.</span>
          </h2>
        </SectionReveal>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <SectionReveal key={idx} delay={idx * 0.05}>
                <div className="bg-white rounded-xl overflow-hidden border border-areia-dark/50">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between p-5 text-left hover:bg-areia/30 transition-colors gap-4"
                  >
                    <h3 className="font-nunito font-bold text-marinho">{faq.q}</h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 mt-1"
                    >
                      <ChevronDown size={18} className="text-marinho/40" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-marinho/65 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
