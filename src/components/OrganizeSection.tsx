"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "./Animations";
import {
  CalendarDays,
  Pill,
  Stethoscope,
  School,
  AlertTriangle,
  Eye,
  LifeBuoy,
  TrendingUp,
} from "lucide-react";

const CARDS = [
  {
    icon: CalendarDays,
    title: "Rotina diária",
    desc: "Horários, atividades, transições e compromissos.",
    problem: "A rotina se perde entre agendas, lembretes e memória.",
    example: "Maria sabe que João se desregula quando muda de atividade sem aviso. O sistema pode avisar as transições com antecedência.",
    color: "teal",
  },
  {
    icon: Pill,
    title: "Medicamentos",
    desc: "Lembretes, horários, observações e histórico.",
    problem: "Horários esquecidos, doses perdidas, efeitos não registrados.",
    example: "Registro de horário, dosagem e observações em um só lugar, com alertas.",
    color: "coral",
  },
  {
    icon: Stethoscope,
    title: "Consultas e terapias",
    desc: "Agenda, profissionais, registros e evolução.",
    problem: "Informações espalhadas entre escola, terapeuta e família.",
    example: "Todos os profissionais e sessões centralizados, com notas de evolução.",
    color: "mostarda",
  },
  {
    icon: School,
    title: "Escola",
    desc: "Compromissos, avisos, adaptação e acompanhamento.",
    problem: "Comunicação fragmentada entre família e escola.",
    example: "Registro de adaptações, provas, eventos e comunicação facilitada.",
    color: "azul",
  },
  {
    icon: AlertTriangle,
    title: "Crises e gatilhos",
    desc: "Registro de eventos, padrões, intensidade e contexto.",
    problem: "Gatilhos não identificados, padrões invisíveis.",
    example: "Ao registrar crises, o sistema ajuda a identificar padrões recorrentes.",
    color: "coral",
  },
  {
    icon: Eye,
    title: "Sensibilidades",
    desc: "Sons, luzes, texturas, alimentação, ambientes.",
    problem: "Informação que fica na cabeça de quem cuida.",
    example: "Perfil sensorial que pode ser compartilhado com novos profissionais ou escolas.",
    color: "teal",
  },
  {
    icon: LifeBuoy,
    title: "Formas de regulação",
    desc: "Estratégias que ajudam, recursos e preferências.",
    problem: "Cada cuidador tenta coisas diferentes, sem registro do que funciona.",
    example: "Lista de estratégias testadas, o que funciona e em qual contexto.",
    color: "mostarda",
  },
  {
    icon: TrendingUp,
    title: "Evolução",
    desc: "Pequenos avanços, mudanças percebidas e relatórios.",
    problem: "Evoluções passam despercebidas na correria do dia a dia.",
    example: "Registro de marcos e pequenas vitórias, com visão temporal.",
    color: "azul",
  },
];

const COLOR_MAP: Record<string, string> = {
  teal: "border-teal hover:bg-teal/5",
  coral: "border-coral hover:bg-coral/5",
  mostarda: "border-mostarda hover:bg-mostarda/5",
  azul: "border-azul hover:bg-azul/5",
};

const ICON_COLOR: Record<string, string> = {
  teal: "text-teal",
  coral: "text-coral",
  mostarda: "text-mostarda",
  azul: "text-azul",
};

export function OrganizeSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="sistema" className="section-padding bg-areia">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            A Visão
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Uma central para transformar
            <br />
            <span className="text-teal">rotina em previsibilidade.</span>
          </h2>
        </SectionReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card) => {
            const Icon = card.icon;
            const isExpanded = expanded === card.title;

            return (
              <StaggerItem key={card.title}>
                <motion.div
                  className={`bg-white rounded-2xl p-5 border-2 ${COLOR_MAP[card.color]} cursor-pointer transition-colors h-full`}
                  onClick={() => setExpanded(isExpanded ? null : card.title)}
                  whileHover={{ y: -4 }}
                  layout
                >
                  <Icon size={28} className={`${ICON_COLOR[card.color]} mb-3`} />
                  <h3 className="font-nunito font-bold text-marinho text-lg mb-1">{card.title}</h3>
                  <p className="text-sm text-marinho/60">{card.desc}</p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-areia-dark space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-coral uppercase">O problema</p>
                            <p className="text-sm text-marinho/70">{card.problem}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-teal uppercase">Como ajudaria</p>
                            <p className="text-sm text-marinho/70">{card.example}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
