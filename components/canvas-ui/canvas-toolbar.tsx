"use client";

import { Button } from "@/components/ui/button";
import { LucideCommand, PlusCircle } from "lucide-react";
import { ReactNode } from "react";

interface CanvasToolbarProps {
  title: string;
  onAddNode: () => void;
  actions?: ReactNode;
}

export function CanvasToolbar({
  title,
  onAddNode,
  actions,
}: CanvasToolbarProps) {
  return (
    <div className="flex flex-row justify-between items-baseline">
      <div className="flex flex-row items-baseline gap-2">
        <Button variant="outline" size="sm" onClick={onAddNode}>
          <div className="flex flex-row items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add Node</span>
            <span className="text-muted-foreground flex flex-row items-center ml-2">
              (<LucideCommand className="h-2 w-2 mr-[0.2rem]" />+ k)
            </span>
          </div>
        </Button>
        <h1 className="text-lg">
          {title} <span className="text-muted-foreground">(saved)</span>
        </h1>
      </div>
      <div className="flex flex-row items-baseline gap-2">{actions}</div>
    </div>
  );
}
