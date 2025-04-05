"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function NavigationMenuDemo() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-gray-800/30 backdrop-blur-sm rounded-md px-3 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Halidom logo"
          width={40}
          height={40}
          className="brightness-0 invert" // This makes the SVG white
        />
        <span className="text-white text-xl font-semibold">Halidom</span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/docs"
          className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700/50"
        >
          Docs
        </Link>
        <Link
          href="/contact"
          className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700/50"
        >
          Contact
        </Link>
        <Link
          href="/signin"
          className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-medium"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
