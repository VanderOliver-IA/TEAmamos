"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "./Animations";

const PROFILES = [
  {
    title: "TEA",
    description: "Rotina, previsibilidade, sensibilidades, terapias, escola, autorregulação e suporte familiar.",
    tone: "teal",
  },
  {
    title: "TDAH",
    description: "Organização, lembretes, foco, tarefas, impulsividade, medicação, escola e rotina.",
    tone: "coral",
  },
  {
    title: "Dislexia e transtornos de aprendizagem",
    description: "Acompanhamento escolar, adaptações, evolução, dificuldades e estratégias de apoio.",
    tone: "mostarda",
  },
  {
    title: "TOD e desafios comportamentais",
    description: "Registro de gatilhos, combinados, crises, rotina, acompanhamento e rede de apoio.",
    tone: "azul",
  },
  {
    title: "Altas habilidades e superdotação",
    description: "Hiperfocos, intensidade emocional, rotina, escola, interesses e acompanhamento.",
    tone: "teal",
  },
  {
    title: "Outros perfis e investigação",
    description: "Espaço para pessoas sem diagnóstico fechado, com suspeitas, avaliações em andamento ou necessidades específicas.",
    tone: "coral",
  },
];

const TONE_STYLES: Record<string, string> = {
  teal: "border-teal/25 bg-teal/8",
  coral: "border-coral/25 bg-coral/8",
  mostarda: "border-mostarda/25 bg-mostarda/10",
  azul: "border-azul/25 bg-azul/8",
};

export function NeurodiversitySection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <span className="inline-block text-coral text-sm font-semibold tracking-wider uppercase mb-4">
            Expansão do Propósito
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Do TEA para a neurodiversidade.
          </h2>
          <p className="max-w-3xl mx-auto text-marinho/75 leading-relaxed">
            O TEAmamos nasceu da vivência com o autismo, mas logo ficou claro que muitas dores não
            pertencem a um único diagnóstico. Famílias que vivem o TDAH, a dislexia, o TOD, altas
            habilidades, deficiência intelectual, síndrome de Down, transtornos de aprendizagem,
            ansiedade e outros perfis neurodivergentes também precisam de organização,
            previsibilidade, acolhimento e ferramentas práticas para o dia a dia.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mb-10">
          <div className="rounded-2xl border border-marinho/10 bg-areia px-6 py-5 text-center shadow-sm">
            <p className="font-nunito text-lg sm:text-xl font-extrabold text-marinho">
              O TEAmamos nasceu do TEA, mas foi criado para acolher a neurodiversidade.
            </p>
            <p className="mt-3 text-sm sm:text-base text-marinho/65">
              TEA → família → rotina → neurodiversidade → cuidado personalizado
            </p>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.06}>
          {PROFILES.map((profile) => (
            <StaggerItem key={profile.title}>
              <div className={`h-full rounded-2xl border p-6 shadow-sm ${TONE_STYLES[profile.tone]}`}>
                <h3 className="font-nunito text-xl font-extrabold text-marinho">{profile.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-marinho/70">{profile.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal delay={0.2} className="mt-10 text-center">
          <p className="max-w-3xl mx-auto text-marinho/75 leading-relaxed">
            Por isso, o projeto cresce sem abandonar sua origem. O TEA continua sendo parte
            essencial da história. Mas o cuidado precisa alcançar mais pessoas.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
