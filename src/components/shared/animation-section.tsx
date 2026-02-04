"use client";

import { Variants, motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export function AnimatedFadeInWhenVisible({ children, className, delay = 0, style }: AnimatedProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, delay }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedFlexItemsProps {
  childrenLeft: React.ReactNode;
  childrenRight: React.ReactNode;
  className?: string;
  classNameLeft?: string;
  classNameRight?: string;
  delay?: number;
}

export function AnimatedFlexItems({
  childrenLeft,
  childrenRight,
  classNameLeft,
  classNameRight,
  delay = 0,
  className,
}: AnimatedFlexItemsProps) {
  return (
    <div className={cn("flex flex-row justify-between", className)}>
      <motion.div
        className={classNameLeft}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay }}
      >
        {childrenLeft}
      </motion.div>

      <motion.div
        className={classNameRight}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay }}
      >
        {childrenRight}
      </motion.div>
    </div>
  );
}

export function AnimatedLeftItemSlide({ delay = 0, children, className }: AnimatedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedRightItemSlide({ delay = 0, children, className }: AnimatedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export const AnimatedFadeInAndOutOnScroll = ({ children, className }: AnimatedProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedBlinkProps {
  duration?: number;
}

export const AnimatedBlink = ({ children, className, duration = 10 }: AnimatedProps & AnimatedBlinkProps) => {
  return (
    <motion.span
      className={cn("inline-block", className)}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};
