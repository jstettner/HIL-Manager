import { BedDouble } from "lucide-react"

export default function TestbedsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BedDouble className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Testbeds</h1>
      </div>
      <div className="grid gap-4">
        {/* Add testbeds content here */}
        <p>Configure and monitor your testbeds</p>
      </div>
    </div>
  )
}
