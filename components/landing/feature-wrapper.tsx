"use client";

import { ReactNode, useEffect, useState } from "react";

interface FeatureWrapperProps {
  children: ReactNode;
}

export function FeatureWrapper({ children }: FeatureWrapperProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      } else if (window.scrollY === 0 && hasScrolled) {
        setHasScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <div
      className={`transition-opacity duration-500 ${hasScrolled ? "opacity-80" : "opacity-40"}`}
    >
      {children}
    </div>
  );
}
