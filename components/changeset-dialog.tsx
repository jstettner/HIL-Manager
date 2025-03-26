import { Changeset } from "@/data/changeset-data";
import { testCases } from "@/data/sample-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Circle, FileCode, GitPullRequest } from "lucide-react";

export function ChangesetDialog({ changeset }: { changeset: Changeset }) {
  const associatedTests = testCases.filter((test) =>
    changeset.testCases.includes(test.id),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-muted/50">
          <TableCell className="p-3">
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
          </TableCell>
          <TableCell className="p-3 font-medium">{changeset.title}</TableCell>
          <TableCell className="p-3 text-muted-foreground">
            {changeset.description}
          </TableCell>
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
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{changeset.description}</p>
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
            <h3 className="font-medium mb-2">Associated Tests</h3>
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
