"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean;
  start?: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * ScrollReveal — Wraps children with a scroll-triggered reveal animation.
 * Direction-based entrance with customizable distance and timing.
 */
export function ScrollReveal({
  children,
  direction = "up",
  distance = 60,
  delay = 0,
  duration = 0.8,
  stagger = 0,
  scrub = false,
  start = "top 85%",
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const { x, y } = directionMap[direction];

    const ctx = gsap.context(() => {
      gsap.set(el.children.length > 1 ? el.children : el, {
        opacity: 0,
        x,
        y,
      });

      gsap.to(el.children.length > 1 ? el.children : el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          scrub,
        },
      });
    });

    return () => ctx.revert();
  }, [direction, distance, delay, duration, stagger, scrub, start]);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
