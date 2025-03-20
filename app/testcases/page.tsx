import { FlaskConical } from "lucide-react"

export default function TestcasesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FlaskConical className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Testcases</h1>
      </div>
      <div className="grid gap-4">
        {/* Add testcases content here */}
        <p>Manage and view your testcases</p>
      </div>
    </div>
  )
}
