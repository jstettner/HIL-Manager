import { SquareDashedMousePointer } from "lucide-react";
import { TestbedCanvas } from "@/components/flow-data-loader";

export default function TestbedBuilderPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <SquareDashedMousePointer className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <div className="flex flex-row items-baseline">
            {/* Hack to fix the kerning between the words. */}
            <h1 className="text-2xl pr-3">
              Testbed Bui<span className="ml-[-0.17em]">l</span>der
            </h1>
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
