import Docs from "./docs.mdx";
import { SwivelText } from "@/components/swivel-text";

export default function DocsPage() {
  return (
    <div className="w-full h-full bg-black">
      <div className="h-full max-w-3/4 border-l border-r border-white bg-black mx-auto px-15 pt-30">
        <SwivelText />
        <Docs />
        <footer className="w-full py-6 text-center text-white text-sm mt-20">
          © 2025 Helium AI. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
