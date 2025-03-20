import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <div className="grid gap-4">
        {/* Add settings content here */}
        <p>Configure your Halidom dashboard settings</p>
      </div>
    </div>
  )
}
