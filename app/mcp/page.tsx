import { Split } from "lucide-react";

export default function McpPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Split className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">MCP</h1>
      </div>
      <div className="grid gap-4">
        {/* Add MCP content here */}
        <p>Monitor and control your MCP settings</p>
      </div>
    </div>
  );
}
