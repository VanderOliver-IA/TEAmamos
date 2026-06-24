"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "./Animations";
import {
  MessageSquare,
  FileText,
  ClipboardList,
  Clock,
  AlertCircle,
  Zap,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

const SCATTERED_ITEMS = [
  { icon: MessageSquare, label: "Mensagem da escola", category: "Escola" },
  { icon: FileText, label: "Receita médica", category: "Saúde" },
  { icon: ClipboardList, label: "Anotação de terapia", category: "Terapias" },
  { icon: Clock, label: "Horário de remédio", category: "Rotina" },
  { icon: AlertCircle, label: "Crise de ontem", category: "Regulação" },
  { icon: Zap, label: "Gatilho não registrado", category: "Regulação" },
  { icon: TrendingUp, label: "Evolução despercebida", category: "Evolução" },
  { icon: RotateCcw, label: "Mudança na rotina", category: "Rotina" },
];

const CATEGORIES = ["Rotina", "Saúde", "Escola", "Terapias", "Regulação", "Evolução"];
const CAT_COLORS: Record<string, string> = {
  Rotina: "bg-teal/10 border-teal text-teal",
  Saúde: "bg-coral/10 border-coral text-coral",
  Escola: "bg-azul/10 border-azul text-azul",
  Terapias: "bg-mostarda/10 border-mostarda text-mostarda",
  Regulação: "bg-marinho/10 border-marinho text-marinho",
  Evolução: "bg-teal/10 border-teal-dark text-teal-dark",
};

export function ChaosSection() {
  const [isOrganized, setIsOrganized] = useState(false);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <span className="inline-block text-mostarda text-sm font-semibold tracking-wider uppercase mb-4">
            O Problema
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            O problema não é falta de cuidado.
            <br />
            <span className="text-coral">É excesso de informação espalhada.</span>
          </h2>
          <p className="text-marinho/70 max-w-2xl mx-auto leading-relaxed">
            Muitas famílias vivem tentando organizar informações importantes em vários lugares ao mesmo tempo.
            O resultado é sobrecarga. Não por falta de amor. Mas por falta de estrutura.
          </p>
        </SectionReveal>

        {/* Interactive area */}
        <div className="relative min-h-[420px] mb-8">
          <AnimatePresence mode="wait">
            {!isOrganized ? (
              <motion.div
                key="scattered"
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                exit={{ opacity: 0 }}
              >
                {SCATTERED_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20, rotate: (i % 2 === 0 ? 1 : -1) * (3 + i) }}
                      animate={{
                        opacity: 1,
                        y: [0, -5, 3, 0],
                        rotate: (i % 2 === 0 ? 1 : -1) * (2 + i % 4),
                      }}
                      transition={{
                        opacity: { duration: 0.5, delay: i * 0.1 },
                        y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="bg-white border-2 border-areia-dark rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Icon size={24} className="text-marinho/50 mb-2" />
                      <p className="text-sm font-medium text-marinho/70">{item.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="organized"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {CATEGORIES.map((cat, catIdx) => {
                  const items = SCATTERED_ITEMS.filter((it) => it.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: catIdx * 0.15 }}
                      className={`rounded-xl border-2 p-4 ${CAT_COLORS[cat]}`}
                    >
                      <h4 className="font-nunito font-bold text-sm mb-2">{cat}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <span key={item.label} className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/60 rounded-full px-3 py-1.5">
                              <Icon size={14} />
                              {item.label}
                            </span>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle button */}
        <div className="text-center">
          <button
            onClick={() => setIsOrganized(!isOrganized)}
            className={isOrganized ? "btn-secondary" : "btn-primary"}
          >
            {isOrganized ? "Ver o caos novamente" : "Organizar"}
          </button>
          {!isOrganized && (
            <p className="text-xs text-marinho/40 mt-3">Clique para ver como o TEAmamos quer resolver isso</p>
          )}
        </div>
      </div>
    </section>
  );
}
