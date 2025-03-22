import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <LifeBuoy className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Support</h1>
      </div>
      <div className="grid gap-4">
        {/* Add support content here */}
        <p>Get help and support for Halidom</p>
      </div>
    </div>
  );
}
