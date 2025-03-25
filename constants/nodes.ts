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
      type: "output",
      data: {
        label: "Halidom Brain",
      },
      position: {
        x: -242.36319125693964,
        y: 513.2095018339729,
      },
      measured: {
        width: 150,
        height: 58,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "2",
      type: "input",
      data: {
        label: "Halidom Actor",
      },
      position: {
        x: -87.86204795497731,
        y: -119.93186549871486,
      },
      measured: {
        width: 150,
        height: 82,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "3",
      type: "default",
      data: {
        label: "Quantum Stabilizer Rails",
      },
      position: {
        x: 196.7942765183074,
        y: 88.92414254051322,
      },
      measured: {
        width: 150,
        height: 102,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "4",
      type: "default",
      data: {
        label: "Glove-Based Gesture Simulator",
      },
      position: {
        x: -144.22560497086116,
        y: 6.816913110984373,
      },
      measured: {
        width: 150,
        height: 102,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "5",
      type: "default",
      data: {
        label: "Seatbelt Buckle Simulator",
      },
      position: {
        x: -308.302817441619,
        y: -8.035611979893112,
      },
      measured: {
        width: 150,
        height: 102,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "6",
      type: "default",
      data: {
        label: "Analog Time Targeter",
      },
      position: {
        x: 15.226153720850348,
        y: 29.848574495623765,
      },
      measured: {
        width: 150,
        height: 82,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "7",
      type: "default",
      data: {
        label: "Statis Chamber",
      },
      position: {
        x: -272.94935671764705,
        y: 154.98243943431052,
      },
      measured: {
        width: 150,
        height: 82,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "8",
      type: "default",
      data: {
        label: "Time Sensor",
      },
      position: {
        x: -57.31921709202795,
        y: 134.9031733075299,
      },
      measured: {
        width: 150,
        height: 62,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "9",
      type: "default",
      data: {
        label: "Anti-Matter Stabilizer",
      },
      position: {
        x: -7.30625059804354,
        y: 219.38512810657085,
      },
      measured: {
        width: 150,
        height: 82,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "10",
      type: "default",
      data: {
        label: "Spacetime Navigation Module",
      },
      position: {
        x: -316.91312089451645,
        y: 315.50986660200454,
      },
      measured: {
        width: 150,
        height: 102,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "11",
      type: "default",
      data: {
        label: "Flux Capacitor v2.0",
      },
      position: {
        x: -113.17704461177473,
        y: 354.89656954655584,
      },
      measured: {
        width: 150,
        height: 102,
      },
      selected: false,
      dragging: false,
    },
    {
      id: "12",
      type: "input",
      data: {
        label: "Halidom Actor",
      },
      position: {
        x: -485.7551025471847,
        y: 181.08993594969652,
      },
      measured: {
        width: 150,
        height: 82,
      },
      selected: false,
      dragging: false,
    },
  ],
  edges: [
    {
      source: "2",
      target: "3",
      id: "xy-edge__2-3",
    },
    {
      source: "2",
      target: "4",
      id: "xy-edge__2-4",
    },
    {
      source: "2",
      target: "5",
      id: "xy-edge__2-5",
    },
    {
      source: "2",
      target: "6",
      id: "xy-edge__2-6",
    },
    {
      source: "5",
      target: "7",
      id: "xy-edge__5-7",
    },
    {
      source: "4",
      target: "7",
      id: "xy-edge__4-7",
    },
    {
      source: "6",
      target: "8",
      id: "xy-edge__6-8",
    },
    {
      source: "8",
      target: "7",
      id: "xy-edge__8-7",
    },
    {
      source: "3",
      target: "9",
      id: "xy-edge__3-9",
    },
    {
      source: "12",
      target: "10",
      id: "xy-edge__12-10",
    },
    {
      source: "8",
      target: "10",
      id: "xy-edge__8-10",
    },
    {
      source: "10",
      target: "11",
      id: "xy-edge__10-11",
    },
    {
      source: "7",
      target: "10",
      id: "xy-edge__7-10",
    },
    {
      source: "7",
      target: "11",
      id: "xy-edge__7-11",
    },
    {
      source: "9",
      target: "11",
      id: "xy-edge__9-11",
    },
    {
      source: "10",
      target: "1",
      id: "xy-edge__10-1",
    },
    {
      source: "11",
      target: "1",
      id: "xy-edge__11-1",
    },
  ],
};
