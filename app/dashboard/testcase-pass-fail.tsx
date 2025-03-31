"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", pass: 186, fail: 80 },
  { month: "February", pass: 305, fail: 200 },
  { month: "March", pass: 237, fail: 120 },
  { month: "April", pass: 73, fail: 190 },
  { month: "May", pass: 209, fail: 130 },
  { month: "June", pass: 214, fail: 140 },
];
const chartConfig = {
  pass: {
    label: "Pass",
    color: "var(--chart-1)",
  },
  fail: {
    label: "Fail",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;
export function TestcasePassFailChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Testcase Outcomes</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="pass"
              type="monotone"
              stroke="var(--color-pass)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="fail"
              type="monotone"
              stroke="var(--color-fail)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Similar to last month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing all testcases for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
