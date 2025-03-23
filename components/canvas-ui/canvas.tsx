"use client";
import React from "react";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// Import custom node components
import { InputNode } from "./InputNode";
import { DefaultNode } from "./DefaultNode";
import { OutputNode } from "./OutputNode";

const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

export type FlowNode = Node<{ label: string | React.ReactNode }>;
export type FlowEdge = Edge;

interface CanvasProps {
  nodes: Node<{ label: string | React.ReactNode }>[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: Connection | Edge) => void;
}

export function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: CanvasProps) {
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
