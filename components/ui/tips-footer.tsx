"use client";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { Card } from "./card";
import { Skeleton } from "./skeleton";

// Mock API response type
interface Tip {
  id: number;
  content: string;
  category: string;
}

// Mock API function
const fetchRandomTip = async (): Promise<Tip> => {
  // Simulated tips data
  const tips = [
    {
      id: 1,
      content: "Use keyboard shortcuts (⌘K) to quickly navigate between pages",
      category: "Navigation",
    },
    {
      id: 2,
      content: "Click on any row to view detailed information",
      category: "Usage",
    },
    {
      id: 3,
      content: "Sort tables by clicking on column headers",
      category: "Tables",
    },
    {
      id: 4,
      content: "Use the search bar to filter results quickly",
      category: "Search",
    },
    {
      id: 5,
      content: "Hover over icons to see tooltips with more information",
      category: "UI",
    },
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

export function TipsFooter() {
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    const loadTip = async () => {
      const newTip = await fetchRandomTip();
      setTip(newTip);
    };
    loadTip();
  }, []);

  if (!tip) {
    return (
      <div className="mt-3 mb-4">
        <Card className="bg-muted/50">
          <div className="flex items-center gap-2 px-4">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="flex-1">
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-3 mb-4">
      <Card className="bg-muted/50">
        <div className="flex items-center gap-2 px-4">
          <Info className="w-5 h-5 text-muted-foreground" />
          <div>
            <span className="text-sm text-muted-foreground font-medium">
              {tip.category}:{" "}
            </span>
            <span className="text-sm text-muted-foreground">{tip.content}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
