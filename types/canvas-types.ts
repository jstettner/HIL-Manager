import { ReactNode } from "react";
import { Node, Edge } from "@xyflow/react";

export interface BaseNodeData extends Record<string, unknown> {
  label: string | ReactNode;
  description?: string;
  condition?: string;
  [key: string]: unknown;
}

export interface FlowData<T extends Record<string, unknown> = BaseNodeData> {
  nodes: Node<T>[];
  edges: Edge[];
}

export type NodeType = {
  type: string;
  label: string;
  description?: string;
};

export type NodeGroups = {
  [key: string]: NodeType[];
};

export interface CanvasProps<T extends Record<string, unknown> = BaseNodeData> {
  nodes: Node<T>[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  canvasKey?: number;
  nodeTypes: Record<string, React.ComponentType<any>>;
  comingSoonText: ReactNode;
}
