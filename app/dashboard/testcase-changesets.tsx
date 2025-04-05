"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { date: "2024-04-01", CI: 222, prs: 150 },
  { date: "2024-04-02", CI: 97, prs: 180 },
  { date: "2024-04-03", CI: 167, prs: 120 },
  { date: "2024-04-04", CI: 242, prs: 260 },
  { date: "2024-04-05", CI: 373, prs: 290 },
  { date: "2024-04-06", CI: 301, prs: 340 },
  { date: "2024-04-07", CI: 245, prs: 180 },
  { date: "2024-04-08", CI: 409, prs: 320 },
  { date: "2024-04-09", CI: 59, prs: 110 },
  { date: "2024-04-10", CI: 261, prs: 190 },
  { date: "2024-04-11", CI: 327, prs: 350 },
  { date: "2024-04-12", CI: 292, prs: 210 },
  { date: "2024-04-13", CI: 342, prs: 380 },
  { date: "2024-04-14", CI: 137, prs: 220 },
  { date: "2024-04-15", CI: 120, prs: 170 },
  { date: "2024-04-16", CI: 138, prs: 190 },
  { date: "2024-04-17", CI: 446, prs: 360 },
  { date: "2024-04-18", CI: 364, prs: 410 },
  { date: "2024-04-19", CI: 243, prs: 180 },
  { date: "2024-04-20", CI: 89, prs: 150 },
  { date: "2024-04-21", CI: 137, prs: 200 },
  { date: "2024-04-22", CI: 224, prs: 170 },
  { date: "2024-04-23", CI: 138, prs: 230 },
  { date: "2024-04-24", CI: 387, prs: 290 },
  { date: "2024-04-25", CI: 215, prs: 250 },
  { date: "2024-04-26", CI: 75, prs: 130 },
  { date: "2024-04-27", CI: 383, prs: 420 },
  { date: "2024-04-28", CI: 122, prs: 180 },
  { date: "2024-04-29", CI: 315, prs: 240 },
  { date: "2024-04-30", CI: 454, prs: 380 },
  { date: "2024-05-01", CI: 165, prs: 220 },
  { date: "2024-05-02", CI: 293, prs: 310 },
  { date: "2024-05-03", CI: 247, prs: 190 },
  { date: "2024-05-04", CI: 385, prs: 420 },
  { date: "2024-05-05", CI: 481, prs: 390 },
  { date: "2024-05-06", CI: 498, prs: 520 },
  { date: "2024-05-07", CI: 388, prs: 300 },
  { date: "2024-05-08", CI: 149, prs: 210 },
  { date: "2024-05-09", CI: 227, prs: 180 },
  { date: "2024-05-10", CI: 293, prs: 330 },
  { date: "2024-05-11", CI: 335, prs: 270 },
  { date: "2024-05-12", CI: 197, prs: 240 },
  { date: "2024-05-13", CI: 197, prs: 160 },
  { date: "2024-05-14", CI: 448, prs: 490 },
  { date: "2024-05-15", CI: 473, prs: 380 },
  { date: "2024-05-16", CI: 338, prs: 400 },
  { date: "2024-05-17", CI: 499, prs: 420 },
  { date: "2024-05-18", CI: 315, prs: 350 },
  { date: "2024-05-19", CI: 235, prs: 180 },
  { date: "2024-05-20", CI: 177, prs: 230 },
  { date: "2024-05-21", CI: 82, prs: 140 },
  { date: "2024-05-22", CI: 81, prs: 120 },
  { date: "2024-05-23", CI: 252, prs: 290 },
  { date: "2024-05-24", CI: 294, prs: 220 },
  { date: "2024-05-25", CI: 201, prs: 250 },
  { date: "2024-05-26", CI: 213, prs: 170 },
  { date: "2024-05-27", CI: 420, prs: 460 },
  { date: "2024-05-28", CI: 233, prs: 190 },
  { date: "2024-05-29", CI: 78, prs: 130 },
  { date: "2024-05-30", CI: 340, prs: 280 },
  { date: "2024-05-31", CI: 178, prs: 230 },
  { date: "2024-06-01", CI: 178, prs: 200 },
  { date: "2024-06-02", CI: 470, prs: 410 },
  { date: "2024-06-03", CI: 103, prs: 160 },
  { date: "2024-06-04", CI: 439, prs: 380 },
  { date: "2024-06-05", CI: 88, prs: 140 },
  { date: "2024-06-06", CI: 294, prs: 250 },
  { date: "2024-06-07", CI: 323, prs: 370 },
  { date: "2024-06-08", CI: 385, prs: 320 },
  { date: "2024-06-09", CI: 438, prs: 480 },
  { date: "2024-06-10", CI: 155, prs: 200 },
  { date: "2024-06-11", CI: 92, prs: 150 },
  { date: "2024-06-12", CI: 492, prs: 420 },
  { date: "2024-06-13", CI: 81, prs: 130 },
  { date: "2024-06-14", CI: 426, prs: 380 },
  { date: "2024-06-15", CI: 307, prs: 350 },
  { date: "2024-06-16", CI: 371, prs: 310 },
  { date: "2024-06-17", CI: 475, prs: 520 },
  { date: "2024-06-18", CI: 107, prs: 170 },
  { date: "2024-06-19", CI: 341, prs: 290 },
  { date: "2024-06-20", CI: 408, prs: 450 },
  { date: "2024-06-21", CI: 169, prs: 210 },
  { date: "2024-06-22", CI: 317, prs: 270 },
  { date: "2024-06-23", CI: 480, prs: 530 },
  { date: "2024-06-24", CI: 132, prs: 180 },
  { date: "2024-06-25", CI: 141, prs: 190 },
  { date: "2024-06-26", CI: 434, prs: 380 },
  { date: "2024-06-27", CI: 448, prs: 490 },
  { date: "2024-06-28", CI: 149, prs: 200 },
  { date: "2024-06-29", CI: 103, prs: 160 },
  { date: "2024-06-30", CI: 446, prs: 400 },
];
const chartConfig = {
  views: {
    label: "Changesets",
  },
  CI: {
    label: "Continuous Integration",
    color: "url(#colorCI)",
  },
  prs: {
    label: "Pull-Requests",
    color: "url(#colorPRs)",
  },
} satisfies ChartConfig;

