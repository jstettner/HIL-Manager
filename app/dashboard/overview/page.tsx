import { TestcaseCountChart } from "@/app/dashboard/overview/testcase-count";
import { TestcasePassFailChart } from "@/app/dashboard/overview/testcase-pass-fail";
import {
  SystemStatus,
  SystemStatusLoading,
} from "@/app/dashboard/overview/system-status";
import { TestcaseFailureOriginChart } from "@/app/dashboard/overview/testcase-failure-origin";
import { TestcasesChangesetsChart } from "@/app/dashboard/overview/testcase-changesets";
import { ResolutionStats, ResolutionStatsLoading } from "./resolution-stats";
import { LayoutDashboard } from "lucide-react";
import { AnnouncementsSection } from "@/components/announcements/announcements-section";
import { ControlPanel } from "@/app/dashboard/overview/control-panel";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { ActivityHistory, ActivityHistoryLoading } from "./activity-history";

function DashboardSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-section"
      className={cn("w-full pt-7", className)}
      {...props}
    />
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
      <div className="flex flex-row items-center gap-2 mb-6 page-header">
        <LayoutDashboard className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Dashboard</h1>
          <h3 className="text-xl text-muted-foreground">System Monitoring</h3>
        </div>
      </div>
      <DashboardSection>
        <Suspense fallback={<SystemStatusLoading />}>
          <SystemStatus />
        </Suspense>
      </DashboardSection>
      <DashboardSection>
        <Suspense fallback={<ActivityHistoryLoading />}>
          <ActivityHistory />
        </Suspense>
      </DashboardSection>
      <DashboardSection>
        <ControlPanel />
      </DashboardSection>
      <DashboardSection>
        <AnnouncementsSection />
      </DashboardSection>
      <DashboardSection>
        <Suspense fallback={<ResolutionStatsLoading />}>
          <ResolutionStats />
        </Suspense>
      </DashboardSection>
      <DashboardSection>
        <TestcasesChangesetsChart />
      </DashboardSection>
      <DashboardSection className="flex flex-1 flex-col gap-5 pb-10">
        <div className="grid auto-rows-min gap-7 md:grid-cols-3 h-min-content">
          <div className="rounded-xl h-full">
            <TestcaseCountChart />
          </div>
          <div className="rounded-xl h-full">
            <TestcasePassFailChart />
          </div>
          <div className="rounded-xl h-full">
            <TestcaseFailureOriginChart />
          </div>
        </div>
      </DashboardSection>
    </div>
  );
}
