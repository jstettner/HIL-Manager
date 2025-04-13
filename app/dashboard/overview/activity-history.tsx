import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityHistory as ActivityHistoryType, EventInfo } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sampleActivityHistory: ActivityHistoryType = {
  events: [
    {
      id: "4",
      title: "Test Set Queued",
      description:
        "Changeset #1923 assessment was approved. Test set queued for execution.",
      date: "30 minutes ago",
      sentiment: "neutral",
    },
    {
      id: "1",
      title: "Host Offline - TM-STATION-001",
      description:
        "Environment server is currently unreachable (122.170.31.17).",
      date: "2 hours ago",
      sentiment: "negative",
    },
    {
      id: "2",
      title: "Current Draw Back Within Bounds - TM-POD-001",
      description: "TM-POD-001 is healthy once again.",
      date: "3 hours ago",
      sentiment: "neutral",
    },
    {
      id: "3",
      title: "Overcurrent Protection Triggered - TM-POD-001",
      description: "Overcurrent protection triggered on TM-POD-001.",
      date: "3 hours ago",
      sentiment: "negative",
    },
    {
      id: "5",
      title: "Test Set Passed",
      description: "Changeset #1922 Test set passed.",
      date: "4 hours ago",
      sentiment: "positive",
    },
  ],
};

// Mocked API
const fetchActivityHistory: () => Promise<ActivityHistoryType> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sampleActivityHistory;
};

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
          event_info.sentiment === "neutral" && "border-blue-500/60 bg-blue-500/20 hover:bg-blue-500/4",
          event_info.sentiment === "positive" && "border-green-500/60 bg-green-500/20 hover:bg-green-500/4",
          event_info.sentiment === "negative" && "border-red-500/60 bg-red-500/20 hover:bg-red-500/4",
          className,
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
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
  const history = await fetchActivityHistory();
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
