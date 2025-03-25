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
import { LucideCommand, PlusCircle, ServerCog, Save } from "lucide-react";
import { StartNode } from "@/components/canvas-ui/testcase-nodes/StartNode";
import { StepNode } from "@/components/canvas-ui/testcase-nodes/StepNode";
import { EndNode } from "@/components/canvas-ui/testcase-nodes/EndNode";
import { ConditionalNode } from "@/components/canvas-ui/testcase-nodes/ConditionalNode";
import { InputNode } from "@/components/canvas-ui/testcase-nodes/InputNode";

import {
  NodeData,
  FlowData,
  SAMPLE_NODES,
  SAMPLE_FLOW_DATA,
} from "@/constants/testcase-nodes";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

async function fetchTestcaseFlows(): Promise<FlowData> {
  // In a real implementation, this would fetch from an API or database
  // For demonstration, we're returning mock data
  return SAMPLE_FLOW_DATA;
}

export function TestcaseCanvas() {
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
      const flowData = await fetchTestcaseFlows();
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
            Test Monitor Core{" "}
            <span className="text-muted-foreground">(saved)</span>
          </h1>
        </div>
        <div className="flex flex-row items-baseline gap-2">
          <Button variant="outline" size="sm">
            <div className="flex flex-row items-center">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
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
              // TODO: Implement register testcase
              console.log(nodes);
              console.log(edges);
            }}
          >
            <div className="flex flex-row items-center text-black">
              <ServerCog className="mr-2 h-4 w-4" />
              <span>Register Testcase</span>
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
              {SAMPLE_NODES.map((node: { type: string; label: string }) => (
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
          nodeTypes={{
            start: StartNode,
            step: StepNode,
            conditional: ConditionalNode,
            end: EndNode,
            input: InputNode,
          }}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          canvasKey={canvasKey}
        />
      </div>
    </div>
  );
}
