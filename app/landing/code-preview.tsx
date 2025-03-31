"use client";

import React from "react";
import { CodeBlock } from "@/components/codeblock";

const sampleCode = `def main():
    print("Hello World")`;

export function CodePreview() {
  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden bg-gray-900 shadow-2xl">
      {/* IDE Header */}
      <div className="h-8 bg-gray-800 flex items-center px-4 gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="ml-4 flex gap-4">
          <div className="text-gray-400 text-sm">auth.ts</div>
          <div className="text-gray-500 text-sm">client.ts</div>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-6 font-mono text-sm">
        <div className="flex gap-8">
          {/* Line Numbers */}
          <div className="text-gray-600 select-none">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i + 1} className="leading-6">
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>

          <CodeBlock code={sampleCode} />
        </div>
      </div>
    </div>
  );
}
