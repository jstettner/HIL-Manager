import { Changeset } from "@/data/changeset-data";
import Link from "next/link";
import {
  GitMerge,
  GitPullRequestClosed,
  GitPullRequestArrow,
} from "lucide-react";

function ChangesetStatusCircle({
  testStatus,
  changeSetStatus,
}: {
  testStatus: string;
  changeSetStatus: string;
}) {
  const borderStyle =
    changeSetStatus === "merged"
      ? "border-green-500"
      : changeSetStatus === "closed"
        ? "border-red-500"
        : "border-blue-300 border-dotted";
  const fillStyle =
    testStatus === "passed"
      ? "bg-green-500"
      : testStatus === "failed"
        ? "bg-red-500"
        : "bg-blue-500";

  const Icon =
    changeSetStatus === "merged"
      ? GitMerge
      : changeSetStatus === "closed"
        ? GitPullRequestClosed
        : GitPullRequestArrow;

  return (
    <>
      <div
        className={`w-5 h-5 p-[1px] rounded-full border-2 ${borderStyle} flex items-center justify-center`}
      >
        <div className={`w-2 h-2 rounded-full ${fillStyle}`} />
      </div>
      <Icon className="w-5 h-5" />
    </>
  );
}

export function ChangesetRow({ changeset }: { changeset: Changeset }) {
  const getTestStatus = () => {
    const hasFailedTests = changeset.bespoke_tests.some(
      (test) => test.status === "failed",
    );
    const hasRunningTests = changeset.bespoke_tests.some(
      (test) => test.status === "pending",
    );

    if (hasFailedTests) return "failed";
    if (hasRunningTests) return "running";
    return changeset.bespoke_tests.length > 0 ? "passed" : "running";
  };
  const testStatus = getTestStatus();

  return (
    <Link href={`/dashboard/changesets/${changeset.id}`}>
      <div className="m-2 p-4 flex flex-row min-h-20 gap-4 border-1 border-muted-fg rounded-md cursor-pointer hover:bg-muted/50">
        <div className="flex flex-col justify-between w-0 flex-1">
          <div className="flex flex-row items-center gap-2">
            <ChangesetStatusCircle
              testStatus={testStatus}
              changeSetStatus={changeset.status}
            />
            <span className="capitalize text-sm text-muted-foreground truncate">
              Tests {testStatus}
            </span>
          </div>
          <div className="font-medium flex items-center gap-2">
            <span className="truncate">{changeset.title}</span>
            <span className="truncate text-muted-foreground flex-1">
              {changeset.description}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between text-right">
          <div className="text-muted-foreground">{changeset.author}</div>
          <div className="text-muted-foreground">
            {new Date(changeset.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}
