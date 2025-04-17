import { GitPullRequest } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import { changesets } from "@/data/changeset-data";
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

// Mock API
const fetchChangesetPages = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  // Share this logic with the table
  return Math.ceil(
    changesets.filter((changeset) =>
      changeset.title.toLowerCase().includes(query.toLowerCase()),
    ).length / CHANGESET_PAGE_SIZE,
  );
};

export default async function ChangesetsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const totalPages = await fetchChangesetPages(query);

  // TODO: Maybe we want this actually redirect to the last page
  const currentPage =
    Number(searchParams?.page) > totalPages
      ? totalPages
      : Number(searchParams?.page) || 1;

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
        <ChangesetsTable searchParams={searchParams} page={currentPage} />
      </Suspense>
      <div className="mt-4">
        <ChangesetsPagination totalPages={totalPages} />
      </div>
      <TipsFooter />
    </div>
  );
}
