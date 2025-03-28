import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "low" | "medium" | "high";
}

// Placeholder announcements - in a real app, these would come from an API
const announcements: Announcement[] = [
  {
    id: "1",
    title: "System Maintenance",
    description:
      "Scheduled maintenance window this weekend. Some services may be unavailable.",
    date: "2025-03-30",
    priority: "high",
  },
  {
    id: "2",
    title: "New Features Released",
    description:
      "Check out our latest dashboard improvements and performance optimizations.",
    date: "2025-03-27",
    priority: "medium",
  },
];

export function AnnouncementsSection() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4" />
          <CardTitle className="text-sm font-medium">Announcements</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="flex flex-col space-y-1 border-l-2 pl-4"
              style={{
                borderColor:
                  announcement.priority === "high"
                    ? "var(--destructive)"
                    : announcement.priority === "medium"
                      ? "var(--warning)"
                      : "var(--muted)",
              }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">{announcement.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {announcement.date}
                </span>
              </div>
              <CardDescription className="text-xs">
                {announcement.description}
              </CardDescription>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
