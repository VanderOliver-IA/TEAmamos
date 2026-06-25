"use client";

import { SectionReveal } from "./Animations";
import { Heart } from "lucide-react";
import { BrandName } from "./BrandLogo";

export function CollaborateSection() {
  const handleScroll = () => {
    const el = document.querySelector("#colabore");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionReveal className="text-center mb-12">
          <span className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            Construção Coletiva
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            A melhor versão do <BrandName />
            <br />
            <span className="text-teal">não será criada sozinho.</span>
          </h2>
          <p className="text-marinho/70 max-w-2xl mx-auto leading-relaxed mb-8">
            O <BrandName /> precisa nascer da escuta. Pais, mães, pessoas neurodivergentes, pessoas TEA,
            pessoas com TDAH, familiares, cuidadores, terapeutas, professores, profissionais de
            inclusão e pessoas em investigação vivem detalhes que nenhum planejamento isolado consegue prever.
          </p>
        </SectionReveal>

        {/* What we want to understand */}
        <SectionReveal delay={0.2}>
          <div className="bg-areia rounded-2xl p-8 mb-10">
            <h3 className="font-nunito font-bold text-lg text-marinho mb-6">Queremos entender:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Quais dores aparecem todos os dias",
                "Quais desafios aparecem na rotina neurodivergente",
                "Quais necessidades mudam de acordo com cada diagnóstico ou perfil",
                "Quais apps já foram testados",
                "Quais recursos ajudam em TEA, TDAH, dislexia, TOD, altas habilidades e outros contextos",
                "Como evitar que o sistema seja infantilizado ou limitado a um único público",
                "Quais cuidados precisam existir desde o início",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-teal shrink-0" />
                  <span className="text-sm text-marinho/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3} className="text-center">
          <button onClick={handleScroll} className="btn-primary text-lg py-4 px-8">
            <Heart size={20} />
            Quero colaborar com minha experiência
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
