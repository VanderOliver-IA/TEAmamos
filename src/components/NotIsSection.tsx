"use client";

import { SectionReveal } from "./Animations";
import { X, Check } from "lucide-react";

const NOT_IS = [
  { text: "diagnóstico", tip: "O sistema não identifica TEA nem substitui avaliação profissional." },
  { text: "prescrição", tip: "Não sugere nem indica medicamentos ou tratamentos." },
  { text: "substituto de médicos", tip: "Profissionais são insubstituíveis no acompanhamento." },
  { text: "substituto de terapeutas", tip: "O sistema não faz papel terapêutico." },
  { text: "cura", tip: "O TEA não é doença. O sistema é uma ferramenta de apoio." },
  { text: "promessa milagrosa", tip: "Honestidade e responsabilidade guiam o projeto." },
  { text: "controle rígido", tip: "Respeita a individualidade da pessoa TEA." },
  { text: "sistema para rotular", tip: "Personalização para apoiar, não para classificar." },
];

const IS = [
  "apoio de organização",
  "central de rotina",
  "registro de informações",
  "ferramenta de previsibilidade",
  "apoio para famílias",
  "ponte com profissionais",
  "recurso de cuidado",
  "plataforma personalizável",
];

export function NotIsSection() {
  return (
    <section className="section-padding bg-areia">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-coral text-sm font-semibold tracking-wider uppercase mb-4">
            Responsabilidade
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Responsabilidade também
            <br />
            <span className="text-coral">faz parte do cuidado.</span>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Not is */}
          <SectionReveal>
            <div className="bg-coral/5 border-2 border-coral/20 rounded-2xl p-6">
              <h3 className="font-nunito font-bold text-xl text-coral mb-6 flex items-center gap-2">
                <X size={24} className="p-1 bg-coral text-white rounded-full" />
                O TEAmamos não é
              </h3>
              <ul className="space-y-3">
                {NOT_IS.map((item) => (
                  <li key={item.text} className="group relative">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-coral/5 transition-colors cursor-default">
                      <X size={16} className="text-coral mt-0.5 shrink-0" />
                      <div>
                        <span className="text-marinho font-medium">{item.text}</span>
                        <p className="text-xs text-marinho/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.tip}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Is */}
          <SectionReveal delay={0.2}>
            <div className="bg-teal/5 border-2 border-teal/20 rounded-2xl p-6">
              <h3 className="font-nunito font-bold text-xl text-teal mb-6 flex items-center gap-2">
                <Check size={24} className="p-1 bg-teal text-white rounded-full" />
                O TEAmamos pretende ser
              </h3>
              <ul className="space-y-3">
                {IS.map((item) => (
                  <li key={item}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal/5 transition-colors">
                      <Check size={16} className="text-teal shrink-0" />
                      <span className="text-marinho font-medium">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
