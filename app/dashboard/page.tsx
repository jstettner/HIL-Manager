import { TestcaseCountChart } from "@/components/charts/testcase-count";
import { TestcasePassFailChart } from "@/components/charts/testcase-pass-fail";
import { TestcaseFailureOriginChart } from "@/components/charts/testcase-failure-origin";
import { TestcasesChangesetsChart } from "@/components/charts/testcase-changesets";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <LayoutDashboard className="w-6 h-6" />
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4">
        {/* Add dashboard content here */}
        <p>Welcome to the Halidom Dashboard</p>
      </div>
      <div className="w-full p-4 pt-10">
        <TestcasesChangesetsChart />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-10">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 h-min-content">
          <div className="rounded-xl bg-muted/50 h-full">
            <TestcaseCountChart />
          </div>
          <div className="rounded-xl bg-muted/50 h-full">
            <TestcasePassFailChart />
          </div>
          <div className="rounded-xl bg-muted/50 h-full">
            <TestcaseFailureOriginChart />
          </div>
        </div>
      </div>
    </div>
  );
}
