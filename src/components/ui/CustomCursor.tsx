"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hidden on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Make body cursor slightly smaller or invisible depending on preference
    // document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      // Small dot follows instantly
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Larger follower has a delay/spring
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(followerRef.current, {
        scale: 2.5,
        border: "1px solid var(--color-primary)",
        backgroundColor: "transparent",
        backdropFilter: "invert(1) grayscale(1)",
        mixBlendMode: "normal",
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.1,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: "var(--color-ink)",
        mixBlendMode: "difference",
        duration: 0.3,
      });
      gsap.to(cursorRef.current, {
        opacity: 1,
        duration: 0.1,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add listeners to all interactive elements
    const interactiveSelectors = "a, button, input, textarea, select, [role='button']";
    
    // Use event delegation for dynamic elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        onMouseEnterLink();
      } else {
        onMouseLeaveLink();
      }
    };
    
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      // document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div ref={followerRef} className={styles.cursorFollower}></div>
      <div ref={cursorRef} className={styles.cursorDot}></div>
    </>
  );
}
