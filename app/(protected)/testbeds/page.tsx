import { GalleryVerticalEnd } from "lucide-react";
import { TestbedsGrid } from "@/app/(protected)/testbeds/testbeds-grid";

export default function TestbedsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <GalleryVerticalEnd className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Armory</h1>
          <h3 className="text-xl text-muted-foreground">
            Your Collection of Test Environments
          </h3>
        </div>
      </div>
      <TestbedsGrid />
    </div>
  );
}
