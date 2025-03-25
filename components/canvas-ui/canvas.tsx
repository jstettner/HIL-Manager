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
import { InputNode } from "./testbed-nodes/InputNode";
import { DefaultNode } from "./testbed-nodes/DefaultNode";
import { OutputNode } from "./testbed-nodes/OutputNode";

const defaultNodeTypes = {
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
  canvasKey: number;
  nodeTypes?: { [key: string]: React.ComponentType<any> };
}

export function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  canvasKey,
  nodeTypes,
}: CanvasProps) {
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes || defaultNodeTypes}
        className="flow-canvas"
        colorMode="dark"
        key={canvasKey}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Cross} gap={48} size={2} />
      </ReactFlow>
    </div>
  );
}
