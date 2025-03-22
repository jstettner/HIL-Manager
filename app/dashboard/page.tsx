import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="grid gap-4">
        {/* Add dashboard content here */}
        <p>Welcome to the Halidom Dashboard</p>
      </div>
    </div>
  );
}
