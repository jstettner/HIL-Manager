"use client";

import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import { CanvasProps, BaseNodeData } from "@/types/canvas-types";
import "@xyflow/react/dist/style.css";

export function BaseCanvas<T extends BaseNodeData>({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  canvasKey,
  nodeTypes,
}: CanvasProps<T>) {
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
