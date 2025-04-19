import { Skeleton } from "@/components/ui/skeleton";
import { ChangesetRow, UIChangeset } from "./changeset-row";

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

export function ChangesetsTable({ changesets }: { changesets: UIChangeset[] }) {
  return (
    <div className="flex flex-col rounded-md border border-1 border-muted overflow-hidden">
      {changesets.map((changeset) => (
        <ChangesetRow key={changeset.id} changeset={changeset} />
      ))}
    </div>
  );
}
