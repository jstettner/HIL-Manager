import { Library } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import { testCases } from "@/data/sample-data";
import { TestcasesTable } from "@/components/testcases/testcases-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function TestcasesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams?.page === "string" ? parseInt(searchParams.page) : 1;
  const itemsPerPage = 10;
  const totalItems = testCases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/testcases?page=${i}`} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
  };

  return (
    <div className="p-6">
      <div className="flex flex-row items-center gap-2 mb-6 page-header">
        <Library className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Test Library</h1>
          <h3 className="text-xl text-muted-foreground">Your Go-To Tests</h3>
        </div>
      </div>
      <TestcasesTable page={page} itemsPerPage={itemsPerPage} />

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? `/testcases?page=${page - 1}` : "#"}
              />
            </PaginationItem>

            {generatePaginationItems()}

            <PaginationItem>
              <PaginationNext
                href={page < totalPages ? `/testcases?page=${page + 1}` : "#"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <TipsFooter />
    </div>
  );
}
