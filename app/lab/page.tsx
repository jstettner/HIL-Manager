import { FlaskConical } from "lucide-react";

export default function TestcaseLabPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <FlaskConical className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Test Lab</h1>
          <h3 className="text-xl text-muted-foreground">Design a Test</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
  );
}
