"use client";

import { useCallback, useState, useEffect } from "react";
import { useNodesState, useEdgesState, addEdge, Connection, Edge, Node } from "@xyflow/react";
import { BaseNodeData, FlowData } from "@/types/canvas-types";

interface UseCanvasOptions<T extends BaseNodeData> {
  initialData?: FlowData<T>;
  onDataChange?: (data: FlowData<T>) => void;
}

export function useCanvas<T extends BaseNodeData>({ initialData, onDataChange }: UseCanvasOptions<T> = {}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<T>>(initialData?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialData?.edges || []);
  const [canvasKey, setCanvasKey] = useState(Date.now());
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = useCallback((type: string, data: Partial<T>) => {
    const newNode: Node<T> = {
      id: `${nodes.length + 1}`,
      type,
      data: data as T,
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
    };
    setNodes([...nodes, newNode]);
    setCanvasKey(Date.now());
  }, [nodes, setNodes]);

  useEffect(() => {
    onDataChange?.({ nodes, edges });
  }, [nodes, edges, onDataChange]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    canvasKey,
    commandOpen,
    setCommandOpen,
    addNode,
  };
}
