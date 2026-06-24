"use client";

import { SectionReveal } from "./Animations";
import { PuzzlePiece } from "./PuzzleHeart";

export function AboutSection() {
  return (
    <section className="section-padding bg-marinho text-white relative overflow-hidden">
      {/* Decorative puzzle pieces */}
      <div className="absolute top-10 right-10 opacity-5">
        <PuzzlePiece color="teal" size={80} className="animate-float-slow" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5">
        <PuzzlePiece color="coral" size={60} className="animate-float" />
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-3">
        <PuzzlePiece color="mostarda" size={50} className="animate-float-slow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionReveal className="text-center mb-12">
          <span className="inline-block text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            O Idealizador
          </span>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Quem está idealizando
            <br />
            <span className="text-teal">o TEAmamos</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">Vanderson Oliveira</strong> é o idealizador do TEAmamos.
              </p>
              <p>
                Pai de uma filha autista, ele vive de perto as necessidades, desafios e descobertas que
                fazem parte da rotina de uma família TEA.
              </p>
              <p>
                Sua visão para o projeto nasce da prática: organizar informações, criar previsibilidade,
                reduzir sobrecarga e transformar tecnologia em apoio real para o cuidado.
              </p>
              <p>
                Com experiência em estratégia digital, criação de sistemas, inteligência artificial e
                desenvolvimento de projetos, Vanderson une vivência familiar e visão tecnológica para
                propor uma ferramenta construída com escuta, responsabilidade e propósito.
              </p>
              <p>
                O TEAmamos nasce dessa união entre vida real e construção prática. Não é um projeto
                criado apenas para parecer bonito. É uma tentativa consciente de transformar uma dor
                real em uma solução útil para mais famílias.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Quote */}
        <SectionReveal delay={0.4} className="mt-10 text-center">
          <blockquote className="relative">
            <div className="text-6xl text-teal/30 absolute -top-4 -left-2">&ldquo;</div>
            <p className="font-nunito text-xl sm:text-2xl font-bold text-white/90 italic max-w-2xl mx-auto px-8">
              Eu não quero criar um aplicativo para TEA baseado em achismo. Quero construir uma
              ferramenta ouvindo quem vive isso todos os dias.
            </p>
            <footer className="mt-4 text-teal font-semibold">— Vanderson Oliveira</footer>
          </blockquote>
        </SectionReveal>
      </div>
    </section>
  );
}
