import { GitPullRequest } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import { changesets } from "@/data/changeset-data";
import { ChangesetDialog } from "@/components/changeset-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

export default async function ChangesetsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const searchParamsObj = await searchParams;
  const page =
    typeof searchParamsObj?.page === "string"
      ? parseInt(searchParamsObj.page)
      : 1;
  const itemsPerPage = 10;
  const totalItems = changesets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChangesets = changesets.slice(startIndex, endIndex);

  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/changesets?page=${i}`} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
  };
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6 page-header">
        <GitPullRequest className="w-6 h-6" />
        <div className="flex flex-row items-baseline gap-2">
          <h1 className="text-2xl">Changesets</h1>
          <h3 className="text-xl text-muted-foreground">
            Verification Reports
          </h3>
        </div>
      </div>
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
          {currentChangesets.map((changeset) => (
            <ChangesetDialog key={changeset.id} changeset={changeset} />
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? `/changesets?page=${page - 1}` : "#"}
              />
            </PaginationItem>

            {generatePaginationItems()}

            <PaginationItem>
              <PaginationNext
                href={page < totalPages ? `/changesets?page=${page + 1}` : "#"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <TipsFooter />
    </div>
  );
}
