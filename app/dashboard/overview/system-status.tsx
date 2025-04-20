import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Siren,
  MessageSquareWarning,
  ScanHeart,
  CircleHelp,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { SystemStatus as SystemStatusType, StatusInfo } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { getSystemStatus, getCurrentUserOrganization } from "@/utils/supabase/schema";

function EventBanner({
  className,
  variant,
  status_info,
}: React.ComponentProps<"div"> & {
  variant: "outage" | "warning";
  status_info: StatusInfo;
}) {
  return (
    <div
      className={cn(
        variant === "outage" &&
          "justify-between gap-1 p-4 rounded-md border-l-10 border-1 border-red-500/60",
        variant === "warning" &&
          "justify-between gap-1 p-4 rounded-md border-l-10 border-1 border-yellow-500/60",
        "flex flex-row items-center gap-2 bg-gray-900/20 hover:bg-gray-500/20",
        className,
      )}
      key={status_info.id}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{status_info.title}</span>
        <span className="text-sm">{status_info.description}</span>
        <span className="text-xs">{status_info.date}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button variant="outline">Acknowledge</Button>
        <Button variant="default">
          View <ArrowRight className="h-4 w-4" />
        </Button>
        <CircleHelp className="h-4 w-4" />
      </div>
    </div>
  );
}

export function SystemStatusLoading() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <CardTitle className="font-medium">Environment Status</CardTitle>
        </div>
      </CardHeader>
      {/* TODO: Make this more closely match the actual component */}
      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
  );
}

export async function SystemStatus() {
  // Get the current user's organization
  const currentOrg = await getCurrentUserOrganization();
  if (!currentOrg?.organization_id) {
    throw new Error("No organization found for current user");
  }
  
  const status = await getSystemStatus(currentOrg.organization_id);
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <CardTitle className="font-medium">Environment Status</CardTitle>
        </div>
      </CardHeader>
      {/* TODO: There's no need to use a map here. Break these out into a dedicated component */}
      <CardContent className="grid lg:grid-cols-3 auto-rows-min gap-5">
        {Object.entries(status.counts).map(([key, value]) => (
          <div
            key={key}
            className={`flex flex-col gap-1 p-2 rounded-md ${
              key === "Critical"
                ? "border-l-10 border-red-500/60 bg-red-500/20 hover:bg-red-500/40 animate-pulse"
                : key === "Warning"
                  ? "border-l-10 border-yellow-500/60 bg-yellow-500/20 hover:bg-yellow-500/40"
                  : "border-l-10 border-green-500/60 bg-green-500/20 hover:bg-green-500/40"
            }`}
          >
            <div className="flex flex-row items-center gap-2">
              {key === "Critical" && <Siren className="w-4 h-4" />}
              {key === "Warning" && (
                <MessageSquareWarning className="w-4 h-4" />
              )}
              {key === "Healthy" && <ScanHeart className="w-4 h-4" />}
              <span className="font-semibold ml-1">{key}</span>
            </div>
            <span className="text-xs">{value}</span>
          </div>
        ))}
      </CardContent>
      <CardContent className="flex flex-col gap-2">
        {status.outages.map((outage) => (
          <EventBanner key={outage.id} variant="outage" status_info={outage} />
        ))}
      </CardContent>
      <CardContent className="flex flex-col gap-2">
        {status.warnings.map((warning) => (
          <EventBanner
            key={warning.id}
            variant="warning"
            status_info={warning}
          />
        ))}
      </CardContent>
      <CardContent className="w-full">
        <Button className="w-full" variant="outline">
          Show Previously Acknowledged
        </Button>
      </CardContent>
    </Card>
  );
}
