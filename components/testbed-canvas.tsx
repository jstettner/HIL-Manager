"use client";

import { useCallback, useEffect, useState } from "react";
import { Canvas } from "@/components/canvas-ui/canvas";
import type { ReactNode } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { LucideCommand, PlusCircle, ScanEye, Save, Unplug } from "lucide-react";

type NodeData = { label: string | ReactNode };
import {
  Command,
  CommandDialog,
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
  nodes: Node<NodeData>[];
  edges: Edge[];
}

async function fetchTestbedConfigurationFlows(): Promise<FlowData> {
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
        data: {
          label: (
            <span>
              Hal<span className="ml-[-0.17em]">i</span>dom
            </span>
          ),
        },
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
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [open, setOpen] = useState(false);
  const [canvasKey, setCanvasKey] = useState(Date.now());

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      const flowData = await fetchTestbedConfigurationFlows();
      setNodes(flowData.nodes);
      setEdges(flowData.edges);
    };
    loadInitialData();
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = (type: string, label: string) => {
    const newNode: Node<NodeData> = {
      id: `${nodes.length + 1}`,
      type,
      data: { label },
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
    };
    setNodes([...nodes, newNode]);
    setCanvasKey(Date.now());
  };

  return (
    <div className="flex flex-col gap-4 h-full bg-gray">
      <div className="flex flex-row justify-between items-baseline">
        <div className="flex flex-row items-baseline gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            <div className="flex flex-row items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Add Node</span>
              <span className="text-muted-foreground flex flex-row items-center ml-2">
                (<LucideCommand className="h-2 w-2 mr-[0.2rem]" />+ k)
              </span>
            </div>
          </Button>
          <h1 className="text-lg">
            Untitled <span className="text-muted-foreground">(unsaved)</span>
          </h1>
        </div>
        <div className="flex flex-row items-baseline gap-2">
          <Button variant="outline" size="sm">
            <div className="flex flex-row items-center">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </div>
          </Button>
          <Button variant="outline" size="sm">
            <div className="flex flex-row items-center">
              <Unplug className="mr-2 h-4 w-4" />
              Register Component
            </div>
          </Button>
          <Button
            className="ml-2 relative text-xs font-medium text-white rounded-md transition-all overflow-hidden hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20 bg-black/80 mix-blend-screen"
            variant="outline"
            size="sm"
            style={{
              backgroundImage: `url('/images/button-alt.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              // TODO: Implement register testbed
            }}
          >
            <div className="flex flex-row items-center text-black">
              <ScanEye className="mr-2 h-4 w-4" />
              <span>Register Testbed</span>
            </div>
          </Button>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search nodes..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Available Nodes">
              {sampleNodes.map((node) => (
                <CommandItem
                  key={`${node.type}-${node.label}`}
                  onSelect={() => {
                    addNode(node.type, node.label);
                    setOpen(false);
                  }}
                >
                  {node.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
      <div
        className="flex-1 min-h-0 border rounded-lg bg-background"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <Canvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          canvasKey={canvasKey}
        />
      </div>
    </div>
  );
}
