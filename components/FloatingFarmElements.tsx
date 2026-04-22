"use client";

import { motion } from "motion/react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Floating farm-themed images for desktop hero background           */
/*  Hidden on mobile to preserve the native-app feel                  */
/* ------------------------------------------------------------------ */

interface FloaterConfig {
  src: string;
  alt: string;
  /** CSS positioning */
  className: string;
  /** Width & height of the image (px) */
  size: number;
  /** y-axis float distance (px) */
  floatY?: number;
  /** x-axis float distance (px) */
  floatX?: number;
  /** rotation float range (deg) */
  rotate?: number;
  /** animation duration (s) */
  duration?: number;
  /** delay before starting (s) */
  delay?: number;
  /** opacity 0-1 */
  opacity?: number;
}

const FLOATERS: FloaterConfig[] = [
  {
    src: "/farm/wheat-rice.png",
    alt: "Wheat & rice crops",
    className: "top-[8%] left-[3%]",
    size: 140,
    floatY: 18,
    floatX: 6,
    rotate: 4,
    duration: 7,
    delay: 0,
    opacity: 0.55,
  },
  {
    src: "/farm/farmer-field.png",
    alt: "Indian farmer in field",
    className: "top-[14%] right-[2%]",
    size: 170,
    floatY: 14,
    floatX: -8,
    rotate: -3,
    duration: 8,
    delay: 0.5,
    opacity: 0.5,
  },
  {
    src: "/farm/vegetables.png",
    alt: "Fresh Indian vegetables",
    className: "bottom-[28%] left-[1%]",
    size: 130,
    floatY: 20,
    floatX: 10,
    rotate: 5,
    duration: 9,
    delay: 1,
    opacity: 0.45,
  },
  {
    src: "/farm/village-scene.png",
    alt: "Indian village farm scene",
    className: "bottom-[10%] right-[3%]",
    size: 160,
    floatY: 12,
    floatX: -6,
    rotate: -2,
    duration: 10,
    delay: 0.8,
    opacity: 0.45,
  },
  {
    src: "/farm/grain-sacks.png",
    alt: "Grain sacks",
    className: "top-[50%] left-[5%]",
    size: 110,
    floatY: 16,
    floatX: 8,
    rotate: 3,
    duration: 8.5,
    delay: 1.2,
    opacity: 0.4,
  },
  {
    src: "/farm/seedling.png",
    alt: "Sprouting seedling",
    className: "top-[42%] right-[6%]",
    size: 100,
    floatY: 22,
    floatX: -5,
    rotate: 6,
    duration: 7.5,
    delay: 0.3,
    opacity: 0.45,
  },
];

export default function FloatingFarmElements() {
  return (
    /* Container spans the full hero area — pointer-events-none so it never
       blocks clicks. Hidden on mobile (< md) to keep the native-app feel. */
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
    >
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute ${f.className}`}
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{
            opacity: f.opacity ?? 0.5,
            scale: 1,
            y: [0, -(f.floatY ?? 16), 0],
            x: [0, f.floatX ?? 0, 0],
            rotate: [0, f.rotate ?? 0, 0],
          }}
          transition={{
            opacity: { duration: 1.2, delay: (f.delay ?? 0) + 0.2 },
            scale: { duration: 1, delay: f.delay ?? 0 },
            y: {
              duration: f.duration ?? 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: f.delay ?? 0,
            },
            x: {
              duration: (f.duration ?? 8) * 1.3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: f.delay ?? 0,
            },
            rotate: {
              duration: (f.duration ?? 8) * 1.1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: f.delay ?? 0,
            },
          }}
        >
          <Image
            src={f.src}
            alt={f.alt}
            width={f.size}
            height={f.size}
            className="select-none drop-shadow-lg"
            draggable={false}
            priority={i < 2}
          />
        </motion.div>
      ))}

      {/* Soft radial gradient overlays to blend floaters into the bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
    </div>
  );
}
