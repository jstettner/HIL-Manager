import { highlightPythonCode } from "@/hooks/starryNight";
import { useEffect, useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    highlightPythonCode(code).then(setHighlightedCode);
  }, [code]);

  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
}
