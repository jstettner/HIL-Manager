import { FlaskConical, Circle } from "lucide-react"
import { testCases } from "@/data/sample-data"

export default function TestcasesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FlaskConical className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Testcases</h1>
      </div>
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Last Run</th>
              <th className="p-3 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase) => (
              <tr key={testCase.id} className="border-b">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Circle
                      className={`w-3 h-3 ${testCase.status === 'passed' ? 'fill-green-500 text-green-500' : 
                        testCase.status === 'failed' ? 'fill-red-500 text-red-500' : 
                        'fill-yellow-500 text-yellow-500'}`}
                    />
                    <span className="capitalize">{testCase.status}</span>
                  </div>
                </td>
                <td className="p-3 font-medium">{testCase.name}</td>
                <td className="p-3 text-muted-foreground">{testCase.description}</td>
                <td className="p-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                    ${testCase.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    testCase.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                    {testCase.priority}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">
                  {new Date(testCase.lastRun).toLocaleString()}
                </td>
                <td className="p-3 text-muted-foreground">{testCase.duration}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
