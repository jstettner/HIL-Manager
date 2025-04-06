"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SwivelText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const staticTextRef = useRef<HTMLSpanElement>(null);
  const changingTextRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !changingTextRef.current ||
      !word1Ref.current ||
      !word2Ref.current
    )
      return;

    // Initial setup - hide the second word
    gsap.set(word2Ref.current, {
      y: -30,
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
    });

    // Create the animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: false });

    // First transition: Anything -> Everything
    tl.to(
      word1Ref.current,
      {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "+=2",
    ); // Wait 2 seconds before starting

    tl.to(
      word2Ref.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.6",
    ); // Start at the same time as previous animation

    // Second transition: Everything -> Anything
    tl.to(
      word2Ref.current,
      {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "+=2",
    ); // Wait 2 seconds before starting

    tl.to(
      word1Ref.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.6",
    ); // Start at the same time as previous animation

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="inline-flex items-baseline text-6xl font-semibold"
    >
      <span ref={staticTextRef} className="mr-4">
        Test
      </span>
      <div
        ref={changingTextRef}
        className="relative inline-block h-[1.2em] w-[8em] overflow-hidden"
      >
        <span ref={word1Ref} className="inline-block">
          Anything
        </span>
        <span
          ref={word2Ref}
          className="inline-block opacity-0 absolute top-0 left-0"
        >
          Everything
        </span>
      </div>
    </div>
  );
}
