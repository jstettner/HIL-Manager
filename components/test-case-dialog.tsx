"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";

interface TestCase {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  duration: number;
  compatibleTestbeds?: string[];
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{testCase.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm font-medium">
          {testCase.description}
        </DialogDescription>
        <div className="grid gap-4">
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
          <div>
            <h4 className="text-sm font-medium mb-3">Compatible Testbeds</h4>
            <div className="flex flex-wrap gap-2">
              {testCase.compatibleTestbeds?.map((testbed) => (
                <button
                  key={testbed}
                  className="relative min-w-[120px] max-w-[200px] px-3 py-1.5 text-xs font-medium text-white rounded-md transition-all overflow-hidden hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                  style={{
                    backgroundImage: 'url(/images/square-grad.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <span className="relative z-10 block truncate">{testbed}</span>
                  <div 
                    className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.2) 50%, transparent 55%)',
                      backgroundSize: '200% 200%',
                      animation: 'shine 1s ease-in-out infinite',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes shine {
              0% { background-position: -100% -100%; }
              100% { background-position: 100% 100%; }
            }
          `}</style>
        </div>
      </DialogContent>
    </Dialog>
  );
}
