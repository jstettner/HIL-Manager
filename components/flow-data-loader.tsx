"use client";

import { useState } from "react";
import { FlowNode, FlowEdge } from "./canvas";
import { Canvas } from "./canvas";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const sampleNodes = [
  { type: "input", label: "IEPE Input" },
  { type: "input", label: "LED Strip" },
  { type: "default", label: "MCU" },
  { type: "default", label: "LDR" },
  { type: "output", label: "Halidom" },
];

interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

async function fetchFlowData(): Promise<FlowData> {
  // In a real implementation, this would fetch from an API or database
  // For demonstration, we're returning mock data
  return {
    nodes: [
      {
        id: "1",
        type: "input",
        data: { label: "IEPE Input" },
        position: { x: 175, y: 25 },
      },
      {
        id: "2",
        type: "default",
        data: { label: "MCU 1" },
        position: { x: 75, y: 125 },
      },
      {
        id: "3",
        type: "default",
        data: { label: "MCU 2" },
        position: { x: 275, y: 125 },
      },
      {
        id: "4",
        type: "default",
        data: { label: "LDR" },
        position: { x: 475, y: 125 },
      },
      {
        id: "5",
        type: "output",
        data: { label: "Halidom" },
        position: { x: 175, y: 250 },
      },
      {
        id: "6",
        type: "input",
        data: { label: "LED Strip" },
        position: { x: 375, y: 25 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "5", animated: true },
      { id: "e3-4", source: "3", target: "5", animated: true },
      { id: "e6-4", source: "6", target: "4" },
      { id: "e4-3", source: "4", target: "3" },
    ],
  };
}

export function TestbedCanvas() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);

  const addNode = (type: string, label: string) => {
    const newNode: FlowNode = {
      id: `${nodes.length + 1}`,
      type,
      data: { label },
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="h-[200px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search nodes..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Available Nodes">
              {sampleNodes.map((node) => (
                <CommandItem
                  key={`${node.type}-${node.label}`}
                  onSelect={() => addNode(node.type, node.label)}
                >
                  {node.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div className="flex-1 min-h-0 border rounded-lg bg-background" style={{ height: 'calc(100vh - 400px)' }}>
        <Canvas initialNodes={nodes} initialEdges={edges} />
      </div>
    </div>
  );
}
