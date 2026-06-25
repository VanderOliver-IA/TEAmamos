"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "./Animations";
import { BrandName } from "./BrandLogo";

const PROFILES = [
  { label: "TEA", emoji: "🧩" },
  { label: "TDAH", emoji: "⚡" },
  { label: "Dislexia", emoji: "📚" },
  { label: "TOD", emoji: "🧭" },
  { label: "Altas habilidades", emoji: "🚀" },
  { label: "Deficiência intelectual", emoji: "🤝" },
  { label: "Síndrome de Down", emoji: "💛" },
  { label: "Transtornos de aprendizagem", emoji: "📝" },
  { label: "Em avaliação", emoji: "🔍" },
  { label: "Sem diagnóstico fechado", emoji: "📋" },
  { label: "Maior autonomia", emoji: "🌟" },
  { label: "Maior suporte", emoji: "🛟" },
  { label: "Sensibilidade sensorial", emoji: "🎧" },
  { label: "Rigidez de rotina", emoji: "🗓️" },
  { label: "Dificuldade de atenção", emoji: "🎯" },
  { label: "Hiperfoco", emoji: "🔥" },
  { label: "Ansiedade", emoji: "💭" },
  { label: "Comunicação alternativa", emoji: "💬" },
];

const COLORS = ["bg-teal/10 border-teal/30", "bg-coral/10 border-coral/30", "bg-mostarda/10 border-mostarda/30", "bg-azul/10 border-azul/30"];

export function UniqueSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-azul text-sm font-semibold tracking-wider uppercase mb-4">
            Personalização
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Cada pessoa neurodivergente é única.
            <br />
            <span className="text-azul">O sistema precisa respeitar isso.</span>
          </h2>
          <p className="text-marinho/70 max-w-2xl mx-auto leading-relaxed">
            Diagnósticos ajudam a orientar caminhos, mas não definem uma pessoa por completo. Cada
            pessoa neurodivergente tem sua própria forma de se comunicar, aprender, se organizar,
            sentir estímulos, lidar com mudanças, construir autonomia e se regular. Por isso, o
            <BrandName /> não pode ser engessado.
          </p>
          <p className="text-marinho/70 max-w-2xl mx-auto leading-relaxed mt-4">
            O sistema precisa começar entendendo o perfil individual, não apenas o diagnóstico.
          </p>
        </SectionReveal>

        {/* Profile cards */}
        <StaggerContainer className="flex flex-wrap justify-center gap-4 mb-12" staggerDelay={0.08}>
          {PROFILES.map((profile, i) => (
            <StaggerItem key={profile.label}>
              <div className={`rounded-xl border-2 ${COLORS[i % COLORS.length]} px-5 py-4 text-center card-hover min-w-[140px]`}>
                <span className="text-2xl block mb-2">{profile.emoji}</span>
                <p className="font-semibold text-marinho text-sm">{profile.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal delay={0.3} className="text-center">
          <div className="inline-block bg-teal/10 rounded-2xl px-8 py-6 border border-teal/20">
            <p className="font-nunito text-lg sm:text-xl font-bold text-teal">
              A personalização não será um recurso extra.
              <br />
              Será o coração do produto. 💚
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
