import { ReactNode } from "react";
import { Node, Edge } from "@xyflow/react";

export type NodeData = {
  label: string | ReactNode;
  description?: string;
  condition?: string;
};

export interface FlowData {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export const SAMPLE_NODES = [
  { type: "start", label: "Begin Test" },
  { type: "input", label: "Time Input" },
  {
    type: "step",
    label: "Initialize System",
    description: "Set up test environment",
  },
  { type: "step", label: "Run Calibration", description: "Calibrate sensors" },
  {
    type: "conditional",
    label: "Check Status",
    condition: "All sensors ready?",
  },
  {
    type: "input",
    label: "Gesture Input",
  },
  {
    type: "step",
    label: "Execute Test Sequence",
    description: "Run main test procedure",
  },
  { type: "end", label: "Complete Test" },
];

export const SAMPLE_FLOW_DATA: FlowData = {
  nodes: [
    {
      id: "1",
      type: "start",
      data: {
        label: "Start",
      },
      position: {
        x: 250,
        y: 25,
      },
      measured: {
        width: 150,
        height: 62,
      },
    },
    {
      id: "2",
      type: "step",
      data: {
        label: "Power Up",
        description: "Initialize system power sequence",
      },
      position: {
        x: 250,
        y: 125,
      },
      measured: {
        width: 150,
        height: 62,
      },
    },
    {
      id: "3",
      type: "step",
      data: {
        label: "Perform Gesture Input",
        description: "Destination: July 4, 1776 – Philadelphia",
      },
      position: {
        x: 250,
        y: 225,
      },
      measured: {
        width: 150,
        height: 82,
      },
    },
    {
      id: "4",
      type: "step",
      data: {
        label: "Validate Input Propagation",
        description: "Verify gesture input signals",
      },
      position: {
        x: 250,
        y: 325,
      },
      measured: {
        width: 150,
        height: 82,
      },
    },
    {
      id: "5",
      type: "step",
      data: {
        label: "Monitor Core Activation",
        description: "Track core power levels and stability",
      },
      position: {
        x: 250,
        y: 425,
      },
      measured: {
        width: 150,
        height: 82,
      },
    },
    {
      id: "6",
      type: "step",
      data: {
        label: "GPIO Controller Signal Confirmation",
        description: "Verify all GPIO signals are within expected ranges",
      },
      position: {
        x: 250,
        y: 525,
      },
      measured: {
        width: 150,
        height: 122,
      },
    },
    {
      id: "7",
      type: "end",
      data: {
        label: "End",
      },
      position: {
        x: 250,
        y: 665,
      },
      measured: {
        width: 150,
        height: 58,
      },
    },
    {
      id: "8",
      type: "input",
      data: {
        label: '"Destination: July 4, 1776 – Philadelphia"',
      },
      position: {
        x: 437,
        y: 70,
      },
      measured: {
        width: 150,
        height: 62,
      },
      selected: true,
      dragging: false,
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
    },
    {
      id: "e5-6",
      source: "5",
      target: "6",
    },
    {
      id: "e6-7",
      source: "6",
      target: "7",
      animated: true,
    },
    {
      source: "8",
      target: "3",
      id: "xy-edge__8-3",
    },
  ],
};
