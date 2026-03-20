import { type ReactNode, type ElementType } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  hover?: boolean;
  className?: string;
  as?: ElementType;
}

/**
 * Card — Neo-Brutalist card component.
 * Features thick borders, hard offset shadows, and clean internal structure.
 */
export function Card({
  children,
  variant = "default",
  hover = true,
  className = "",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`
        ${styles.card}
        ${styles[variant]}
        ${hover ? styles.hoverable : ""}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
