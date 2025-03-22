"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";

interface TestCase {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  duration: number;
}

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
          {new Date(testCase.lastRun).toLocaleString()}
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{testCase.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">{testCase.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Last Run</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(testCase.lastRun).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Average Duration</h4>
              <p className="text-sm text-muted-foreground">{testCase.duration}s</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
