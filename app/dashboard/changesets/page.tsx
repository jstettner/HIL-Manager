import { GitPullRequest } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import { updatedChangesets } from "@/data/changeset-data";
import {
  ChangesetsTable,
  ChangesetsTableLoading,
} from "@/app/dashboard/changesets/changesets-table";
import { ChangesetsPagination } from "./pagination";
import { Suspense } from "react";
import { CHANGESET_PAGE_SIZE } from "./constants";
import PageHeader from "@/components/page-header";
import Search from "@/components/search";
import { ChangesetFilter } from "./changeset-filter";

type ChangeSetQuery = {
  query?: string;
  failed?: string;
  running?: string;
  passed?: string;
}

// Mock API fetch function
const fetchChangesets = async (searchParams: ChangeSetQuery, page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const filteredChangesets = updatedChangesets.filter(
    (changeset) =>
      changeset.title
        .toLowerCase()
        .includes(searchParams?.query?.toLowerCase() || "") &&
      ((searchParams?.failed === "true" && changeset.testStatus === "failed") ||
        (searchParams?.running === "true" &&
          changeset.testStatus === "running") ||
        (searchParams?.passed === "true" &&
          changeset.testStatus === "passed") ||
        (!searchParams?.failed &&
          !searchParams?.running &&
          !searchParams?.passed)),
  );
  const startIndex = (page - 1) * CHANGESET_PAGE_SIZE;
  const endIndex = startIndex + CHANGESET_PAGE_SIZE;
  return [filteredChangesets.slice(startIndex, endIndex), Math.ceil(filteredChangesets.length / CHANGESET_PAGE_SIZE)] as const;
};

export default async function ChangesetsPage(props: {
  searchParams?: Promise<{
    page?: string;
  } & ChangeSetQuery>;
}) {
  const { page, ...query }: { page?: string } & ChangeSetQuery = await props.searchParams || {};

  const pageNumber = Number(page) || 1;

  const [changesets, totalPages] = await fetchChangesets(query, pageNumber);

  return (
    <div className="p-6">
      <PageHeader
        title="Changesets"
        description="Track Your Testsets"
        icon={<GitPullRequest className="w-6 h-6" />}
      />
      <div className="w-full flex flex-row mb-4">
        <ChangesetFilter />
        <Search placeholder="Search changesets..." />
      </div>
      <Suspense fallback={<ChangesetsTableLoading />}>
        <ChangesetsTable changesets={changesets} />
      </Suspense>
      <div className="mt-4">
        <ChangesetsPagination totalPages={totalPages} />
      </div>
      <TipsFooter />
    </div>
  );
}
