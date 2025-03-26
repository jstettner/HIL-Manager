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
  bespoke_tests: {
    name: string;
    description: string;
    status: "passed" | "failed" | "pending";
  }[];
  impactedSubsystems: {
    name: string;
    riskLevel: "high" | "medium" | "low";
    description: string;
  }[];
  verificationObjectives: {
    objective: string;
    status: "verified" | "pending" | "failed";
    notes?: string;
  }[];
  plausibleFallout: {
    scenario: string;
    severity: "critical" | "major" | "minor";
    mitigation: string;
  }[];
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
    bespoke_tests: [
      {
        name: "OAuth Token Refresh",
        description: "Verify token refresh flow works correctly",
        status: "passed",
      },
      {
        name: "Provider Switch",
        description: "Test switching between auth providers",
        status: "pending",
      },
    ],
    impactedSubsystems: [
      {
        name: "Authentication Service",
        riskLevel: "high",
        description: "Complete overhaul of auth system",
      },
      {
        name: "User Sessions",
        riskLevel: "medium",
        description: "Changes to session management",
      },
    ],
    verificationObjectives: [
      {
        objective: "Secure token storage",
        status: "verified",
        notes: "Using HttpOnly cookies",
      },
      {
        objective: "CSRF protection",
        status: "pending",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Auth provider downtime",
        severity: "critical",
        mitigation: "Implement fallback authentication",
      },
      {
        scenario: "Token leakage",
        severity: "major",
        mitigation: "Implement token rotation",
      },
    ],
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
    bespoke_tests: [
      {
        name: "Query Performance",
        description: "Verify query execution time improvements",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Database Layer",
        riskLevel: "medium",
        description: "Changes to query optimization",
      },
      {
        name: "User Dashboard",
        riskLevel: "low",
        description: "Performance improvements",
      },
    ],
    verificationObjectives: [
      {
        objective: "Query response time < 100ms",
        status: "verified",
        notes: "Avg response time: 45ms",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Index rebuild during peak hours",
        severity: "minor",
        mitigation: "Schedule maintenance window",
      },
    ],
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
    bespoke_tests: [
      {
        name: "Theme Switching",
        description: "Test smooth transition between light and dark modes",
        status: "passed",
      },
      {
        name: "Color Contrast",
        description: "Verify WCAG compliance for all color combinations",
        status: "failed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Theme Engine",
        riskLevel: "medium",
        description: "New theming system implementation",
      },
      {
        name: "Component Library",
        riskLevel: "high",
        description: "Major updates to core components",
      },
    ],
    verificationObjectives: [
      {
        objective: "WCAG 2.1 AA compliance",
        status: "failed",
        notes: "Color contrast issues found",
      },
      {
        objective: "Theme persistence",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "CSS conflicts",
        severity: "major",
        mitigation: "Implement CSS modules",
      },
      {
        scenario: "Browser compatibility",
        severity: "minor",
        mitigation: "Add fallback styles",
      },
    ],
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
  {
    id: "PR-004",
    title: "Implement real-time collaboration",
    description: "Add WebSocket-based real-time updates for collaborative features",
    author: "Alex Rivera",
    status: "open",
    createdAt: "2025-03-25T14:20:00Z",
    updatedAt: "2025-03-25T19:45:00Z",
    testCases: [testCases[1].id, testCases[3].id],
    bespoke_tests: [
      {
        name: "Connection Recovery",
        description: "Test automatic reconnection after network issues",
        status: "pending",
      },
      {
        name: "Conflict Resolution",
        description: "Verify concurrent edit handling",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "WebSocket Server",
        riskLevel: "high",
        description: "New real-time communication layer",
      },
      {
        name: "State Management",
        riskLevel: "high",
        description: "Changes to handle real-time updates",
      },
      {
        name: "UI Components",
        riskLevel: "medium",
        description: "Add real-time indicators",
      },
    ],
    verificationObjectives: [
      {
        objective: "Message delivery < 100ms",
        status: "verified",
        notes: "Avg latency: 45ms",
      },
      {
        objective: "Conflict-free updates",
        status: "pending",
      },
      {
        objective: "Graceful degradation",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "WebSocket server overload",
        severity: "critical",
        mitigation: "Implement connection pooling and load balancing",
      },
      {
        scenario: "Data inconsistency",
        severity: "major",
        mitigation: "Add periodic state reconciliation",
      },
      {
        scenario: "Browser compatibility",
        severity: "minor",
        mitigation: "Implement fallback to polling",
      },
    ],
    changedFiles: [
      {
        path: "src/websocket/server.ts",
        changeType: "added",
        linesAdded: 245,
        linesRemoved: 0,
      },
      {
        path: "src/hooks/useRealtime.ts",
        changeType: "added",
        linesAdded: 178,
        linesRemoved: 0,
      },
      {
        path: "src/components/CollaborationIndicator.tsx",
        changeType: "added",
        linesAdded: 89,
        linesRemoved: 0,
      },
    ],
  },
];
