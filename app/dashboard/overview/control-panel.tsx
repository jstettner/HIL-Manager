import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TowerControl,
  Cog,
  Clock,
  Book,
  Bell,
  Box,
  TestTubeDiagonal,
} from "lucide-react";

export function ControlPanel() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <TowerControl className="h-4 w-4" />
          <CardTitle className="font-medium">Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-4 xl:grid-cols-5 auto-rows-min gap-2">
        <Button variant="outline">
          <Cog className="h-4 w-4" />
          Run Diagnostics
        </Button>
        <Button variant="outline">
          <Clock className="h-4 w-4" />
          View Outages
        </Button>
        <Button variant="outline">
          <Book className="h-4 w-4" />
          Compliance Reports
        </Button>
        <Button variant="outline">
          <Bell className="h-4 w-4" />
          Configure Alerts
        </Button>
        <Button variant="outline">
          <Box className="h-4 w-4" />
          Bulk Dispositions
        </Button>
        <Button variant="outline">
          <TestTubeDiagonal className="h-4 w-4" />
          Flaky Test Summary
        </Button>
      </CardContent>
    </Card>
  );
}
