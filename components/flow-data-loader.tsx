// This is a server component
import { FlowNode, FlowEdge } from "./canvas";
import { Canvas } from "./canvas";

interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

async function fetchFlowData(): Promise<FlowData> {
  // In a real implementation, this would fetch from an API or database
  // For demonstration, we're returning mock data
  return {
    nodes: [
      {
        id: "1",
        type: "input",
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
}

export async function FlowDataLoader() {
  // Fetch the flow data
  const flowData = await fetchFlowData();

  // Pass the data to the client component
  return <Canvas initialNodes={flowData.nodes} initialEdges={flowData.edges} />;
}
