import { GitPullRequest } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
import {
  ChangesetsTable,
  ChangesetsTableLoading,
} from "@/app/dashboard/changesets/changesets-table";
import PageHeader from "@/components/page-header";
import Search from "@/components/search";
import { ChangesetFilter } from "./changeset-filter";
import { Suspense } from "react";

export default async function ChangesetsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    failed?: string;
    running?: string;
    passed?: string;
  };
}) {
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
        <ChangesetsTable searchParams={searchParams} />
      </Suspense>
      <TipsFooter />
    </div>
  );
}
