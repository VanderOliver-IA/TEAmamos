"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, LogOut } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

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
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadAdminSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const payload = (await response.json()) as { authenticated?: boolean };
        if (active) {
          setAdminAuthenticated(Boolean(payload.authenticated));
        }
      } catch {
        if (active) {
          setAdminAuthenticated(false);
        }
      }
    }

    void loadAdminSession();

    return () => {
      active = false;
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAdminLogout = async () => {
    setAdminLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setAdminAuthenticated(false);
      setMenuOpen(false);
      window.location.href = "/";
    } finally {
      setAdminLoading(false);
    }
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
          <a href="#inicio" className="flex items-center gap-3 shrink-0" aria-label="TEAmamos">
            <BrandLogo
              variant="icon"
              className={`${scrolled ? "h-8 w-8" : "h-10 w-10"} transition-all duration-300`}
            />
            <BrandLogo
              variant="text"
              className={`${scrolled ? "h-6" : "h-7"} w-auto transition-all duration-300`}
            />
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
            {adminAuthenticated ? (
              <button
                onClick={() => void handleAdminLogout()}
                disabled={adminLoading}
                className="inline-flex items-center gap-2 text-sm font-semibold text-marinho/55 transition-colors hover:text-marinho disabled:opacity-60"
              >
                <LogOut size={16} />
                {adminLoading ? "Saindo..." : "Logout"}
              </button>
            ) : null}
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
            {adminAuthenticated ? (
              <button
                onClick={() => void handleAdminLogout()}
                disabled={adminLoading}
                className="flex items-center gap-2 py-2 text-left text-base font-medium text-marinho/80 hover:text-marinho disabled:opacity-60"
              >
                <LogOut size={16} />
                {adminLoading ? "Saindo..." : "Sair do admin"}
              </button>
            ) : null}
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
