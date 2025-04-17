import { Library } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import { TestcasesTable } from "@/app/dashboard/testcases/testcases-table";
import { Suspense } from "react";
import PageHeader from "@/components/page-header";

export default function TestcasesPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Test Library"
        description="Your Go-To Tests"
        icon={<Library className="w-6 h-6" />}
      />

      <Suspense>
        <TestcasesTable />
      </Suspense>

      <TipsFooter />
    </div>
  );
}
