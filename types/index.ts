export interface TestCase {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  lastRun: string | null;
  priority: "low" | "medium" | "high";
  compatibleTestbeds?: string[];
}

export interface TestBed {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "maintenance";
  type: "physical" | "virtual";
  ipAddress: string;
  lastActive: string;
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
}
