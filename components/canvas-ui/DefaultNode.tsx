import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "./types";

type DefaultNodeProps = {
  data: CustomNode["data"];
};

export const DefaultNode = memo(({ data }: DefaultNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-[#137ADC] bg-[#137ADC]/10 dark:bg-[#137ADC]/20 dark:border-[#137ADC]">
      <Handle type="target" position={Position.Top} />
      <div className="font-medium text-sm">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

DefaultNode.displayName = "DefaultNode";
