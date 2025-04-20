import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ChevronRight, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityHistory as ActivityHistoryType, EventInfo } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getActivityHistory, getCurrentUserOrganization } from "@/utils/supabase/schema";

// TODO: Make this more closely match the actual component
export function ActivityHistoryLoading() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <CardTitle className="font-medium">Activity History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
  );
}

function HistoryItem({
  className,
  event_info,
}: React.ComponentProps<"div"> & { event_info: EventInfo }) {
  return (
    <div className="w-full border-l-10 border-muted rounded-md">
      <div
        className={cn(
          "flex flex-row justify-between items-center gap-2 hover:bg-gray-500/20 rounded-r-md p-2 border-1",
          className,
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <Circle
              className={cn(
                "h-4 w-4 border-1 rounded-full",
                event_info.sentiment === "neutral" && "text-blue-500",
                event_info.sentiment === "positive" && "text-green-500",
                event_info.sentiment === "negative" && "text-red-500",
              )}
            />
            <span className="font-semibold">{event_info.title}</span>
            <span className="text-xs">{event_info.date}</span>
          </div>
          <span className="text-xs">{event_info.description}</span>
        </div>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}

export async function ActivityHistory() {
  // Get the current user's organization
  const currentOrg = await getCurrentUserOrganization();
  if (!currentOrg?.organization_id) {
    throw new Error("No organization found for current user");
  }
  
  const history = await getActivityHistory(currentOrg.organization_id);
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <CardTitle className="font-medium">Activity History</CardTitle>
        </div>
        <div>
          <Button variant="outline">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        {history.events.map((event, index) => (
          <div key={event.id} className="w-full flex flex-col items-center">
            {index > 0 && <div className="h-4 w-px bg-gray-300/50 mx-2" />}
            <HistoryItem className="w-full" event_info={event} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
