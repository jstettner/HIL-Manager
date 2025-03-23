import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "./types";

type OutputNodeProps = {
  data: CustomNode["data"];
};

export const OutputNode = memo(({ data }: OutputNodeProps) => {
  return (
    <div
      className="px-4 py-2 rounded-md"
      style={{
        backgroundImage: "url(/images/banner-med-grad.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="font-medium text-sm">{data.label}</div>
    </div>
  );
});

OutputNode.displayName = "OutputNode";
