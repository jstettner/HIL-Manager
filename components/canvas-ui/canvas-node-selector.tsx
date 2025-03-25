"use client";

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { NodeGroups, NodeType } from "@/types/canvas-types";

interface CanvasNodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: NodeGroups | NodeType[];
  onSelectNode: (type: string, label: string) => void;
}

export function CanvasNodeSelector({
  open,
  onOpenChange,
  nodes,
  onSelectNode,
}: CanvasNodeSelectorProps) {
  const isGrouped = !Array.isArray(nodes);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search nodes..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {isGrouped ? (
            Object.entries(nodes as NodeGroups).map(
              ([groupName, groupNodes]) => (
                <CommandGroup key={groupName} heading={groupName}>
                  {groupNodes.map((node) => (
                    <CommandItem
                      key={`${node.type}-${node.label}`}
                      onSelect={() => {
                        onSelectNode(node.type, node.label);
                        onOpenChange(false);
                      }}
                    >
                      {node.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ),
            )
          ) : (
            <CommandGroup heading="Available Nodes">
              {(nodes as NodeType[]).map((node) => (
                <CommandItem
                  key={`${node.type}-${node.label}`}
                  onSelect={() => {
                    onSelectNode(node.type, node.label);
                    onOpenChange(false);
                  }}
                >
                  {node.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
