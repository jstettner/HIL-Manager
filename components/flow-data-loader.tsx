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
        data: { label: "API Gateway" },
        position: { x: 250, y: 25 },
      },
      {
        id: "2",
        type: "default",
        data: { label: "Process Data" },
        position: { x: 100, y: 125 },
      },
      {
        id: "3",
        type: "default",
        data: { label: "Transform" },
        position: { x: 250, y: 125 },
      },
      {
        id: "4",
        type: "output",
        data: { label: "Database" },
        position: { x: 200, y: 250 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e2-4", source: "2", target: "4" },
      { id: "e3-4", source: "3", target: "4", animated: true },
    ],
  };
}

export async function FlowDataLoader() {
  // Fetch the flow data
  const flowData = await fetchFlowData();

  // Pass the data to the client component
  return <Canvas initialNodes={flowData.nodes} initialEdges={flowData.edges} />;
}
