"use client";

import { ServerCog, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseCanvas } from "@/components/canvas-ui/base-canvas";
import { CanvasToolbar } from "@/components/canvas-ui/canvas-toolbar";
import { CanvasNodeSelector } from "@/components/canvas-ui/canvas-node-selector";
import { StartNode } from "@/components/canvas-ui/testcase-nodes/StartNode";
import { StepNode } from "@/components/canvas-ui/testcase-nodes/StepNode";
import { EndNode } from "@/components/canvas-ui/testcase-nodes/EndNode";
import { ConditionalNode } from "@/components/canvas-ui/testcase-nodes/ConditionalNode";
import { InputNode } from "@/components/canvas-ui/testcase-nodes/InputNode";
import { useCanvas } from "@/hooks/useCanvas";
import { SAMPLE_NODES, SAMPLE_FLOW_DATA } from "@/constants/testcase-nodes";

const testcaseNodeTypes = {
  start: StartNode,
  step: StepNode,
  conditional: ConditionalNode,
  end: EndNode,
  input: InputNode,
};

export function TestcaseCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    canvasKey,
    commandOpen,
    setCommandOpen,
    addNode,
  } = useCanvas({
    initialData: SAMPLE_FLOW_DATA,
  });

  const toolbarActions = (
    <>
      <Button variant="outline" size="sm">
        <div className="flex flex-row items-center">
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </div>
      </Button>
      <Button
        className="ml-2 relative text-xs font-medium text-white rounded-md transition-all overflow-hidden hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20 bg-black/80 mix-blend-screen"
        variant="outline"
        size="sm"
        style={{
          backgroundImage: `url('/images/button-alt.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          console.log(nodes);
          console.log(edges);
        }}
      >
        <div className="flex flex-row items-center text-black">
          <ServerCog className="mr-2 h-4 w-4" />
          <span>Register Testcase</span>
        </div>
      </Button>
    </>
  );

  return (
    <div className="flex flex-col gap-4 h-full bg-gray">
      <CanvasToolbar
        title="Test Monitor Core"
        onAddNode={() => setCommandOpen(true)}
        actions={toolbarActions}
      />
      <CanvasNodeSelector
        open={commandOpen}
        onOpenChange={setCommandOpen}
        nodes={SAMPLE_NODES}
        onSelectNode={(type, label) => addNode(type, { label })}
      />
      <div
        className="flex-1 min-h-0 border rounded-lg bg-background overflow-hidden"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <BaseCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          canvasKey={canvasKey}
          nodeTypes={testcaseNodeTypes}
          comingSoonText={
            <span>
              The Testcase Lab is currently in development. The recommended way
              to build testcases is to use the
              <a
                href="/docs"
                className="whitespace-nowrap text-blue-400 hover:underline pl-1.5"
              >
                Halidom Python framework
              </a>
              .
            </span>
          }
        />
      </div>
    </div>
  );
}
