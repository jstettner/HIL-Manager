import { TestCase, TestBed } from "@/types"

export const testCases: TestCase[] = [
  {
    id: "tc-001",
    name: "Power Button Responsiveness Test",
    description: "Will it turn on… or is it just emotionally unavailable?",
    status: "passed",
    lastRun: "2025-03-22T09:30:00Z",
    duration: 30,
    priority: "high"
  },
  {
    id: "tc-002",
    name: "Overheating Stress Test",
    description: "Run processes until the device feels like it could fry an egg.",
    status: "pending",
    lastRun: "2025-03-22T08:15:00Z",
    duration: 120,
    priority: "high"
  },
  {
    id: "tc-003",
    name: "Sleep/Wake Functionality",
    description: "Does it nap efficiently or fake sleep like a toddler?",
    status: "passed",
    lastRun: "2025-03-22T07:45:00Z",
    duration: 45,
    priority: "medium"
  },
  {
    id: "tc-004",
    name: "Battery Life Under Load",
    description: "Can it survive a Marvel movie marathon or die at the intro?",
    status: "failed",
    lastRun: "2025-03-21T14:30:00Z",
    duration: 240,
    priority: "high"
  },
  {
    id: "tc-005",
    name: "Port Abuse Test",
    description: "Plug and unplug like a stressed-out tech support agent.",
    status: "passed",
    lastRun: "2025-03-21T13:15:00Z",
    duration: 60,
    priority: "medium"
  },
  {
    id: "tc-006",
    name: "Fan Noise Level Test",
    description: "Measure in decibels: whisper or helicopter?",
    status: "pending",
    lastRun: "2025-03-21T12:00:00Z",
    duration: 30,
    priority: "low"
  },
  {
    id: "tc-007",
    name: "Display Brightness Test",
    description: "Bright enough to see or still stuck in the Dark Ages?",
    status: "passed",
    lastRun: "2025-03-21T11:30:00Z",
    duration: 15,
    priority: "medium"
  },
  {
    id: "tc-008",
    name: "Color Accuracy Test",
    description: "Is white actually white, or emotionally beige?",
    status: "failed",
    lastRun: "2025-03-21T10:45:00Z",
    duration: 90,
    priority: "high"
  },
  {
    id: "tc-009",
    name: "Keyboard Smash Resistance",
    description: "Simulate rage typing. Does it tap out or stand strong?",
    status: "passed",
    lastRun: "2025-03-21T09:30:00Z",
    duration: 45,
    priority: "medium"
  },
  {
    id: "tc-010",
    name: "USB Detection Speed",
    description: "Time how fast it makes the hopeful 'bing'.",
    status: "pending",
    lastRun: "2025-03-21T08:15:00Z",
    duration: 20,
    priority: "low"
  },
  {
    id: "tc-011",
    name: "Wi-Fi Connectivity Test",
    description: "Does it find Wi-Fi faster than your uncle at a buffet?",
    status: "passed",
    lastRun: "2025-03-20T16:30:00Z",
    duration: 60,
    priority: "high"
  },
  {
    id: "tc-012",
    name: "Bluetooth Pairing Test",
    description: "Will it connect, or ghost you like a bad date?",
    status: "failed",
    lastRun: "2025-03-20T15:15:00Z",
    duration: 30,
    priority: "medium"
  },
  {
    id: "tc-013",
    name: "Shutdown Speed Test",
    description: "Faster than a dramatic movie death scene?",
    status: "passed",
    lastRun: "2025-03-20T14:30:00Z",
    duration: 25,
    priority: "low"
  },
  {
    id: "tc-014",
    name: "Durability Drop Test",
    description: "Desk-height drop: survival or obituary?",
    status: "pending",
    lastRun: "2025-03-20T13:45:00Z",
    duration: 15,
    priority: "high"
  },
  {
    id: "tc-015",
    name: "Lid Open/Close Test",
    description: "Hinge check + sigh detection.",
    status: "passed",
    lastRun: "2025-03-20T13:00:00Z",
    duration: 40,
    priority: "medium"
  },
  {
    id: "tc-016",
    name: "Peripheral Compatibility Test",
    description: "Accepts that 2009 mouse, or scoffs in binary?",
    status: "failed",
    lastRun: "2025-03-20T12:15:00Z",
    duration: 60,
    priority: "medium"
  },
  {
    id: "tc-017",
    name: "Touchscreen Accuracy",
    description: "Tap one spot. Does it listen or go rogue?",
    status: "passed",
    lastRun: "2025-03-20T11:30:00Z",
    duration: 45,
    priority: "high"
  },
  {
    id: "tc-018",
    name: "Overnight Idle Stability",
    description: "Leave overnight: wake refreshed or crashed?",
    status: "pending",
    lastRun: "2025-03-20T10:45:00Z",
    duration: 480,
    priority: "high"
  },
  {
    id: "tc-019",
    name: "Thermal Throttling Observation",
    description: "Under stress, does it stay cool or slow like Monday morning?",
    status: "passed",
    lastRun: "2025-03-20T10:00:00Z",
    duration: 120,
    priority: "high"
  },
  {
    id: "tc-020",
    name: "Speaker Quality Test",
    description: "Symphony or soup can concert?",
    status: "failed",
    lastRun: "2025-03-20T09:15:00Z",
    duration: 30,
    priority: "medium"
  },
  {
    id: "tc-021",
    name: "BIOS Access Speed",
    description: "Can you beat the window of BIOS acceptance?",
    status: "passed",
    lastRun: "2025-03-20T08:30:00Z",
    duration: 20,
    priority: "low"
  },
  {
    id: "tc-022",
    name: "RAM Stress Test",
    description: "Overload it until it cries or conquers.",
    status: "pending",
    lastRun: "2025-03-20T07:45:00Z",
    duration: 180,
    priority: "high"
  },
  {
    id: "tc-023",
    name: "External Display Support",
    description: "Plug into a monitor—does it freak out or say hello?",
    status: "passed",
    lastRun: "2025-03-19T16:30:00Z",
    duration: 45,
    priority: "medium"
  },
  {
    id: "tc-024",
    name: "Trackpad Sensitivity",
    description: "Smooth operator or jumpy jitterbug?",
    status: "failed",
    lastRun: "2025-03-19T15:45:00Z",
    duration: 30,
    priority: "medium"
  },
  {
    id: "tc-025",
    name: "Charging Port Connection Test",
    description: "Plug in—does it charge or just tease you with the light?",
    status: "passed",
    lastRun: "2025-03-19T15:00:00Z",
    duration: 25,
    priority: "high"
  },
  {
    id: "tc-026",
    name: "Battery Swell Check",
    description: "Check if the battery's doing a slow balloon impression.",
    status: "pending",
    lastRun: "2025-03-19T14:15:00Z",
    duration: 15,
    priority: "high"
  },
  {
    id: "tc-027",
    name: "Audio Jack Functionality",
    description: "Plug in headphones. Bliss or static storm?",
    status: "passed",
    lastRun: "2025-03-19T13:30:00Z",
    duration: 20,
    priority: "medium"
  },
  {
    id: "tc-028",
    name: "Webcam Clarity Test",
    description: "Is that you… or a pixelated ghost?",
    status: "failed",
    lastRun: "2025-03-19T12:45:00Z",
    duration: 30,
    priority: "low"
  },
  {
    id: "tc-029",
    name: "Microphone Input Test",
    description: "Talk into it. Does it hear your secrets or just wind?",
    status: "passed",
    lastRun: "2025-03-19T12:00:00Z",
    duration: 25,
    priority: "medium"
  },
  {
    id: "tc-030",
    name: "GPS Accuracy",
    description: "Does it know where you are or think you're in Narnia?",
    status: "pending",
    lastRun: "2025-03-19T11:15:00Z",
    duration: 60,
    priority: "low"
  },
  {
    id: "tc-031",
    name: "Vibration Test",
    description: "Notification buzz or confused lawn mower?",
    status: "passed",
    lastRun: "2025-03-19T10:30:00Z",
    duration: 15,
    priority: "low"
  },
  {
    id: "tc-032",
    name: "Fingerprint Scanner Reliability",
    description: "Recognizes you, or locks you out like a club bouncer?",
    status: "failed",
    lastRun: "2025-03-19T09:45:00Z",
    duration: 45,
    priority: "high"
  },
  {
    id: "tc-033",
    name: "Face Recognition Test",
    description: "Do you need to put on makeup to be recognized?",
    status: "pending",
    lastRun: "2025-03-19T09:00:00Z",
    duration: 30,
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
