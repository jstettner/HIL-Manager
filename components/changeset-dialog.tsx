"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Changeset, changesets } from "@/data/changeset-data";
import { testCases } from "@/data/sample-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertTriangle,
  Circle,
  FileCode,
  GitPullRequest,
  Target,
  Zap,
} from "lucide-react";

export function ChangesetDialog({ changeset, isOpen = false }: { changeset: Changeset; isOpen?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpenChange = (open: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!open) {
      params.delete('changeset');
    } else {
      params.set('changeset', changeset.id);
    }
    router.push(`/changesets?${params.toString()}`);
  };
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
  const associatedTests = testCases.filter((test) =>
    changeset.testCases.includes(test.id),
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <TableRow 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => {
            if (!isOpen) {
              const params = new URLSearchParams(searchParams.toString());
              const page = Math.ceil((changesets.findIndex((c: Changeset) => c.id === changeset.id) + 1) / 10);
              params.set('page', page.toString());
              params.set('changeset', changeset.id);
              router.push(`/changesets?${params.toString()}`);
            }
          }}>
          <TableCell className="p-3">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 pt-0.5 pb-1 rounded-full text-xs ${
                  changeset.status === "merged"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : changeset.status === "closed"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                }`}
              >
                {changeset.status}
              </span>
            </div>
          </TableCell>
          <TableCell className="p-3">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 pt-0.5 pb-1 rounded-full text-xs ${
                  testStatus === "passed"
                    ? "bg-blue-500 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
                    : testStatus === "running"
                      ? "bg-blue-300 text-blue-300 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-red-500 text-red-500 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {testStatus}
              </span>
            </div>
          </TableCell>
          <TableCell className="p-3 font-medium">{changeset.title}</TableCell>

          <TableCell className="p-3 text-muted-foreground">
            {changeset.author}
          </TableCell>
          <TableCell className="p-3 text-muted-foreground">
            {new Date(changeset.updatedAt).toLocaleString()}
          </TableCell>
        </TableRow>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitPullRequest className="w-5 h-5" />
            {changeset.title}
          </DialogTitle>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Circle
                className={`w-3 h-3 ${
                  changeset.status === "merged"
                    ? "fill-green-500 text-green-500"
                    : changeset.status === "closed"
                      ? "fill-red-500 text-red-500"
                      : "fill-yellow-500 text-yellow-500"
                }`}
              />
              <span className="capitalize">{changeset.status}</span>
            </div>
            <div>by {changeset.author}</div>
            <div>Updated {new Date(changeset.updatedAt).toLocaleString()}</div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{changeset.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Impacted Subsystems
            </h3>
            <div className="space-y-2">
              {changeset.impactedSubsystems.map((system) => (
                <div
                  key={system.name}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      system.riskLevel === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : system.riskLevel === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    }`}
                  >
                    {system.riskLevel}
                  </span>
                  <span className="font-medium">{system.name}</span>
                  <span className="flex-1 text-muted-foreground">
                    {system.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Verification Objectives
            </h3>
            <div className="space-y-2">
              {changeset.verificationObjectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <Circle
                    className={`w-3 h-3 ${
                      objective.status === "verified"
                        ? "fill-green-500 text-green-500"
                        : objective.status === "failed"
                          ? "fill-red-500 text-red-500"
                          : "fill-yellow-500 text-yellow-500"
                    }`}
                  />
                  <span className="flex-1">{objective.objective}</span>
                  {objective.notes && (
                    <span className="text-muted-foreground">
                      {objective.notes}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Plausible Fallout
            </h3>
            <div className="space-y-2">
              {changeset.plausibleFallout.map((fallout, index) => (
                <div
                  key={index}
                  className="text-sm p-2 rounded-md bg-muted space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        fallout.severity === "critical"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : fallout.severity === "major"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {fallout.severity}
                    </span>
                    <span className="font-medium">{fallout.scenario}</span>
                  </div>
                  <div className="text-muted-foreground pl-4 border-l-2 border-muted-foreground/20">
                    {fallout.mitigation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Changed Files</h3>
            <div className="space-y-2">
              {changeset.changedFiles.map((file) => (
                <div
                  key={file.path}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <FileCode className="w-4 h-4" />
                  <span className="flex-1">{file.path}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      file.changeType === "added"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : file.changeType === "deleted"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {file.changeType}
                  </span>
                  <span className="text-muted-foreground">
                    +{file.linesAdded} -{file.linesRemoved}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Bespoke Tests</h3>
            <div className="space-y-2">
              {changeset.bespoke_tests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <Circle
                    className={`w-3 h-3 ${
                      test.status === "passed"
                        ? "fill-green-500 text-green-500"
                        : test.status === "failed"
                          ? "fill-red-500 text-red-500"
                          : "fill-yellow-500 text-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{test.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {test.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Existing Tests</h3>
            <div className="space-y-2">
              {associatedTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <Circle
                    className={`w-3 h-3 ${
                      test.status === "passed"
                        ? "fill-green-500 text-green-500"
                        : test.status === "failed"
                          ? "fill-red-500 text-red-500"
                          : "fill-yellow-500 text-yellow-500"
                    }`}
                  />
                  <span className="flex-1">{test.name}</span>
                  <span className="text-muted-foreground">
                    {test.duration}s
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
