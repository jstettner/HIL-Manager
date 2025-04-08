"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TableRow, TableCell } from "@/components/ui/table";

import { TestCase } from "@/types";

interface TestCaseDialogRowProps {
  testCase: TestCase;
}

export function TestCaseDialogRow({ testCase }: TestCaseDialogRowProps) {
  return (
    <DialogTrigger asChild>
      <TableRow className="border-b cursor-pointer hover:bg-muted/50">
        <TableCell className="p-3">{testCase.name}</TableCell>
        <TableCell className="p-3 text-muted-foreground">
          {testCase.description}
        </TableCell>
        <TableCell className="p-3 text-muted-foreground">
          {testCase.lastRun
            ? new Date(testCase.lastRun).toLocaleString()
            : "Never Run"}
        </TableCell>
        <TableCell className="p-3 text-muted-foreground">
          {testCase.duration}s
        </TableCell>
      </TableRow>
    </DialogTrigger>
  );
}

export function TestCaseDialog({ testCase }: TestCaseDialogRowProps) {
  return (
    <Dialog>
      <TestCaseDialogRow testCase={testCase} />
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-white">
            <span className="font-dotgothic pr-1.5 text-muted-foreground">
              {testCase.id}.
            </span>
            {testCase.name}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium">
            {testCase.description}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Last Run</h4>
              <p className="text-sm text-muted-foreground">
                {testCase.lastRun
                  ? new Date(testCase.lastRun).toLocaleString()
                  : "Never Run"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Average Duration</h4>
              <p className="text-sm text-muted-foreground">
                {testCase.duration}s
              </p>
            </div>
          </div>
          <div className="rounded-lg p-4 relative bg-transparent overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(/images/banner-med-grad.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h4 className="text-md font-medium mb-3 text-white relative z-10">
              Compatible Environments
            </h4>
            <div className="flex flex-wrap gap-2 relative z-10">
              {testCase.compatibleTestbeds?.map((testbed) => (
                <button
                  key={testbed}
                  className="group relative min-w-[120px] max-w-[200px] px-3 py-1.5 text-xs font-medium text-white rounded-md transition-all overflow-hidden hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20 bg-black/80 mix-blend-screen"
                >
                  <span className="relative block truncate mix-blend-difference">
                    {testbed}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
