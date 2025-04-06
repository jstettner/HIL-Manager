import { Library } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import { TestcasesTable } from "@/app/(protected)/testcases/testcases-table";

export default function TestcasesPage() {
  return (
    <div className="p-6">
      <div className="flex flex-row items-center gap-2 mb-6 page-header">
        <Library className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Test Library</h1>
          <h3 className="text-xl text-muted-foreground">Your Go-To Tests</h3>
        </div>
      </div>

      <TestcasesTable />

      <TipsFooter />
    </div>
  );
}
