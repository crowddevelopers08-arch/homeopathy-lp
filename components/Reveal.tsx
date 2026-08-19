"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  as = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
}) {
  const Tag = as;
  const nodeRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={nodeRef as never}
      className={`reveal reveal-${direction}${visible ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
