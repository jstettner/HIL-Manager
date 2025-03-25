import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "../types";

type PeripheralNodeProps = {
  data: CustomNode["data"];
};

export const PeripheralNode = memo(({ data }: PeripheralNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-[#FBC1FA] bg-[#FBC1FA]/10 dark:bg-[#FBC1FA]/20 dark:border-[#FBC1FA]">
      <Handle type="target" position={Position.Top} />
      <div className="font-medium text-sm">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

PeripheralNode.displayName = "PeripheralNode";
