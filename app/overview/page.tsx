import { LayoutDashboard } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Overview</h1>
      </div>
      <div className="grid gap-4">
        {/* Add overview content here */}
        <p>Welcome to the Halidom Dashboard Overview</p>
      </div>
    </div>
  )
}
