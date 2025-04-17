import { FlaskConical } from "lucide-react";
import { TestcaseCanvas } from "@/app/dashboard/lab/testcase-canvas";
import PageHeader from "@/components/page-header";

export default function TestcaseLabPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      <PageHeader
        title="Test Lab"
        description="Design a Test Procedure"
        icon={<FlaskConical className="w-6 h-6" />}
      />
      <div className="flex-1 min-h-0">
        <TestcaseCanvas />
      </div>
    </div>
  );
}
