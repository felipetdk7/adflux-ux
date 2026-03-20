"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

/**
 * ParallaxSection — GSAP ScrollTrigger-driven parallax backgrounds.
 * Wraps content with a background layer that moves at a different scroll speed.
 */
export function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
  backgroundImage,
  overlay = false,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        y: () => -speed * section.offsetHeight,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-20% 0",
          zIndex: -1,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: -1,
          }}
        />
      )}
      {children}
    </section>
  );
}
