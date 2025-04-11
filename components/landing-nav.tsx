"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[min(95%,_75rem)] bg-gray-800/30 backdrop-blur-sm rounded-md px-3 py-3 z-50">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt="Halidom logo"
            width={40}
            height={40}
            className="brightness-0 invert" // This makes the SVG white
          />
          <span className="text-white text-xl font-semibold">Halidom</span>
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/docs"
            className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700/50"
          >
            Docs
          </Link>
          <Link
            href="mailto:founders@halidom.ai"
            className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700/50"
          >
            Contact
          </Link>
          <Link
            href="/sign-in"
            className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col gap-2 pt-4">
          <Link
            href="/docs"
            className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700/50"
            onClick={() => setIsOpen(false)}
          >
            Docs
          </Link>
          <Link
            href="mailto:founders@halidom.ai"
            className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700/50"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/sign-in"
            className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-medium text-center"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
