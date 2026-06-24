"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Heart } from "lucide-react";
import { PuzzlePiece } from "./PuzzleHeart";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-areia via-areia to-areia-dark/30" />

      {/* Decorative floating puzzle pieces */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] opacity-10">
        <PuzzlePiece color="teal" size={60} className="animate-float-slow" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-32 right-[15%] opacity-8">
        <PuzzlePiece color="coral" size={45} className="animate-float" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-40 left-[20%] opacity-8">
        <PuzzlePiece color="mostarda" size={50} className="animate-float-slow" />
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute bottom-60 right-[10%] opacity-6">
        <PuzzlePiece color="azul" size={55} className="animate-float" />
      </motion.div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-coral/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-mostarda/3 blur-3xl" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        {/* Logo with breathing animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex justify-center mb-8"
        >
          <div className="animate-breathe">
            <Image
              src="/images/logo_icone_TEAmamos.png"
              alt="TEAmamos - Coração de quebra-cabeça"
              width={120}
              height={120}
              priority
              className="drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.4 }}
          className="font-nunito text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-marinho leading-tight mb-6"
        >
          <span className="text-marinho">TEA</span>
          <span className="text-coral">mamos</span>
          <span className="text-marinho">: </span>
          <br className="hidden sm:block" />
          <span className="text-marinho/90 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            um sistema em construção para organizar o cuidado de quem vive o TEA de perto.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.7 }}
          className="font-inter text-base sm:text-lg text-marinho/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Idealizado por <strong className="text-marinho">Vanderson Oliveira</strong>, pai de uma filha
          autista, o TEAmamos nasce para ajudar famílias, pessoas TEA, cuidadores e profissionais a
          transformarem rotina, informações e acompanhamento em mais previsibilidade, clareza e cuidado.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={() => handleScroll("#colabore")} className="btn-primary text-base py-3 px-6">
            <Heart size={18} />
            Quero colaborar com o projeto
          </button>
          <button onClick={() => handleScroll("#origem")} className="btn-secondary text-base py-3 px-6">
            Entender a ideia
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-16 flex flex-col items-center animate-scroll-cue cursor-pointer"
          onClick={() => handleScroll("#origem")}
        >
          <PuzzlePiece color="teal" size={20} />
          <ChevronDown size={20} className="text-teal mt-1" />
        </motion.div>
      </motion.div>
    </section>
  );
}
