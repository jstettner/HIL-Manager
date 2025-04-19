import { GitPullRequest } from "lucide-react";
import { TipsFooter } from "@/components/ui/tips-footer";
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
import {
  getChangesets,
  getCurrentUserOrganization,
} from "@/utils/supabase/schema";
import { ChangesetSimple } from "@/utils/supabase/types";
import { redirect } from "next/navigation";

type ChangeSetQuery = {
  query?: string;
  failed?: string;
  running?: string;
  passed?: string;
};

// Fetch from Supabase DB
const fetchChangesets = async (searchParams: ChangeSetQuery, page: number) => {
  try {
    // Get the current user's organization
    const currentOrg = await getCurrentUserOrganization();
    const orgId = currentOrg?.organization_id;

    if (!orgId) {
      throw new Error("No organization found for current user");
    }

    // Get the changesets from the DB
    const changesets = await getChangesets(orgId);

    // Filter the changesets based on searchParams
    const filteredChangesets = changesets.filter(
      (changeset) =>
        changeset.title
          ?.toLowerCase()
          .includes(searchParams?.query?.toLowerCase() || "") &&
        ((searchParams?.failed === "true" &&
          changeset.test_status === "failed") ||
          (searchParams?.running === "true" &&
            changeset.test_status === "running") ||
          (searchParams?.passed === "true" &&
            changeset.test_status === "passed") ||
          (!searchParams?.failed &&
            !searchParams?.running &&
            !searchParams?.passed)),
    );

    // Pagination
    const startIndex = (page - 1) * CHANGESET_PAGE_SIZE;
    const endIndex = startIndex + CHANGESET_PAGE_SIZE;

    return [
      filteredChangesets.slice(startIndex, endIndex),
      Math.ceil(filteredChangesets.length / CHANGESET_PAGE_SIZE),
    ] as const;
  } catch (error) {
    // Redirect to sign-in page if there's an issue with the user/organization
    console.error("Error fetching changesets:", error);
    redirect("/sign-in");
  }
};

// Adapter function to transform Supabase data to match the UI components' expected format
function adaptChangesets(changesets: ChangesetSimple[]) {
  return changesets.map((cs) => ({
    id: cs.id || "",
    title: cs.title || "",
    description: cs.description || "",
    testStatus: cs.test_status || "running",
    author: cs.author || "",
    status: cs.status || "open",
    createdAt: cs.created_at || new Date().toISOString(),
    updatedAt: cs.updated_at || new Date().toISOString(),
    testCases: [], // These fields aren't needed for the list view
    bespoke_tests: [],
    impactedSubsystems: [],
    verificationObjectives: [],
    plausibleFallout: [],
    changedFiles: [],
  }));
}

export default async function ChangesetsPage(props: {
  searchParams?: Promise<
    {
      page?: string;
    } & ChangeSetQuery
  >;
}) {
  const { page, ...query }: { page?: string } & ChangeSetQuery =
    (await props.searchParams) || {};

  const pageNumber = Number(page) || 1;

  const [changesets, totalPages] = await fetchChangesets(query, pageNumber);
  const adaptedChangesets = adaptChangesets(changesets);

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
        <ChangesetsTable changesets={adaptedChangesets} />
      </Suspense>
      <div className="mt-4">
        <ChangesetsPagination totalPages={totalPages} />
      </div>
      <TipsFooter />
    </div>
  );
}
