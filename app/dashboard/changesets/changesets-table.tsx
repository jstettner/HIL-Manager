import { Skeleton } from "@/components/ui/skeleton";
import { updatedChangesets as sampleChangesets } from "@/data/changeset-data";
import { CHANGESET_PAGE_SIZE } from "./constants";
import { ChangesetRow } from "./changeset-row";

type ChangesetsTableProps = {
  searchParams: Record<string, string | undefined>;
  page: number;
};

// Mock API fetch function
const fetchChangesets = async ({
  searchParams,
  page,
}: ChangesetsTableProps) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const filteredChangesets = sampleChangesets.filter(
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
  return filteredChangesets.slice(startIndex, endIndex);
};

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

export async function ChangesetsTable({
  searchParams,
  page,
}: ChangesetsTableProps) {
  const changesets = await fetchChangesets({ searchParams, page });
  return (
    <div className="flex flex-col rounded-md border border-1 border-muted overflow-hidden">
      {changesets.map((changeset) => (
        <ChangesetRow key={changeset.id} changeset={changeset} />
      ))}
    </div>
  );
}
