"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import styles from "./ImageReveal.module.css";

interface ImageRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "center";
  duration?: number;
  start?: string;
  className?: string;
}

/**
 * ImageReveal — Smooth clip-path or scale-based image reveal on scroll.
 * Wraps an image or media element with a reveal mask.
 */
export function ImageReveal({
  children,
  direction = "left",
  duration = 1.2,
  start = "top 80%",
  className = "",
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const inner = wrapper.querySelector(`.${styles.inner}`) as HTMLElement;
    if (!inner) return;

    const clipDirections: Record<string, { from: string; to: string }> = {
      left: {
        from: "inset(0 100% 0 0)",
        to: "inset(0 0% 0 0)",
      },
      right: {
        from: "inset(0 0 0 100%)",
        to: "inset(0 0 0 0%)",
      },
      up: {
        from: "inset(100% 0 0 0)",
        to: "inset(0% 0 0 0)",
      },
      down: {
        from: "inset(0 0 100% 0)",
        to: "inset(0 0 0% 0)",
      },
      center: {
        from: "inset(50% 50% 50% 50%)",
        to: "inset(0% 0% 0% 0%)",
      },
    };

    const clip = clipDirections[direction];

    const ctx = gsap.context(() => {
      gsap.set(wrapper, { clipPath: clip.from });
      gsap.set(inner, { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start,
        },
      });

      tl.to(wrapper, {
        clipPath: clip.to,
        duration,
        ease: "power4.inOut",
      }).to(
        inner,
        {
          scale: 1,
          duration: duration * 1.2,
          ease: "power3.out",
        },
        0
      );
    });

    return () => ctx.revert();
  }, [direction, duration, start]);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
