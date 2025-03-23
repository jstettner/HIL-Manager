import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "./types";

type OutputNodeProps = {
  data: CustomNode["data"];
};

export const OutputNode = memo(({ data }: OutputNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700">
      <Handle type="target" position={Position.Top} />
      <div className="font-medium text-sm">{data.label}</div>
    </div>
  );
});

OutputNode.displayName = "OutputNode";
