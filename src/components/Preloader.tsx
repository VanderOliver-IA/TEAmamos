"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setShow(false);
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
          <div className="relative w-32 h-32 mb-8">
            <motion.div
              initial={{ x: -60, y: -60, opacity: 0, rotate: -20 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/logo_icone_TEAmamos.png"
                alt="TEAmamos"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-baseline"
          >
            <span className="font-nunito text-4xl font-extrabold text-marinho">TEA</span>
            <span className="font-nunito text-4xl font-extrabold text-coral">mamos</span>
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
