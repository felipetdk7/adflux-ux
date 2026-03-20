"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import styles from "./HorizontalScroll.module.css";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

/**
 * HorizontalScroll — Section scrubbing component.
 * Transforms vertical scroll into horizontal scroll within a pinned container.
 * Content scrolls horizontally as user scrolls vertically.
 */
export function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(track, {
        x: -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth - viewportWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${className}`}>
      <div ref={trackRef} className={styles.track}>
        {children}
      </div>
    </section>
  );
}
