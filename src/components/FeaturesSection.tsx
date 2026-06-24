"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "./Animations";
import { ChevronDown } from "lucide-react";

const CATEGORIES = [
  {
    title: "Perfil da pessoa TEA",
    color: "teal",
    items: ["Cadastro individual", "Nível de suporte", "Em avaliação", "Preferências", "Sensibilidades", "Hiperfocos", "Dificuldades", "Habilidades", "Campo livre"],
  },
  {
    title: "Rotina e previsibilidade",
    color: "coral",
    items: ["Rotina visual", "Agenda", "Lembretes", "Compromissos escolares", "Atividades", "Transições", "Alertas"],
  },
  {
    title: "Saúde e terapias",
    color: "mostarda",
    items: ["Medicamentos", "Consultas", "Terapias", "Profissionais", "Observações", "Histórico"],
  },
  {
    title: "Crises, gatilhos e regulação",
    color: "azul",
    items: ["Registro de crises", "Intensidade", "Possíveis gatilhos", "Estratégias que ajudaram", "Tempo de recuperação", "Observações"],
  },
  {
    title: "Evolução e relatórios",
    color: "teal",
    items: ["Diário de evolução", "Padrões", "Gráficos simples", "Relatórios para profissionais", "Exportação", "Compartilhamento com consentimento"],
  },
  {
    title: "Família e rede de apoio",
    color: "coral",
    items: ["Múltiplos cuidadores", "Permissões", "Compartilhamento seguro", "Histórico de alterações", "Comunicação com escola ou profissional"],
  },
];

const BORDER_COLORS: Record<string, string> = {
  teal: "border-teal",
  coral: "border-coral",
  mostarda: "border-mostarda",
  azul: "border-azul",
};

const TEXT_COLORS: Record<string, string> = {
  teal: "text-teal",
  coral: "text-coral",
  mostarda: "text-mostarda",
  azul: "text-azul",
};

const BG_COLORS: Record<string, string> = {
  teal: "bg-teal/5",
  coral: "bg-coral/5",
  mostarda: "bg-mostarda/5",
  azul: "bg-azul/5",
};

export function FeaturesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section-padding bg-areia">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-mostarda text-sm font-semibold tracking-wider uppercase mb-4">
            Em Validação
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Funcionalidades que queremos
            <br />
            <span className="text-mostarda">validar com você.</span>
          </h2>
        </SectionReveal>

        <div className="space-y-3">
          {CATEGORIES.map((cat, idx) => {
            const isOpen = openIdx === idx;
            return (
              <SectionReveal key={cat.title} delay={idx * 0.05}>
                <div className={`bg-white rounded-xl border-2 ${isOpen ? BORDER_COLORS[cat.color] : "border-transparent"} overflow-hidden transition-colors`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-areia/50 transition-colors"
                  >
                    <h3 className={`font-nunito font-bold text-lg ${isOpen ? TEXT_COLORS[cat.color] : "text-marinho"}`}>
                      {cat.title}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className={isOpen ? TEXT_COLORS[cat.color] : "text-marinho/40"} />
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
                        <div className={`px-5 pb-5 ${BG_COLORS[cat.color]} mx-3 mb-3 rounded-lg`}>
                          <div className="flex flex-wrap gap-2 pt-4">
                            {cat.items.map((item) => (
                              <span
                                key={item}
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white border ${BORDER_COLORS[cat.color]}/30 ${TEXT_COLORS[cat.color]}`}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
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
