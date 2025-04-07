import { FlaskConical } from "lucide-react";
import { TestcaseCanvas } from "@/app/dashboard/lab/testcase-canvas";

export default function TestcaseLabPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <FlaskConical className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <div className="flex flex-row items-baseline">
            <h1 className="text-2xl">Test Lab</h1>
          </div>
          <h3 className="text-xl text-muted-foreground">
            Design a Test Procedure
          </h3>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <TestcaseCanvas />
      </div>
    </div>
  );
}
