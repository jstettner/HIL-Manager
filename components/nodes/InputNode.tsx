import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "./types";

type InputNodeProps = {
  data: CustomNode["data"];
};

export const InputNode = memo(({ data }: InputNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-700">
      <Handle type="source" position={Position.Bottom} />
      <div className="font-medium text-sm">{data.label}</div>
    </div>
  );
});

InputNode.displayName = "InputNode";
