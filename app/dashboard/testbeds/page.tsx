import { GalleryVerticalEnd } from "lucide-react";
import { TestbedsGrid } from "@/app/dashboard/testbeds/testbeds-grid";
import PageHeader from "@/components/page-header";

export default function TestbedsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Armory"
        description="Your Collection of Test Environments"
        icon={<GalleryVerticalEnd className="w-6 h-6" />}
      />
      <TestbedsGrid />
    </div>
  );
}