// Gradient colors that match the image
const gradientColors = {
  CI: {
    start: "#135ab4",
    end: "#ff6b8b",
  },
  prs: {
    start: "#135ab4",
    end: "#ff7d5e",
  },
};

// Function to generate colors along the gradient
const getColorAlongGradient = (
  index: number,
  total: number,
  activeChart: string,
) => {
  // Calculate position along the gradient (0 to 1)
  const position = total <= 1 ? 0.5 : index / (total - 1);

  // Get start and end colors based on active chart
  const startColor =
    gradientColors[activeChart as keyof typeof gradientColors].start;
  const endColor =
    gradientColors[activeChart as keyof typeof gradientColors].end;

  // Parse hex colors to RGB
  const startRGB = {
    r: parseInt(startColor.slice(1, 3), 16),
    g: parseInt(startColor.slice(3, 5), 16),
    b: parseInt(startColor.slice(5, 7), 16),
  };

  const endRGB = {
    r: parseInt(endColor.slice(1, 3), 16),
    g: parseInt(endColor.slice(3, 5), 16),
    b: parseInt(endColor.slice(5, 7), 16),
  };

  // Interpolate between colors
  const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * position);
  const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * position);
  const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * position);

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export function TestcasesChangesetsChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("CI");
  const total = React.useMemo(
    () => ({
      CI: chartData.reduce((acc, curr) => acc + curr.CI, 0),
      prs: chartData.reduce((acc, curr) => acc + curr.prs, 0),
    }),
    [],
  );
  return (
    <Card className="h-full py-0">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Changesets Analyzed</CardTitle>
          <CardDescription>
            Showing total changesets analyzed for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["CI", "prs"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorAlongGradient(
                    index,
                    chartData.length,
                    activeChart,
                  )}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
