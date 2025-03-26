import { testCases } from "./sample-data";

export interface Changeset {
  id: string;
  title: string;
  description: string;
  author: string;
  status: "open" | "merged" | "closed";
  createdAt: string;
  updatedAt: string;
  testCases: string[]; // IDs of associated test cases
  changedFiles: {
    path: string;
    changeType: "added" | "modified" | "deleted";
    linesAdded: number;
    linesRemoved: number;
  }[];
}

export const changesets: Changeset[] = [
  {
    id: "PR-001",
    title: "Add new authentication flow",
    description:
      "Implements OAuth2 authentication with Google and GitHub providers",
    author: "Sarah Chen",
    status: "open",
    createdAt: "2025-03-24T10:00:00Z",
    updatedAt: "2025-03-25T15:30:00Z",
    testCases: [testCases[0].id, testCases[1].id],
    changedFiles: [
      {
        path: "src/auth/oauth.ts",
        changeType: "added",
        linesAdded: 156,
        linesRemoved: 0,
      },
      {
        path: "src/components/LoginButton.tsx",
        changeType: "modified",
        linesAdded: 45,
        linesRemoved: 12,
      },
    ],
  },
  {
    id: "PR-002",
    title: "Optimize database queries",
    description: "Add indexes and improve query performance for user dashboard",
    author: "Mike Johnson",
    status: "merged",
    createdAt: "2025-03-23T09:15:00Z",
    updatedAt: "2025-03-24T14:20:00Z",
    testCases: [testCases[2].id, testCases[3].id],
    changedFiles: [
      {
        path: "src/db/schema.ts",
        changeType: "modified",
        linesAdded: 23,
        linesRemoved: 5,
      },
    ],
  },
  {
    id: "PR-003",
    title: "Update UI components",
    description: "Refresh design system and implement dark mode",
    author: "Emma Wilson",
    status: "open",
    createdAt: "2025-03-25T08:45:00Z",
    updatedAt: "2025-03-25T16:10:00Z",
    testCases: [testCases[4].id],
    changedFiles: [
      {
        path: "src/styles/theme.css",
        changeType: "modified",
        linesAdded: 89,
        linesRemoved: 67,
      },
      {
        path: "src/components/Button.tsx",
        changeType: "modified",
        linesAdded: 34,
        linesRemoved: 28,
      },
    ],
  },
];
