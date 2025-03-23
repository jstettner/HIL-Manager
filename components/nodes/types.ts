import { Node } from "@xyflow/react";

export interface NodeData {
  label: React.ReactNode;
  [key: string]: unknown;
}

export type FlowNode = Node<NodeData>;

export type CustomNode = {
  data: NodeData;
} & Node<NodeData>;
