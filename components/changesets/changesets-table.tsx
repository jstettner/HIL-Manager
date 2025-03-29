"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangesetDialog } from "@/components/changeset-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { changesets as sampleChangesets } from "@/data/changeset-data";

// Mock API fetch function
const fetchChangesets = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return sampleChangesets;
};

interface ChangesetsTableProps {
  page: number;
  itemsPerPage: number;
  selectedChangeset?: string;
}

export function ChangesetsTable({
  page,
  itemsPerPage,
  selectedChangeset,
}: ChangesetsTableProps) {
  const [loading, setLoading] = useState(true);
  const [changesets, setChangesets] = useState<typeof sampleChangesets>([]);

  useEffect(() => {
    const loadChangesets = async () => {
      setLoading(true);
      const data = await fetchChangesets();
      setChangesets(data);
      setLoading(false);
    };
    loadChangesets();
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChangesets = changesets.slice(startIndex, endIndex);

  return (
    <Table className="rounded-md border">
      <TableCaption className="sr-only">Changesets</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="p-3 text-left">Status</TableHead>
          <TableHead className="p-3 text-left">Tests</TableHead>
          <TableHead className="p-3 text-left">Title</TableHead>
          <TableHead className="p-3 text-left">Author</TableHead>
          <TableHead className="p-3 text-left">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="p-3">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="h-4 w-[300px]" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="h-4 w-[150px]" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
              </TableRow>
            ))
          : currentChangesets.map((changeset) => (
              <ChangesetDialog
                key={changeset.id}
                changeset={changeset}
                isOpen={selectedChangeset === changeset.id}
              />
            ))}
      </TableBody>
    </Table>
  );
}
