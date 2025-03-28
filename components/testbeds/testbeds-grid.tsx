"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GalleryVerticalEnd,
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  Globe,
} from "lucide-react";
import { testBeds as sampleTestBeds } from "@/data/sample-data";

// Mock API fetch function
const fetchTestBeds = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sampleTestBeds;
};

export function TestbedsGrid() {
  const [loading, setLoading] = useState(true);
  const [testBeds, setTestBeds] = useState<typeof sampleTestBeds>([]);

  useEffect(() => {
    const loadTestBeds = async () => {
      setLoading(true);
      const data = await fetchTestBeds();
      setTestBeds(data);
      setLoading(false);
    };
    loadTestBeds();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading
        ? // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-[140px]" />
                <Skeleton className="h-6 w-[80px] rounded-full" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-[180px]" />
                </div>

                <div className="pt-3 border-t">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">CPU Cores</span>
                    </div>
                    <Skeleton className="h-4 w-[40px]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Memory (GB)</span>
                    </div>
                    <Skeleton className="h-4 w-[40px]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Storage (GB)
                      </span>
                    </div>
                    <Skeleton className="h-4 w-[40px]" />
                  </div>
                </div>
              </div>
            </div>
          ))
        : testBeds.map((testbed) => (
            <div
              key={testbed.id}
              className="rounded-lg border p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{testbed.name}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                ${
                  testbed.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : testbed.status === "maintenance"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
                >
                  {testbed.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>{testbed.ipAddress}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span>
                    Last active: {new Date(testbed.lastActive).toLocaleString()}
                  </span>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground pb-3">
                    {testbed.description}
                  </p>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>CPU Cores</span>
                    </div>
                    <span className="font-medium">{testbed.resources.cpu}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4" />
                      <span>Memory (GB)</span>
                    </div>
                    <span className="font-medium">
                      {testbed.resources.memory}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      <span>Storage (GB)</span>
                    </div>
                    <span className="font-medium">
                      {testbed.resources.storage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
