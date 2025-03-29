import { testCases } from "./sample-data";

export interface Changeset {
  id: string;
  title: string;
  description: string;
  author: string;
  status: "open" | "merged" | "closed";
  createdAt: string;
  updatedAt: string;
  testCases: {
    id: string;
    status: "passed" | "failed" | "pending";
    lastRun: string;
  }[]; // Results of associated test cases
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
    description:
      "Core implementation of the quantum temporal engine for precise time displacement",
    author: "Maya Patel",
    status: "merged",
    createdAt: "2025-03-20T08:00:00Z",
    updatedAt: "2025-03-22T16:45:00Z",
    testCases: [
      {
        id: "tc-001",
        status: "passed",
        lastRun: "2025-03-22T09:30:00Z",
      },
      {
        id: "tc-002",
        status: "passed",
        lastRun: "2025-03-22T08:15:00Z",
      },
      {
        id: testCases[2].id,
        status: "passed",
        lastRun: "2025-03-22T07:45:00Z",
      },
      {
        id: "tc-004",
        status: "passed",
        lastRun: "2025-03-21T14:30:00Z",
      },
      {
        id: testCases[4].id,
        status: "passed",
        lastRun: "2025-03-21T13:15:00Z",
      },
      {
        id: "tc-006",
        status: "passed",
        lastRun: "2025-03-21T12:00:00Z",
      },
      {
        id: testCases[6].id,
        status: "passed",
        lastRun: "2025-03-21T11:30:00Z",
      },
    ],
    bespoke_tests: [
      {
        name: "Quantum Stability Test",
        description: "Verify temporal field stability at various power levels",
        status: "passed",
      },
      {
        name: "Temporal Paradox Detection",
        description: "Test the paradox detection and prevention systems",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Temporal Core",
        riskLevel: "high",
        description: "Foundation of the time displacement system",
      },
      {
        name: "Power Management",
        riskLevel: "high",
        description: "Integration with quantum power source",
      },
    ],
    verificationObjectives: [
      {
        objective: "Quantum field stability",
        status: "verified",
        notes: "Maintained within 0.001% variance",
      },
      {
        objective: "Temporal shielding integrity",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Temporal feedback loop",
        severity: "critical",
        mitigation: "Automated emergency shutdown protocol",
      },
    ],
    changedFiles: [
      {
        path: "src/core/quantum-temporal-engine.ts",
        changeType: "added",
        linesAdded: 1250,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM002",
    title: "Implement Temporal Navigation UI",
    description:
      "Modern interface for temporal coordinate selection and journey planning",
    author: "Alex Rivera",
    status: "open",
    createdAt: "2025-03-23T09:15:00Z",
    updatedAt: "2025-03-25T14:30:00Z",
    testCases: [
      {
        id: testCases[6].id,
        status: "passed",
        lastRun: "2025-03-21T11:30:00Z",
      },
      {
        id: testCases[7].id,
        status: "failed",
        lastRun: "2025-03-21T10:45:00Z",
      },
      {
        id: testCases[8].id,
        status: "passed",
        lastRun: "2025-03-21T09:30:00Z",
      },
      {
        id: testCases[9].id,
        status: "pending",
        lastRun: "2025-03-21T08:15:00Z",
      },
      {
        id: testCases[10].id,
        status: "passed",
        lastRun: "2025-03-20T16:30:00Z",
      },
      {
        id: testCases[11].id,
        status: "failed",
        lastRun: "2025-03-20T15:15:00Z",
      },
      {
        id: testCases[12].id,
        status: "passed",
        lastRun: "2025-03-20T14:30:00Z",
      },
      {
        id: testCases[13].id,
        status: "pending",
        lastRun: "2025-03-20T13:45:00Z",
      },
      {
        id: testCases[14].id,
        status: "passed",
        lastRun: "2025-03-20T13:00:00Z",
      },
    ],
    bespoke_tests: [
      {
        name: "Timeline Visualization",
        description: "Test accuracy of temporal waypoint rendering",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "User Interface",
        riskLevel: "medium",
        description: "New temporal navigation controls",
      },
    ],
    verificationObjectives: [
      {
        objective: "Intuitive temporal selection",
        status: "verified",
        notes: "User testing completed successfully",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Invalid temporal coordinates",
        severity: "minor",
        mitigation: "Input validation and safety bounds",
      },
    ],
    changedFiles: [
      {
        path: "src/components/temporal-navigator.tsx",
        changeType: "added",
        linesAdded: 458,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM003",
    title: "Refactor Temporal Calibration System",
    description:
      "Improve accuracy of temporal targeting system using quantum entanglement",
    author: "James Chen",
    status: "merged",
    createdAt: "2025-03-24T11:20:00Z",
    updatedAt: "2025-03-25T09:45:00Z",
    testCases: [
      {
        id: testCases[2].id,
        status: "passed",
        lastRun: "2025-03-22T07:45:00Z",
      },
      {
        id: testCases[4].id,
        status: "passed",
        lastRun: "2025-03-21T13:15:00Z",
      },
      {
        id: testCases[6].id,
        status: "passed",
        lastRun: "2025-03-21T11:30:00Z",
      },
      {
        id: testCases[8].id,
        status: "passed",
        lastRun: "2025-03-21T09:30:00Z",
      },
      {
        id: testCases[10].id,
        status: "passed",
        lastRun: "2025-03-20T16:30:00Z",
      },
      {
        id: testCases[12].id,
        status: "passed",
        lastRun: "2025-03-20T14:30:00Z",
      },
      {
        id: testCases[14].id,
        status: "passed",
        lastRun: "2025-03-20T13:00:00Z",
      },
      {
        id: testCases[16].id,
        status: "passed",
        lastRun: "2025-03-20T11:30:00Z",
      },
    ],
    bespoke_tests: [
      {
        name: "Quantum Calibration Precision",
        description: "Verify temporal targeting accuracy",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Calibration System",
        riskLevel: "high",
        description: "Enhanced temporal targeting precision",
      },
    ],
    verificationObjectives: [
      {
        objective: "Sub-microsecond accuracy",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Quantum decoherence",
        severity: "major",
        mitigation: "Redundant calibration systems",
      },
    ],
    changedFiles: [
      {
        path: "src/core/temporal-calibration.ts",
        changeType: "modified",
        linesAdded: 325,
        linesRemoved: 180,
      },
    ],
  },
  {
    id: "PR-TM004",
    title: "Implement Temporal Shielding 2.0",
    description:
      "Next-generation temporal shielding to prevent paradox cascade effects",
    author: "Sarah Wong",
    status: "open",
    createdAt: "2025-03-25T13:00:00Z",
    updatedAt: "2025-03-25T19:30:00Z",
    testCases: [
      { id: "tc-002", status: "passed", lastRun: "2025-03-25T19:00:00Z" },
      { id: "tc-004", status: "failed", lastRun: "2025-03-25T18:45:00Z" },
      { id: "tc-006", status: "pending", lastRun: "2025-03-25T18:30:00Z" },
      { id: "tc-008", status: "passed", lastRun: "2025-03-25T18:15:00Z" },
      { id: "tc-010", status: "failed", lastRun: "2025-03-25T18:00:00Z" },
      { id: "tc-012", status: "pending", lastRun: "2025-03-25T17:45:00Z" },
      { id: "tc-014", status: "passed", lastRun: "2025-03-25T17:30:00Z" },
      { id: "tc-016", status: "failed", lastRun: "2025-03-25T17:15:00Z" },
      { id: "tc-018", status: "pending", lastRun: "2025-03-25T17:00:00Z" },
      { id: "tc-020", status: "passed", lastRun: "2025-03-25T16:45:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Paradox Resistance",
        description: "Test shield effectiveness against temporal anomalies",
        status: "pending",
      },
    ],
    impactedSubsystems: [
      {
        name: "Temporal Shielding",
        riskLevel: "high",
        description: "Complete overhaul of protection systems",
      },
    ],
    verificationObjectives: [
      {
        objective: "99.999% paradox prevention",
        status: "pending",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Shield failure",
        severity: "critical",
        mitigation: "Emergency temporal lockdown",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-shielding.ts",
        changeType: "modified",
        linesAdded: 890,
        linesRemoved: 450,
      },
    ],
  },
  {
    id: "PR-TM005",
    title: "Add Temporal Waypoint System",
    description: "Implement safe temporal waypoints for emergency returns",
    author: "Marcus Johnson",
    status: "open",
    createdAt: "2025-03-25T16:45:00Z",
    updatedAt: "2025-03-25T20:30:00Z",
    testCases: [
      { id: "tc-001", status: "passed", lastRun: "2025-03-25T20:00:00Z" },
      { id: "tc-003", status: "failed", lastRun: "2025-03-25T19:45:00Z" },
      { id: "tc-005", status: "pending", lastRun: "2025-03-25T19:30:00Z" },
      { id: "tc-007", status: "passed", lastRun: "2025-03-25T19:15:00Z" },
      { id: "tc-009", status: "failed", lastRun: "2025-03-25T19:00:00Z" },
      { id: "tc-011", status: "pending", lastRun: "2025-03-25T18:45:00Z" },
      { id: "tc-013", status: "passed", lastRun: "2025-03-25T18:30:00Z" },
      { id: "tc-015", status: "failed", lastRun: "2025-03-25T18:15:00Z" },
      { id: "tc-017", status: "pending", lastRun: "2025-03-25T18:00:00Z" },
      { id: "tc-019", status: "passed", lastRun: "2025-03-25T17:45:00Z" },
      { id: "tc-021", status: "failed", lastRun: "2025-03-25T17:30:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Waypoint Persistence",
        description: "Verify stability of temporal markers",
        status: "failed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Safety Systems",
        riskLevel: "medium",
        description: "Emergency return capabilities",
      },
    ],
    verificationObjectives: [
      {
        objective: "Reliable waypoint creation",
        status: "pending",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Waypoint decay",
        severity: "major",
        mitigation: "Redundant marker system",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-waypoints.ts",
        changeType: "added",
        linesAdded: 645,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM006",
    title: "Implement Temporal Ethics Validator",
    description:
      "AI-powered system to prevent historically destructive temporal modifications",
    author: "Elena Martinez",
    status: "merged",
    createdAt: "2025-03-25T19:15:00Z",
    updatedAt: "2025-03-25T20:45:00Z",
    testCases: [
      { id: "tc-002", status: "passed", lastRun: "2025-03-25T19:00:00Z" },
      { id: "tc-005", status: "passed", lastRun: "2025-03-25T18:45:00Z" },
      { id: "tc-008", status: "passed", lastRun: "2025-03-25T18:30:00Z" },
      { id: "tc-011", status: "passed", lastRun: "2025-03-25T18:15:00Z" },
      { id: "tc-014", status: "passed", lastRun: "2025-03-25T18:00:00Z" },
      { id: "tc-017", status: "passed", lastRun: "2025-03-25T17:45:00Z" },
      { id: "tc-020", status: "passed", lastRun: "2025-03-25T17:30:00Z" },
      { id: "tc-023", status: "passed", lastRun: "2025-03-25T17:15:00Z" },
      { id: "tc-026", status: "passed", lastRun: "2025-03-25T17:00:00Z" },
      { id: "tc-029", status: "passed", lastRun: "2025-03-25T16:45:00Z" },
      { id: "tc-032", status: "passed", lastRun: "2025-03-25T16:30:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Historical Impact Analysis",
        description: "Verify ethical implications of temporal changes",
        status: "passed",
      },
      {
        name: "Butterfly Effect Simulator",
        description: "Test cascade effect predictions",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Ethics Engine",
        riskLevel: "high",
        description: "New temporal ethics validation system",
      },
      {
        name: "Historical Database",
        riskLevel: "medium",
        description: "Integration with temporal ethics rules",
      },
    ],
    verificationObjectives: [
      {
        objective: "Zero harmful butterfly effects",
        status: "verified",
        notes: "Currently at 99.7% accuracy",
      },
    ],
    plausibleFallout: [
      {
        scenario: "False positive blockage",
        severity: "minor",
        mitigation: "Manual override with multi-factor authentication",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-ethics.ts",
        changeType: "added",
        linesAdded: 780,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM007",
    title: "Add Multi-Timeline Visualization",
    description:
      "Interactive 4D visualization of temporal branch points and consequences",
    author: "Sophia Kim",
    status: "merged",
    createdAt: "2025-03-25T20:00:00Z",
    updatedAt: "2025-03-25T20:50:00Z",
    testCases: [
      { id: "tc-009", status: "passed", lastRun: "2025-03-24T09:30:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Timeline Rendering",
        description: "Test 4D visualization accuracy",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Visualization Engine",
        riskLevel: "medium",
        description: "New 4D rendering system",
      },
    ],
    verificationObjectives: [
      {
        objective: "Real-time timeline updates",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Resource overload",
        severity: "minor",
        mitigation: "Implement progressive loading",
      },
    ],
    changedFiles: [
      {
        path: "src/components/timeline-visualizer.tsx",
        changeType: "added",
        linesAdded: 925,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM008",
    title: "Implement Temporal Communication Protocol",
    description:
      "Secure communication system for coordinating across different temporal points",
    author: "Robert Chang",
    status: "merged",
    createdAt: "2025-03-25T20:30:00Z",
    updatedAt: "2025-03-25T20:55:00Z",
    testCases: [
      { id: "tc-010", status: "passed", lastRun: "2025-03-24T09:00:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Temporal Encryption",
        description: "Verify message integrity across timelines",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Communication System",
        riskLevel: "high",
        description: "Cross-temporal messaging infrastructure",
      },
    ],
    verificationObjectives: [
      {
        objective: "Message causality preservation",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Temporal message interference",
        severity: "major",
        mitigation: "Quantum encryption protocols",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-comms.ts",
        changeType: "added",
        linesAdded: 560,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM009",
    title: "Implement Temporal Power Management",
    description:
      "Advanced power distribution and containment system for temporal operations",
    author: "Michael Tesla",
    status: "closed",
    createdAt: "2025-03-25T20:40:00Z",
    updatedAt: "2025-03-25T20:56:00Z",
    testCases: [
      { id: "tc-011", status: "pending", lastRun: "2025-03-24T08:30:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Power Surge Protection",
        description: "Test temporal core stability during power fluctuations",
        status: "pending",
      },
      {
        name: "Emergency Shutdown",
        description: "Verify graceful power down sequences",
        status: "failed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Power Grid",
        riskLevel: "high",
        description: "Quantum power distribution network",
      },
      {
        name: "Safety Systems",
        riskLevel: "high",
        description: "Power-related safety protocols",
      },
    ],
    verificationObjectives: [
      {
        objective: "Zero power fluctuations",
        status: "pending",
        notes: "Currently achieving ±0.001% stability",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Quantum core overload",
        severity: "critical",
        mitigation: "Multi-stage containment protocols",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/power-management.ts",
        changeType: "added",
        linesAdded: 845,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM010",
    title: "Add Temporal Anomaly Detection",
    description:
      "AI-driven system for detecting and classifying temporal anomalies",
    author: "Lisa Chen",
    status: "open",
    createdAt: "2025-03-25T20:45:00Z",
    updatedAt: "2025-03-25T20:56:30Z",
    testCases: [
      { id: "tc-012", status: "passed", lastRun: "2025-03-24T08:00:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Anomaly Classification",
        description: "Verify accuracy of anomaly detection algorithms",
        status: "pending",
      },
    ],
    impactedSubsystems: [
      {
        name: "Monitoring Systems",
        riskLevel: "high",
        description: "Temporal anomaly detection infrastructure",
      },
    ],
    verificationObjectives: [
      {
        objective: "99.99% detection accuracy",
        status: "pending",
      },
    ],
    plausibleFallout: [
      {
        scenario: "False negative detection",
        severity: "major",
        mitigation: "Redundant detection systems",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/anomaly-detection.ts",
        changeType: "added",
        linesAdded: 720,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM011",
    title: "Implement Temporal Maintenance System",
    description:
      "Automated maintenance and self-repair capabilities for temporal systems",
    author: "James Wright",
    status: "merged",
    createdAt: "2025-03-25T20:50:00Z",
    updatedAt: "2025-03-25T20:56:45Z",
    testCases: [
      { id: "tc-013", status: "failed", lastRun: "2025-03-24T07:30:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Self-Repair Protocols",
        description: "Test automated maintenance procedures",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Maintenance Systems",
        riskLevel: "medium",
        description: "Automated temporal system maintenance",
      },
    ],
    verificationObjectives: [
      {
        objective: "24/7 system availability",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Maintenance cycle interruption",
        severity: "major",
        mitigation: "Manual override capabilities",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/maintenance.ts",
        changeType: "added",
        linesAdded: 650,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM012",
    title: "Implement Temporal Weather System",
    description:
      "Advanced system for managing atmospheric conditions during temporal transitions",
    author: "Sarah Storm",
    status: "merged",
    createdAt: "2025-03-25T20:57:00Z",
    updatedAt: "2025-03-25T20:58:30Z",
    testCases: [
      { id: "tc-014", status: "pending", lastRun: "2025-03-24T07:00:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Atmospheric Stabilization",
        description: "Test weather pattern normalization during jumps",
        status: "passed",
      },
      {
        name: "Climate Interference",
        description: "Verify minimal impact on historical weather patterns",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Environmental Controls",
        riskLevel: "high",
        description: "Temporal weather management system",
      },
    ],
    verificationObjectives: [
      {
        objective: "Zero weather anomalies",
        status: "verified",
        notes: "Currently at 99.5% stability",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Atmospheric disturbance",
        severity: "major",
        mitigation: "Emergency stabilization protocols",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/weather-control.ts",
        changeType: "added",
        linesAdded: 725,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM013",
    title: "Add Temporal Biometric Scanner",
    description:
      "Advanced system for monitoring traveler health during temporal transitions",
    author: "Maria Santos",
    status: "merged",
    createdAt: "2025-03-25T20:57:30Z",
    updatedAt: "2025-03-25T20:58:35Z",
    testCases: [
      { id: "tc-015", status: "passed", lastRun: "2025-03-24T06:30:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Biometric Tracking",
        description: "Test real-time health monitoring accuracy",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Health Monitoring",
        riskLevel: "high",
        description: "Temporal biometric scanning system",
      },
    ],
    verificationObjectives: [
      {
        objective: "100% health monitoring accuracy",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Biometric data loss",
        severity: "critical",
        mitigation: "Redundant sensor arrays",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/biometric-scanner.ts",
        changeType: "added",
        linesAdded: 680,
        linesRemoved: 0,
      },
    ],
  },
  {
    id: "PR-TM014",
    title: "Implement Temporal Archive System",
    description:
      "Secure storage system for preserving historical artifacts during temporal operations",
    author: "Alex Thompson",
    status: "merged",
    createdAt: "2025-03-25T20:58:00Z",
    updatedAt: "2025-03-25T20:58:40Z",
    testCases: [
      { id: "tc-016", status: "failed", lastRun: "2025-03-24T06:00:00Z" },
    ],
    bespoke_tests: [
      {
        name: "Artifact Preservation",
        description: "Test temporal stasis field stability",
        status: "passed",
      },
    ],
    impactedSubsystems: [
      {
        name: "Archive Systems",
        riskLevel: "medium",
        description: "Historical artifact preservation",
      },
    ],
    verificationObjectives: [
      {
        objective: "Perfect artifact preservation",
        status: "verified",
      },
    ],
    plausibleFallout: [
      {
        scenario: "Stasis field failure",
        severity: "major",
        mitigation: "Backup preservation protocols",
      },
    ],
    changedFiles: [
      {
        path: "src/systems/temporal-archive.ts",
        changeType: "added",
        linesAdded: 590,
        linesRemoved: 0,
      },
    ],
  },
];
