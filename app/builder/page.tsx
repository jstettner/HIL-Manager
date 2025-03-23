import { SquareDashedMousePointer } from "lucide-react";
import { TestbedCanvas } from "@/components/testbed-canvas";

export default function TestbedBuilderPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <SquareDashedMousePointer className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <div className="flex flex-row items-baseline">
            {/* Hack to fix the kerning between the words. */}
            <h1 className="text-2xl pr-0 mr-0">Testbed Bui</h1>
            <h1 className="text-2xl pl-0 ml-[-0.17em]">lder</h1>
          </div>
          <h3 className="text-xl text-muted-foreground">
            Add a Test Environment to the Armory
          </h3>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <TestbedCanvas />
      </div>
    </div>
  );
}
