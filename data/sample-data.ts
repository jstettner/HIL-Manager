import { TestCase, TestBed } from "@/types"

export const testCases: TestCase[] = [
  {
    id: "tc-001",
    name: "Basic Connectivity Test",
    description: "Verify basic network connectivity between components",
    status: "passed",
    lastRun: "2025-03-20T14:30:00Z",
    duration: 45,
    priority: "high"
  },
  {
    id: "tc-002",
    name: "Load Balancing Test",
    description: "Test distribution of traffic across multiple nodes",
    status: "pending",
    lastRun: "2025-03-19T09:15:00Z",
    duration: 120,
    priority: "medium"
  },
  {
    id: "tc-003",
    name: "Failover Recovery",
    description: "Validate system recovery after simulated node failure",
    status: "failed",
    lastRun: "2025-03-18T16:45:00Z",
    duration: 180,
    priority: "high"
  }
]

export const testBeds: TestBed[] = [
  {
    id: "tb-001",
    name: "Primary Test Environment",
    status: "active",
    type: "physical",
    ipAddress: "192.168.1.100",
    lastActive: "2025-03-20T19:30:00Z",
    resources: {
      cpu: 8,
      memory: 32,
      storage: 512
    }
  },
  {
    id: "tb-002",
    name: "Virtual Dev Environment",
    status: "active",
    type: "virtual",
    ipAddress: "192.168.1.101",
    lastActive: "2025-03-20T19:25:00Z",
    resources: {
      cpu: 4,
      memory: 16,
      storage: 256
    }
  },
  {
    id: "tb-003",
    name: "Legacy System Testbed",
    status: "maintenance",
    type: "physical",
    ipAddress: "192.168.1.102",
    lastActive: "2025-03-19T10:15:00Z",
    resources: {
      cpu: 4,
      memory: 8,
      storage: 128
    }
  }
]
