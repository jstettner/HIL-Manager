import { Skeleton } from "@/components/ui/skeleton";
import { ChangesetRow } from "./changeset-row";
import { CHANGESET_PAGE_SIZE } from "./constants";
import { ChangesetsPagination } from "./pagination";
import {
  getChangesets,
  getCurrentUserOrganization,
} from "@/utils/supabase/schema";
import { ChangesetSimple } from "@/utils/supabase/types";
import { redirect } from "next/navigation";

export function ChangesetsTableLoading() {
  return (
    <div className="flex flex-col rounded-md border border-1 border-muted overflow-hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          className="m-2 p-4 flex flex-row min-h-20 gap-4 border-1 border-muted-fg rounded-md cursor-pointer hover:bg-muted/50"
        />
      ))}
    </div>
  );
}

type ChangeSetQuery = {
  query?: string;
  failed?: string;
  running?: string;
  passed?: string;
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
  }));
}

export async function ChangesetsTable({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    failed?: string;
    running?: string;
    passed?: string;
  }>;
}) {
  const params = await searchParams;
  // Get query parameters with defaults
  const page = Number(params?.page) || 1;
  const query = params?.query || "";
  const failed = params?.failed || "";
  const running = params?.running || "";
  const passed = params?.passed || "";

  try {
    // Get the current user's organization
    const currentOrg = await getCurrentUserOrganization();
    const orgId = currentOrg?.organization_id;

    if (!orgId) {
      redirect("/sign-in");
    }

    // Get the changesets from the DB
    const changesetsData = await getChangesets(orgId);

    // Filter the changesets based on searchParams
    const queryParams: ChangeSetQuery = {
      query,
      failed: failed === "true" ? "true" : undefined,
      running: running === "true" ? "true" : undefined,
      passed: passed === "true" ? "true" : undefined,
    };

    const filteredChangesets = changesetsData.filter(
      (changeset) =>
        changeset.title
          ?.toLowerCase()
          .includes(queryParams?.query?.toLowerCase() || "") &&
        ((queryParams?.failed === "true" &&
          changeset.test_status === "failed") ||
          (queryParams?.running === "true" &&
            changeset.test_status === "running") ||
          (queryParams?.passed === "true" &&
            changeset.test_status === "passed") ||
          (!queryParams?.failed &&
            !queryParams?.running &&
            !queryParams?.passed)),
    );

    // Pagination
    // TODO: Should we move this to the getChangesets method or is there
    // no difference since this is a server component?
    const startIndex = (page - 1) * CHANGESET_PAGE_SIZE;
    const endIndex = startIndex + CHANGESET_PAGE_SIZE;
    const paginatedChangesets = filteredChangesets.slice(startIndex, endIndex);
    const totalPages = Math.ceil(
      filteredChangesets.length / CHANGESET_PAGE_SIZE,
    );

    // Transform data
    const adaptedChangesets = adaptChangesets(paginatedChangesets);

    return (
      <>
        <div className="flex flex-col rounded-md border border-1 border-muted overflow-hidden">
          {adaptedChangesets.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No changesets found
            </div>
          ) : (
            adaptedChangesets.map((changeset) => (
              <ChangesetRow key={changeset.id} changeset={changeset} />
            ))
          )}
        </div>
        <div className="mt-4">
          <ChangesetsPagination totalPages={totalPages} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching changesets:", error);
    redirect("/sign-in");
  }
}
