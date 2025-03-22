import { FlaskConical, Circle } from "lucide-react"
import { testCases } from "@/data/sample-data"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function TestcasesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FlaskConical className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Testcases</h1>
      </div>
      <Table className="rounded-md border">
        <TableCaption className="sr-only">Testcases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-3 text-left">Status</TableHead>
            <TableHead className="p-3 text-left">Name</TableHead>
            <TableHead className="p-3 text-left">Description</TableHead>
            <TableHead className="p-3 text-left">Priority</TableHead>
            <TableHead className="p-3 text-left">Last Run</TableHead>
            <TableHead className="p-3 text-left">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((testCase) => (
            <TableRow key={testCase.id} className="border-b">
              <TableCell className="p-3">
                <div className="flex items-center gap-2">
                  <Circle
                    className={`w-3 h-3 ${testCase.status === 'passed' ? 'fill-green-500 text-green-500' : 
                      testCase.status === 'failed' ? 'fill-red-500 text-red-500' : 
                      'fill-yellow-500 text-yellow-500'}`}
                  />
                  <span className="capitalize">{testCase.status}</span>
                </div>
              </TableCell>
              <TableCell className="p-3 font-medium">{testCase.name}</TableCell>
              <TableCell className="p-3 text-muted-foreground">{testCase.description}</TableCell>
              <TableCell className="p-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                  ${testCase.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  testCase.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                  {testCase.priority}
                </span>
              </TableCell>
              <TableCell className="p-3 text-muted-foreground">
                {new Date(testCase.lastRun).toLocaleString()}
              </TableCell>
              <TableCell className="p-3 text-muted-foreground">{testCase.duration}s</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
