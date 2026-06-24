"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "./Animations";
import {
  School,
  Stethoscope,
  Pill,
  AlertTriangle,
  CalendarDays,
  Moon,
  Activity,
  Zap,
} from "lucide-react";

const CARDS = [
  { icon: School, label: "Escola", color: "bg-azul" },
  { icon: Stethoscope, label: "Terapia", color: "bg-teal" },
  { icon: Pill, label: "Medicamento", color: "bg-coral" },
  { icon: AlertTriangle, label: "Crise", color: "bg-mostarda" },
  { icon: CalendarDays, label: "Rotina", color: "bg-azul" },
  { icon: Moon, label: "Sono", color: "bg-marinho" },
  { icon: Activity, label: "Consulta", color: "bg-teal" },
  { icon: Zap, label: "Gatilhos", color: "bg-coral" },
];

export function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [organized, setOrganized] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setOrganized(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section id="origem" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <SectionReveal>
            <span className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-4">
              A Origem
            </span>
            <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
              Este projeto nasceu dentro de casa.
            </h2>
            <div className="space-y-4 text-marinho/75 leading-relaxed">
              <p>
                O TEAmamos nasce da vivência real de <strong className="text-marinho">Vanderson Oliveira</strong>,
                pai de uma filha autista, que vive de perto os desafios, descobertas e necessidades que
                fazem parte da rotina de uma família TEA.
              </p>
              <p>
                Na prática, o cuidado não acontece em uma única tela. Ele está na escola, na terapia,
                no WhatsApp, nos horários de medicação, nas crises, nas consultas, nos relatórios, nas
                anotações e na memória cansada de quem tenta dar conta de tudo.
              </p>
              <p className="text-marinho font-semibold text-lg border-l-4 border-teal pl-4">
                Muitas famílias não precisam de mais uma ferramenta complicada.
                <br />
                Precisam de uma forma melhor de organizar o cuidado.
              </p>
            </div>
          </SectionReveal>

          {/* Right - Animated cards */}
          <SectionReveal delay={0.3}>
            <div className="relative min-h-[400px]">
              {CARDS.map((card, i) => {
                const Icon = card.icon;
                const randomX = ((i % 3) - 1) * 40 + (i % 2 === 0 ? 15 : -15);
                const randomY = ((i % 4) - 2) * 30;
                const randomRot = (i % 2 === 0 ? 1 : -1) * (5 + (i % 3) * 4);
                const gridCol = i % 2;
                const gridRow = Math.floor(i / 2);

                return (
                  <motion.div
                    key={card.label}
                    className={`absolute w-[calc(50%-1rem)] rounded-xl p-4 shadow-md border border-white/50 ${card.color} text-white`}
                    initial={{
                      x: randomX,
                      y: randomY,
                      rotate: randomRot,
                      opacity: 0,
                    }}
                    animate={
                      organized
                        ? {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                            left: `${gridCol * 50 + gridCol * 0.5}%`,
                            top: `${gridRow * 25}%`,
                          }
                        : {
                            x: randomX,
                            y: randomY + 30,
                            rotate: randomRot,
                            opacity: 1,
                            left: `${20 + randomX}%`,
                            top: `${10 + gridRow * 20 + randomY}%`,
                          }
                    }
                    transition={{
                      duration: 0.8,
                      delay: organized ? i * 0.1 : i * 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-semibold text-sm">{card.label}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
