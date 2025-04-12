import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockFading } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ResolutionStats as ResolutionStatsType } from "./types";

const sampleResolutionStats: ResolutionStatsType = {
  stats: [
    {
      id: "1",
      title: "Average Time to Resolution",
      description: "~2.5hr",
    },
    {
      id: "2",
      title: "Average Testcase Duration",
      description: "~1.8hr",
    },
    {
      id: "3",
      title: "Average Testcase Overhead",
      description: "~10m",
    },
  ],
};

export function ResolutionStatsLoading() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <ClockFading className="h-4 w-4" />
          <CardTitle className="font-medium">Resolution Stats</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-3 gap-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function StatContainer({
  className,
  title,
  description,
}: React.ComponentProps<"div"> & { title: string; description: string }) {
  return (
    <div
      className={cn(
        "w-full flex flex-col border-1 border-dashed rounded-md px-10 pt-5",
        className,
      )}
    >
      <span className="text-2xl font-semibold">{title}</span>
      <span className="text-[6em] font-semibold">{description}</span>
    </div>
  );
}

// Mocked API
const fetchResolutionStats: () => Promise<ResolutionStatsType> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sampleResolutionStats;
};

export async function ResolutionStats() {
  const stats: ResolutionStatsType = await fetchResolutionStats();
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <ClockFading className="h-4 w-4" />
          <CardTitle className="font-medium">
            Stats<span className="text-muted-foreground pl-2">(Past Week)</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-2">
          {stats.stats.slice(0, 3).map((stat) => (
            <StatContainer
              key={stat.id}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
