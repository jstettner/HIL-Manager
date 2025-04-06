import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";

// Define custom components for MDX rendering
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use the default components
    ...components,
    // Override h1 with custom styling
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-4xl mt-8 font-bold tracking-tight mb-4 pb-2 border-b border-white">
        {children}
      </h1>
    ),
    // Override h2 with custom styling
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h2>
    ),
    // Override h3 with custom styling
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h3>
    ),
    // Override p with custom styling
    p: ({ children }: { children: ReactNode }) => (
      <p className="leading-7 mb-4 text-lg">{children}</p>
    ),
    // Override ul with custom styling
    ul: ({ children }: { children: ReactNode }) => (
      <ul className="ml-6 list-disc text-lg">{children}</ul>
    ),
    // Override li with custom styling
    li: ({ children }: { children: ReactNode }) => (
      <li className="mt-2 text-lg">{children}</li>
    ),
    // Override a (links) with custom styling
    a: ({ children, href }: { children: ReactNode; href?: string }) => (
      <a
        href={href}
        className="text-[#4494FD] hover:text-blue-300 transition-colors underline underline-offset-2"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  };
}
