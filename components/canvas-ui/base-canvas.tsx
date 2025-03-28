"use client";

import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import { CanvasProps, BaseNodeData } from "@/types/canvas-types";
import { Button } from "@/components/ui/button";
import "@xyflow/react/dist/style.css";
import { useState } from "react";

export function BaseCanvas<T extends BaseNodeData>({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  canvasKey,
  nodeTypes,
}: CanvasProps<T>) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="w-full h-full relative">
      <div className={`w-full h-full ${!isPreview ? "filter blur-lg" : ""}`}>
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
      {!isPreview && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4 font-dotgothic">
            Coming Soon to Halidom
          </h2>
          <Button
            onClick={() => setIsPreview(true)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            variant="outline"
          >
            Sneak Peak
          </Button>
        </div>
      )}
    </div>
  );
}
