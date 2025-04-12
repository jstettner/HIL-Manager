import Docs from "./docs.mdx";
import { SwivelText } from "@/components/swivel-text";

export default function DocsPage() {
  return (
    <div className="flex flex-col bg-black">
      <div className="h-full sm:max-w-3/4 border-l border-r border-white bg-black mx-auto px-5 sm:px-15 pt-30">
        <SwivelText />
        <Docs />
        <footer className="w-full py-6 text-center text-white text-sm mt-20">
          © 2025 Halidom. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
