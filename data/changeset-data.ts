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
    id: "PR-TM001",
    title: "Implement Quantum Temporal Core",
    description: "Core implementation of the quantum temporal engine for precise time displacement",
    author: "Dr. Maya Patel",
    status: "merged",
    createdAt: "2025-03-20T08:00:00Z",
    updatedAt: "2025-03-22T16:45:00Z",
    testCases: [testCases[2].id],
    bespoke_tests: [
      {
        name: "Quantum Stability Test",
        description: "Verify temporal field stability at various power levels",
        status: "passed"
      },
      {
        name: "Temporal Paradox Detection",
        description: "Test the paradox detection and prevention systems",
        status: "passed"
      }
    ],
    impactedSubsystems: [
      {
        name: "Temporal Core",
        riskLevel: "high",
        description: "Foundation of the time displacement system"
      },
      {
        name: "Power Management",
        riskLevel: "high",
        description: "Integration with quantum power source"
      }
    ],
    verificationObjectives: [
      {
        objective: "Quantum field stability",
        status: "verified",
        notes: "Maintained within 0.001% variance"
      },
      {
        objective: "Temporal shielding integrity",
        status: "verified"
      }
    ],
    plausibleFallout: [
      {
        scenario: "Temporal feedback loop",
        severity: "critical",
        mitigation: "Automated emergency shutdown protocol"
      }
    ],
    changedFiles: [
      {
        path: "src/core/quantum-temporal-engine.ts",
        changeType: "added",
        linesAdded: 1250,
        linesRemoved: 0
      }
    ]
  },
  {
    id: "PR-TM002",
    title: "Implement Temporal Navigation UI",
    description: "Modern interface for temporal coordinate selection and journey planning",
    author: "Alex Rivera",
    status: "open",
    createdAt: "2025-03-23T09:15:00Z",
    updatedAt: "2025-03-25T14:30:00Z",
    testCases: [testCases[3].id],
    bespoke_tests: [
      {
        name: "Timeline Visualization",
        description: "Test accuracy of temporal waypoint rendering",
        status: "passed"
      }
    ],
    impactedSubsystems: [
      {
        name: "User Interface",
        riskLevel: "medium",
        description: "New temporal navigation controls"
      }
    ],
    verificationObjectives: [
      {
        objective: "Intuitive temporal selection",
        status: "verified",
        notes: "User testing completed successfully"
      }
    ],
    plausibleFallout: [
      {
        scenario: "Invalid temporal coordinates",
        severity: "minor",
        mitigation: "Input validation and safety bounds"
      }
    ],
    changedFiles: [
      {
        path: "src/components/temporal-navigator.tsx",
        changeType: "added",
        linesAdded: 458,
        linesRemoved: 0
      }
    ]
  },
  {
    id: "PR-TM003",
    title: "Refactor Temporal Calibration System",
    description: "Improve accuracy of temporal targeting system using quantum entanglement",
    author: "Dr. James Chen",
    status: "merged",
    createdAt: "2025-03-24T11:20:00Z",
    updatedAt: "2025-03-25T09:45:00Z",
    testCases: [testCases[4].id],
    bespoke_tests: [
      {
        name: "Quantum Calibration Precision",
        description: "Verify temporal targeting accuracy",
        status: "passed"
      }
    ],
    impactedSubsystems: [
      {
        name: "Calibration System",
        riskLevel: "high",
        description: "Enhanced temporal targeting precision"
      }
    ],
    verificationObjectives: [
      {
        objective: "Sub-microsecond accuracy",
        status: "verified"
      }
    ],
    plausibleFallout: [
      {
        scenario: "Quantum decoherence",
        severity: "major",
        mitigation: "Redundant calibration systems"
      }
    ],
    changedFiles: [
      {
        path: "src/core/temporal-calibration.ts",
        changeType: "modified",
        linesAdded: 325,
        linesRemoved: 180
      }
    ]
  },
  {
    id: "PR-TM004",
    title: "Implement Temporal Shielding 2.0",
    description: "Next-generation temporal shielding to prevent paradox cascade effects",
    author: "Dr. Sarah Wong",
    status: "open",
    createdAt: "2025-03-25T13:00:00Z",
    updatedAt: "2025-03-25T19:30:00Z",
    testCases: [testCases[5].id],
    bespoke_tests: [
      {
        name: "Paradox Resistance",
        description: "Test shield effectiveness against temporal anomalies",
        status: "pending"
      }
    ],
    impactedSubsystems: [
      {
        name: "Temporal Shielding",
        riskLevel: "high",
        description: "Complete overhaul of protection systems"
      }
    ],
    verificationObjectives: [
      {
        objective: "99.999% paradox prevention",
        status: "pending"
      }
    ],
    plausibleFallout: [
      {
        scenario: "Shield failure",
        severity: "critical",
        mitigation: "Emergency temporal lockdown"
      }
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-shielding.ts",
        changeType: "modified",
        linesAdded: 890,
        linesRemoved: 450
      }
    ]
  },
  {
    id: "PR-TM005",
    title: "Add Temporal Waypoint System",
    description: "Implement safe temporal waypoints for emergency returns",
    author: "Marcus Johnson",
    status: "open",
    createdAt: "2025-03-25T16:45:00Z",
    updatedAt: "2025-03-25T20:30:00Z",
    testCases: [testCases[6].id],
    bespoke_tests: [
      {
        name: "Waypoint Persistence",
        description: "Verify stability of temporal markers",
        status: "pending"
      }
    ],
    impactedSubsystems: [
      {
        name: "Safety Systems",
        riskLevel: "medium",
        description: "Emergency return capabilities"
      }
    ],
    verificationObjectives: [
      {
        objective: "Reliable waypoint creation",
        status: "pending"
      }
    ],
    plausibleFallout: [
      {
        scenario: "Waypoint decay",
        severity: "major",
        mitigation: "Redundant marker system"
      }
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-waypoints.ts",
        changeType: "added",
        linesAdded: 645,
        linesRemoved: 0
      }
    ]
  },
];
