"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import styles from "./TextReveal.module.css";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
}

/**
 * TextReveal — Character/word-level staggered text reveal on scroll.
 * Splits text into individual elements and animates them sequentially.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  splitBy = "chars",
  stagger = 0.02,
  duration = 0.6,
  start = "top 80%",
  className = "",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-split]");

      gsap.set(targets, {
        opacity: 0,
        y: splitBy === "lines" ? 40 : 20,
        rotateX: splitBy === "chars" ? -90 : 0,
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    });

    return () => ctx.revert();
  }, [text, splitBy, stagger, duration, start]);

  const splitText = () => {
    if (splitBy === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className={styles.word} data-split>
          {word}{" "}
        </span>
      ));
    }
    if (splitBy === "chars") {
      return text.split("").map((char, i) => (
        <span key={i} className={styles.char} data-split>
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    // lines - split by newlines or treat as single line
    return text.split("\n").map((line, i) => (
      <span key={i} className={styles.line} data-split>
        {line}
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${styles.container} ${className}`}
      aria-label={text}
    >
      {splitText()}
    </Tag>
  );
}
