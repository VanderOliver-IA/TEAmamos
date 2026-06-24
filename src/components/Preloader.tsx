"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

export function Preloader() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-areia"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Puzzle pieces assembling */}
          <div className="relative mb-8">
            <motion.div
              initial={{ x: -60, y: -60, opacity: 0, rotate: -20 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="w-40"
            >
              <BrandLogo variant="vertical" priority className="h-auto w-full" />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-56"
          >
            <BrandLogo variant="text" priority className="h-auto w-full" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-4 text-center text-marinho/70 font-inter text-sm max-w-xs"
          >
            Organizar o cuidado sem perder o amor no processo.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
