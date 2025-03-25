import { ReactNode } from "react";
import { Node, Edge } from "@xyflow/react";

export type NodeData = { label: string | ReactNode };

export type NodeType = {
  type: string;
  label: string;
};

export type NodeGroups = {
  [key: string]: NodeType[];
};

export const SAMPLE_NODE_TYPES: NodeGroups = {
  Halidom: [
    { type: "input", label: "Halidom Actor" },
    { type: "output", label: "Halidom Brain" },
  ],
  Peripheral: [
    { type: "default", label: "Quantum Stabilizer Rails" },
    { type: "default", label: "Glove-Based Gesture Simulator" },
    { type: "default", label: "Compute Node" },
    { type: "default", label: "Analog Time Targeter" },
    { type: "default", label: "Seatbelt Buckle Simulator" },
    { type: "default", label: "Event Horizon Projector" },
  ],
  "DUT Custom Components": [
    { type: "default", label: "Time Sensor" },
    { type: "default", label: "Statis Chamber" },
    { type: "default", label: "Anti-Matter Stabilizer" },
    { type: "default", label: "Spacetime Navigation Module" },
    { type: "default", label: "Flux Capacitor v2.0" },
    { type: "default", label: "Tachyon Energy Cell" },
    { type: "default", label: "Quantum Fusion Core" },
  ],
  "DUT Base Components": [
    { type: "default", label: "ARM Cortex" },
    { type: "default", label: "RISC-V cores" },
    { type: "default", label: "SRAM" },
    { type: "default", label: "DRAM controller" },
    { type: "default", label: "USB Controller" },
    { type: "default", label: "GPIO Controller" },
    { type: "default", label: "Power Supply" },
    { type: "default", label: "Wi-Fi" },
    { type: "default", label: "Bluetooth" },
    { type: "default", label: "JTAG Interface" },
  ],
};

export interface FlowData {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export const SAMPLE_FLOW_DATA: FlowData = {
  nodes: [
    {
      id: "1",
      type: "default",
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
      data: { label: "Halidom" },
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
