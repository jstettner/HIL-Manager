import { Skeleton } from "@/components/ui/skeleton";
import { TestCaseDialog } from "@/app/dashboard/testcases/test-case-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TestCase } from "@/types";
import {
  getTestcases,
  getCurrentUserOrganization,
} from "@/utils/supabase/schema";
import { TestcaseDetails } from "@/utils/supabase/types";
import { redirect } from "next/navigation";

export function TestcasesTableLoading() {
  const itemsPerPage = 10;

  return (
    <div className="space-y-4">
      <Table className="rounded-md">
        <TableCaption className="sr-only">Testcases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-3 text-left">Name</TableHead>
            <TableHead className="p-3 text-left">Description</TableHead>
            <TableHead className="p-3 text-left">Last Run</TableHead>
            <TableHead className="p-3 text-left">Average Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <TableRow key={index}>
              <td className="p-3">
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td className="p-3">
                <Skeleton className="h-4 w-[300px]" />
              </td>
              <td className="p-3">
                <Skeleton className="h-4 w-[150px]" />
              </td>
              <td className="p-3">
                <Skeleton className="h-4 w-[100px]" />
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Adapter function to transform Supabase data to match the UI expected format
function adaptTestCases(testcasesData: TestcaseDetails[]): TestCase[] {
  return testcasesData.map((testcase) => ({
    id: testcase.id || "",
    name: testcase.name || "",
    description: testcase.description || "",
    duration: testcase.duration || 0,
    lastRun: testcase.last_run,
    priority: (testcase.priority as "low" | "medium" | "high") || "medium",
    compatibleTestbeds: testcase.environment_ids || [],
  }));
}

export async function TestcasesTable({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const itemsPerPage = 10;

  // Get the current user's organization
  let orgId: string;
  try {
    const currentOrg = await getCurrentUserOrganization();
    if (!currentOrg?.organization_id) {
      console.error("No organization found for current user");
      redirect("/sign-in");
    }
    orgId = currentOrg.organization_id;
  } catch (error) {
    console.error("Error fetching user organization:", error);
    redirect("/sign-in");
  }

  // Get testcases from Supabase
  let testcasesData;
  try {
    testcasesData = await getTestcases(orgId);
  } catch (error) {
    console.error("Error fetching testcases:", error);
    redirect("/sign-in");
  }

  // Convert to the format expected by our UI
  const testCases = adaptTestCases(testcasesData);

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestCases = testCases.slice(startIndex, endIndex);
  const totalPages = Math.ceil(testCases.length / itemsPerPage);

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/dashboard/testcases?page=${i}`}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
  };

  return (
    <div className="space-y-4">
      <Table className="rounded-md">
        <TableCaption className="sr-only">Testcases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-3 text-left">Name</TableHead>
            <TableHead className="p-3 text-left">Description</TableHead>
            <TableHead className="p-3 text-left">Last Run</TableHead>
            <TableHead className="p-3 text-left">Average Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTestCases.length === 0 ? (
            <TableRow>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">
                No test cases found
              </td>
            </TableRow>
          ) : (
            currentTestCases.map((testCase) => (
              <TestCaseDialog key={testCase.id} testCase={testCase} />
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? `/dashboard/testcases?page=${page - 1}` : "#"}
              />
            </PaginationItem>

            {generatePaginationItems()}

            <PaginationItem>
              <PaginationNext
                href={
                  page < totalPages
                    ? `/dashboard/testcases?page=${page + 1}`
                    : "#"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
