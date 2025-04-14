import { SquareDashedMousePointer } from "lucide-react";
import { TestbedCanvas } from "@/app/dashboard/builder/testbed-canvas";
import PageHeader from "@/components/page-header";

export default function TestbedBuilderPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      {/* Hack to fix the kerning between the words. */}
      <PageHeader
        title={
          <>
            Environment Bui<span className="ml-[-0.17em]">l</span>der
          </>
        }
        description="Create or Modify a Test Environment"
        icon={<SquareDashedMousePointer className="w-6 h-6" />}
      />
      <div className="flex-1 min-h-0">
        <TestbedCanvas />
      </div>
    </div>
  );
}
