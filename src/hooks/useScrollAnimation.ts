"use client";

import { useRef, useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  animation?: gsap.TweenVars;
  stagger?: number;
}

/**
 * Custom hook for scroll-triggered GSAP animations.
 * Handles proper setup and cleanup in React strict mode.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const {
        start = "top 85%",
        end = "bottom 20%",
        scrub = false,
        pin = false,
        markers = false,
        animation = { opacity: 1, y: 0, duration: 0.8 },
        stagger = 0,
      } = options;

      // Set initial state
      gsap.set(el, { opacity: 0, y: 40 });

      gsap.to(el, {
        ...animation,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          pin,
          markers,
        },
        stagger,
      });
    });

    return () => ctx.revert();
  }, [options]);

  return elementRef;
}

/**
 * Hook for parallax scroll effects.
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

/**
 * Hook to create a GSAP context for a container element.
 * Useful for managing multiple animations within a component.
 */
export function useGsapContext<T extends HTMLElement>(): {
  containerRef: RefObject<T | null>;
  contextRef: RefObject<gsap.Context | null>;
} {
  const containerRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context>(null);

  useEffect(() => {
    if (containerRef.current) {
      contextRef.current = gsap.context(() => {}, containerRef.current);
    }

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return { containerRef, contextRef };
}
