import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "../types";

type InputNodeProps = {
  data: CustomNode["data"];
};

export const InputNode = memo(({ data }: InputNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-gray-400 bg-gray-400/10 dark:bg-gray-400/20 dark:border-gray-400">
      <Handle type="source" position={Position.Bottom} />
      <div className="font-medium text-sm">{data.label}</div>
    </div>
  );
});

InputNode.displayName = "InputNode";
