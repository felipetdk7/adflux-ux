"use client";

import { useRef, useEffect, type ReactNode } from "react";
import styles from "./TextMarquee.module.css";

interface TextMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  separator?: string;
}

/**
 * TextMarquee — Infinite horizontal scrolling text band.
 * Uses CSS animation for optimal performance (composited layer).
 * Duplicates content to create seamless loop.
 */
export function TextMarquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
  separator = "  ✦  ",
}: TextMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate animation duration based on content width
    const contentWidth = track.scrollWidth / 2;
    const durationSeconds = contentWidth / (speed * 10);

    track.style.setProperty("--marquee-duration", `${durationSeconds}s`);
    track.style.setProperty(
      "--marquee-direction",
      direction === "left" ? "normal" : "reverse"
    );
  }, [speed, direction, children]);

  return (
    <div
      className={`${styles.marquee} ${className}`}
      aria-hidden="true"
      data-pause-on-hover={pauseOnHover}
    >
      <div ref={trackRef} className={styles.track}>
        {/* Duplicate content for seamless loop */}
        <span className={styles.content}>
          {children}
          <span className={styles.separator}>{separator}</span>
        </span>
        <span className={styles.content}>
          {children}
          <span className={styles.separator}>{separator}</span>
        </span>
        <span className={styles.content}>
          {children}
          <span className={styles.separator}>{separator}</span>
        </span>
        <span className={styles.content}>
          {children}
          <span className={styles.separator}>{separator}</span>
        </span>
      </div>
    </div>
  );
}
