"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

const ASBLoading = () => {
  const [curtainUp, setCurtainUp] = useState(false);
  const [colorReveal, setColorReveal] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showWave, setShowWave] = useState(false);

  useEffect(() => {
    const showLogoTimeout = setTimeout(() => {
      setShowLogo(true);
    }, 300);

    const curtainTimeout = setTimeout(() => {
      setCurtainUp(true);
    }, 500);

    const waveTimeout = setTimeout(() => {
      setShowWave(true);
    }, 500);

    const colorTimeout = setTimeout(() => {
      setColorReveal(true);
    }, 5000);

    return () => {
      clearTimeout(showLogoTimeout);
      clearTimeout(curtainTimeout);
      clearTimeout(waveTimeout);
      clearTimeout(colorTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="suppress-layout bg-primary-400 fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {/* wave 2 */}
        {showWave && (
          <motion.div
            initial={{
              x: "100%",
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: "-80%",
              y: "-50%",
              opacity: 0,
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              delay: 0.1,
            }}
            className="absolute inset-0 z-[100]"
          >
            <Image
              alt="logo-curtain-right"
              src="/wave-2.svg"
              fill
              className="h-full w-full object-fill"
              style={{
                transform: "scale(2) scaleY(-1)",
              }}
            />
          </motion.div>
        )}

        <div className="relative z-0 h-150 w-250 overflow-hidden">
          {/* curtain */}
          <motion.div
            className="absolute inset-0 z-[100]"
            initial={{ y: "200px" }}
            animate={{ y: curtainUp ? "-100%" : "200px" }}
            transition={{ duration: 9, ease: "easeInOut" }}
          >
            <Image
              alt="logo-curtain"
              src="/wave-1.svg"
              fill
              className="h-full w-full object-fill"
              style={{
                transform: "scale(1.5) scaleY(-1) scaleX(-1) translateX(-5%)",
              }}
            />
          </motion.div>

          {/* logo */}
          {showLogo && (
            <Image
              width={250}
              height={150}
              alt="loading-logo"
              src="/asb-logo.svg"
              className={cn(
                "h-full w-full object-fill transition-all duration-1000 ease-in-out",
                colorReveal
                  ? "opacity-100 brightness-100 grayscale-0"
                  : "opacity-80 brightness-[5] grayscale saturate-0"
              )}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ASBLoading;
