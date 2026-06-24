"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "./Animations";

const PROFILES = [
  { label: "Crianças", emoji: "🧒" },
  { label: "Adolescentes", emoji: "🧑" },
  { label: "Adultos", emoji: "👨" },
  { label: "TEA nível 1", emoji: "🟢" },
  { label: "TEA nível 2", emoji: "🟡" },
  { label: "TEA nível 3", emoji: "🔴" },
  { label: "Em avaliação", emoji: "🔍" },
  { label: "Sem classificação", emoji: "📋" },
  { label: "Maior autonomia", emoji: "🌟" },
  { label: "Maior suporte", emoji: "🤝" },
];

const COLORS = [
  "bg-teal/10 border-teal/30",
  "bg-coral/10 border-coral/30",
  "bg-mostarda/10 border-mostarda/30",
  "bg-azul/10 border-azul/30",
  "bg-teal/10 border-teal/30",
  "bg-coral/10 border-coral/30",
  "bg-mostarda/10 border-mostarda/30",
  "bg-azul/10 border-azul/30",
  "bg-teal/10 border-teal/30",
  "bg-coral/10 border-coral/30",
];

export function UniqueSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-azul text-sm font-semibold tracking-wider uppercase mb-4">
            Personalização
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Cada TEA é único.
            <br />
            <span className="text-azul">O sistema precisa respeitar isso.</span>
          </h2>
          <p className="text-marinho/70 max-w-2xl mx-auto leading-relaxed">
            Não existe uma única forma de viver o autismo. Cada pessoa TEA tem sua própria maneira
            de se comunicar, se regular, lidar com estímulos, reagir a mudanças, aprender e criar vínculos.
            Por isso, o TEAmamos não pode ser engessado.
          </p>
        </SectionReveal>

        {/* Profile cards */}
        <StaggerContainer className="flex flex-wrap justify-center gap-4 mb-12" staggerDelay={0.08}>
          {PROFILES.map((profile, i) => (
            <StaggerItem key={profile.label}>
              <div className={`rounded-xl border-2 ${COLORS[i]} px-5 py-4 text-center card-hover min-w-[140px]`}>
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
