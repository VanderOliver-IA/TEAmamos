"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Origem", href: "#origem" },
  { label: "Nome", href: "#nome" },
  { label: "Sistema", href: "#sistema" },
  { label: "Colabore", href: "#colabore" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="progress-bar"
        style={{ width: progressWidth }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo_icone_TEAmamos.png"
              alt="TEAmamos"
              width={scrolled ? 32 : 40}
              height={scrolled ? 32 : 40}
              className="transition-all duration-300"
            />
            <div className="flex items-baseline">
              <span className="font-nunito text-lg font-extrabold text-marinho">TEA</span>
              <span className="font-nunito text-lg font-extrabold text-coral">mamos</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-marinho/70 hover:text-marinho transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal rounded-full transition-all group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#colabore")}
              className="btn-primary text-sm py-2 px-4"
            >
              <Heart size={16} />
              Quero colaborar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-marinho rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-marinho rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-marinho rounded-full"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden glass"
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-base font-medium text-marinho/80 hover:text-marinho py-2 border-b border-marinho/5"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#colabore")}
              className="btn-primary text-sm py-3 justify-center mt-2"
            >
              <Heart size={16} />
              Quero colaborar
            </button>
          </div>
        </motion.div>
      </header>
    </>
  );
}
