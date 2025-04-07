"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import { testCases as sampleTestCases } from "@/data/sample-data";

// Mock API fetch function
const fetchTestCases = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sampleTestCases;
};

export function TestcasesTable() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [testCases, setTestCases] = useState<typeof sampleTestCases>([]);

  useEffect(() => {
    const loadTestCases = async () => {
      setLoading(true);
      const data = await fetchTestCases();
      setTestCases(data);
      setLoading(false);
    };
    loadTestCases();
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestCases = testCases.slice(startIndex, endIndex);

  const totalItems = testCases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
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
              ))
            : currentTestCases.map((testCase) => (
                <TestCaseDialog key={testCase.id} testCase={testCase} />
              ))}
        </TableBody>
      </Table>

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
    </div>
  );
}
