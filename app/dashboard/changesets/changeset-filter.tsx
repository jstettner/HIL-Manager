"use client";

import QuerySwitch from "@/components/query-switch";

export function ChangesetFilter() {
  return (
    <div className="flex flex-row mr-4">
      <div className="flex flex-row items-center pr-4">
        <label htmlFor="status" className="text-sm font-medium mr-2">
          Failed
        </label>
        <QuerySwitch queryKey="failed" defaultChecked={false} />
      </div>
      <div className="flex flex-row pl-4 items-center border-l border-white">
        <label htmlFor="status" className="text-sm font-medium mr-2">
          Running
        </label>
        <QuerySwitch queryKey="running" defaultChecked={false} />
      </div>
    </div>
  );
}
