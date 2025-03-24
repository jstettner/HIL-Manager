import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { CustomNode } from "../types";

type InputNodeProps = {
  data: CustomNode["data"];
};

export const InputNode = memo(({ data }: InputNodeProps) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-[#47BAFE] bg-[#47BAFE]/10 dark:bg-[#47BAFE]/20 dark:border-[#47BAFE]">
      <Handle type="source" position={Position.Bottom} />
      <div className="font-medium text-sm">{data.label}</div>
    </div>
  );
});

InputNode.displayName = "InputNode";
