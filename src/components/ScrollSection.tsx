"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollSection({ children, delay = 0, className = '' }: ScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-100 translate-y-0' // Start visible, just animate on scroll
      } ${className}`}
      style={{ transitionDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}
