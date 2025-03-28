'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TestCaseDialog } from '@/components/test-case-dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { testCases as sampleTestCases } from '@/data/sample-data';

// Mock API fetch function
const fetchTestCases = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sampleTestCases;
};

interface TestcasesTableProps {
  page: number;
  itemsPerPage: number;
}

export function TestcasesTable({ page, itemsPerPage }: TestcasesTableProps) {
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

  return (
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
        {loading ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <TableRow key={index}>
              <td className="p-3"><Skeleton className="h-4 w-[250px]" /></td>
              <td className="p-3"><Skeleton className="h-4 w-[300px]" /></td>
              <td className="p-3"><Skeleton className="h-4 w-[150px]" /></td>
              <td className="p-3"><Skeleton className="h-4 w-[100px]" /></td>
            </TableRow>
          ))
        ) : (
          currentTestCases.map((testCase) => (
            <TestCaseDialog key={testCase.id} testCase={testCase} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
