import { Library } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import {
  TestcasesTable,
  TestcasesTableLoading,
} from "@/app/dashboard/testcases/testcases-table";
import { Suspense } from "react";
import PageHeader from "@/components/page-header";

export default function TestcasesPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  return (
    <div className="p-6">
      <PageHeader
        title="Test Library"
        description="Your Go-To Tests"
        icon={<Library className="w-6 h-6" />}
      />

      <Suspense fallback={<TestcasesTableLoading />}>
        <TestcasesTable searchParams={searchParams} />
      </Suspense>

      <TipsFooter />
    </div>
  );
}
