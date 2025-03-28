import { TestcaseCountChart } from "@/components/charts/testcase-count";
import { TestcasePassFailChart } from "@/components/charts/testcase-pass-fail";
import { TestcaseFailureOriginChart } from "@/components/charts/testcase-failure-origin";
import { TestcasesChangesetsChart } from "@/components/charts/testcase-changesets";
import { LayoutDashboard } from "lucide-react";
import { AnnouncementsSection } from "@/components/announcements/announcements-section";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      <div className="flex flex-row items-center gap-2 mb-6 page-header">
        <LayoutDashboard className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Dashboard</h1>
          <h3 className="text-xl text-muted-foreground">Test Anything</h3>
        </div>
      </div>
      <div className="w-full px-4 pt-7">
        <AnnouncementsSection />
      </div>
      <div className="w-full px-4 pt-7">
        <TestcasesChangesetsChart />
      </div>
      <div className="flex flex-1 flex-col gap-5 px-4 pt-7 pb-10">
        <div className="grid auto-rows-min gap-7 md:grid-cols-3 h-min-content">
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
