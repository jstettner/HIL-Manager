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

// Mock API
const fetchChangesetPages = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return Math.ceil(changesets.length / CHANGESET_PAGE_SIZE);
};

export default async function ChangesetsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchChangesetPages(query);

  return (
    <div className="p-6">
      <PageHeader
        title="Changesets"
        description="Track Your Testsets"
        icon={<GitPullRequest className="w-6 h-6" />}
      />
      <Suspense fallback={<ChangesetsTableLoading />}>
        <ChangesetsTable query={query} page={currentPage} />
      </Suspense>
      <div className="mt-4">
        <ChangesetsPagination totalPages={totalPages} />
      </div>
      <TipsFooter />
    </div>
  );
}
