"use client";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Infrastructure", HIL: 186, HOL: 80 },
  { month: "DUT", HIL: 305, HOL: 200 },
  { month: "Sims", HIL: 237, HOL: 120 },
  { month: "Vibe", HIL: 73, HOL: 190 },
  { month: "Vacuum", HIL: 209, HOL: 130 },
  { month: "Thermal", HIL: 214, HOL: 140 },
];
const chartConfig = {
  HIL: {
    label: "HIL",
    color: "var(--chart-1)",
  },
  HOL: {
    label: "HOL",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
export function TestcaseFailureOriginChart() {
  return (
    <Card className="h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>Failure Cause</CardTitle>
        <CardDescription>
          Showing failure cause for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar dataKey="HIL" fill="var(--color-HIL)" fillOpacity={0.6} />
            <Radar dataKey="HOL" fill="var(--color-HOL)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
