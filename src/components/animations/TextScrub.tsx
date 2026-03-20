"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./TextScrub.module.css";

interface TextScrubProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  start?: string;
  end?: string;
  baseColor?: string;
  fillColor?: string;
}

export function TextScrub({
  text,
  as: Component = "span",
  className = "",
  start = "top 80%",
  end = "bottom 20%",
  baseColor = "rgba(18, 18, 18, 0.15)", // faint ink
  fillColor = "var(--color-ink)", // filled ink
}: TextScrubProps) {
  const containerRef = useRef<HTMLUnknownElement>(null);

  // Split text into characters
  const characters = useMemo(() => text.split(""), [text]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(`.${styles.char}`);

    gsap.fromTo(
      chars,
      { color: baseColor },
      {
        color: fillColor,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub: 0.5,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <Component
      ref={containerRef as any}
      className={`${styles.textScrub} ${className}`}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          className={styles.char}
          style={{ color: baseColor }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Component>
  );
}
