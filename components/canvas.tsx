"use client";
import React, { useCallback } from "react";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Command } from "@/components/ui/command";

// Import custom node components
import { InputNode } from "./nodes/InputNode";
import { DefaultNode } from "./nodes/DefaultNode";
import { OutputNode } from "./nodes/OutputNode";

const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

export type FlowNode = Node<{ label: string | React.ReactNode }>;
export type FlowEdge = Edge;

interface CanvasProps {
  initialNodes?: FlowNode[];
  initialEdges?: FlowEdge[];
}

const defaultInitialNodes: FlowNode[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const defaultInitialEdges: FlowEdge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export function Canvas({
  initialNodes = defaultInitialNodes,
  initialEdges = defaultInitialEdges,
}: CanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        className="flow-canvas"
        colorMode="dark"
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Cross} gap={48} size={2} />
      </ReactFlow>
    </div>
  );
}
