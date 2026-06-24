"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "./Animations";
import { Users, User, Heart, Briefcase, GraduationCap } from "lucide-react";

const AUDIENCES = [
  {
    icon: Users,
    title: "Pais e mães",
    desc: "Para reduzir a sobrecarga de lembrar, organizar e acompanhar tudo sozinho.",
    color: "bg-teal/10 border-teal/20",
    iconColor: "text-teal",
  },
  {
    icon: User,
    title: "Pessoas TEA",
    desc: "Para apoiar previsibilidade, autonomia e segurança, quando o uso fizer sentido para o perfil.",
    color: "bg-coral/10 border-coral/20",
    iconColor: "text-coral",
  },
  {
    icon: Heart,
    title: "Familiares e cuidadores",
    desc: "Para acompanhar informações importantes com mais clareza e menos sobrecarga.",
    color: "bg-mostarda/10 border-mostarda/20",
    iconColor: "text-mostarda",
  },
  {
    icon: Briefcase,
    title: "Profissionais",
    desc: "Para receber informações organizadas, com consentimento da família.",
    color: "bg-azul/10 border-azul/20",
    iconColor: "text-azul",
  },
  {
    icon: GraduationCap,
    title: "Escolas e mediadores",
    desc: "Para apoiar rotinas mais previsíveis e alinhadas no ambiente escolar.",
    color: "bg-teal/10 border-teal/20",
    iconColor: "text-teal",
  },
];

export function AudienceSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-azul text-sm font-semibold tracking-wider uppercase mb-4">
            Para Quem
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-marinho mb-6">
            Uma ferramenta pensada para quem
            <br />
            <span className="text-azul">vive o TEA de diferentes formas.</span>
          </h2>
        </SectionReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((aud) => {
            const Icon = aud.icon;
            return (
              <StaggerItem key={aud.title}>
                <div className={`rounded-2xl border-2 ${aud.color} p-6 card-hover h-full`}>
                  <Icon size={32} className={`${aud.iconColor} mb-4`} />
                  <h3 className="font-nunito font-bold text-xl text-marinho mb-2">{aud.title}</h3>
                  <p className="text-marinho/65 text-sm leading-relaxed">{aud.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
