"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!smoothWrapperRef.current || !smoothContentRef.current) return;

    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 1.5, // Smoothness level (higher = smoother but slower)
      effects: true, // Enable data-speed effects
      normalizeScroll: true, // Normalize scroll across devices
      ignoreMobileResize: true, // Prevent issues on mobile address bar hide/show
      smoothTouch: 0.1, // Enable smooth scrolling on touch devices (0.1 = subtle)
    });

    // Cleanup
    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      ref={smoothWrapperRef}
      className="fixed top-0 left-0 w-full h-full overflow-hidden"
    >
      <div id="smooth-content" ref={smoothContentRef}>
        {children}
      </div>
    </div>
  );
}
