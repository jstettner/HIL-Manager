import { FlaskConical } from "lucide-react";
import { testCases } from "@/data/sample-data";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TestcasesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchParamsObj = await searchParams;
  const page =
    typeof searchParamsObj?.page === "string"
      ? parseInt(searchParamsObj.page)
      : 1;
  const itemsPerPage = 10;
  const totalItems = testCases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestCases = testCases.slice(startIndex, endIndex);

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
        <FlaskConical className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Test Library</h1>
          <h3 className="text-xl text-muted-foreground">Your Go-To Tests</h3>
        </div>
      </div>
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
          {currentTestCases.map((testCase) => (
            <TableRow key={testCase.id} className="border-b">
              <TableCell className="p-3">{testCase.name}</TableCell>
              <TableCell className="p-3 text-muted-foreground">
                {testCase.description}
              </TableCell>
              <TableCell className="p-3 text-muted-foreground">
                {new Date(testCase.lastRun).toLocaleString()}
              </TableCell>
              <TableCell className="p-3 text-muted-foreground">
                {testCase.duration}s
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </div>
  );
}
