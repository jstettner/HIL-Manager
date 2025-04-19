/**
 * Script to add test data to the Supabase database
 *
 * Run this script with:
 * node add-test-data.js
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const { pathToFileURL } = require("url");

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Use anon key instead of service key

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing required environment variables NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample test data (already in your file)
const testCases = [
  {
    id: "tc-001",
    name: "Temporal Activation Button Test",
    description:
      "Does the start button initiate time travel, or just existential dread?",
    duration: 30,
    priority: "high",
  },
  {
    id: "tc-002",
    name: "Core Overheat During Chrono Jump",
    description:
      "Does it fry an egg mid-jump or hold steady at subatomic temps?",
    duration: 120,
    priority: "high",
  },
  {
    id: "tc-003",
    name: "Sleep Mode in Temporal Suspension",
    description: "Can it safely idle in the 1600s without drawing attention?",
    duration: 45,
    priority: "medium",
  },
  {
    id: "tc-004",
    name: "Power Cell Endurance Through Ages",
    description:
      "Does the battery survive 1,000 years or wimp out in 20 minutes?",
    duration: 240,
    priority: "high",
  },
  {
    id: "tc-005",
    name: "Port Stability in Multi-Epoch Use",
    description:
      "Do the connectors hold after 300 plug cycles across different centuries?",
    duration: 60,
    priority: "medium",
  },
];

const testBeds = [
  {
    id: "TM-POD-001",
    name: "TM-POD-001",
    description:
      "Personal Time Pod – compact, single-user time travel capsule with biometric access and fusion core.",
    status: "active",
    type: "physical",
    ip_address: "192.168.1.100",
    resources: {
      cpu: 8,
      memory: 32,
      storage: 512,
    },
  },
  {
    id: "TM-POD-002",
    name: "TM-POD-002",
    description:
      "Budget time pod with basic controls, no touchscreen, powered by plutonium (sometimes).",
    status: "active",
    type: "physical",
    ip_address: "192.168.1.101",
    resources: {
      cpu: 4,
      memory: 16,
      storage: 256,
    },
  },
  {
    id: "TM-RIG-001",
    name: "TM-RIG-001",
    description:
      "Stationary room-sized time rig with full cockpit, dual-core chrono processors, and wormhole stabilizers.",
    status: "active",
    type: "physical",
    ip_address: "192.168.1.102",
    resources: {
      cpu: 12,
      memory: 64,
      storage: 1024,
    },
  },
  {
    id: "TM-STATION-001",
    name: "TM-STATION-001",
    description:
      "Secure research facility for multi-device deployment, logs time drift, chronal echoes, and snacks.",
    status: "inactive", // This will trigger a Critical outage
    type: "physical",
    ip_address: "192.168.1.109",
    resources: {
      cpu: 32,
      memory: 256,
      storage: 4096,
    },
  },
  {
    id: "TM-SUIT-001",
    name: "TM-SUIT-001",
    description:
      "Wearable time displacement suit—sleek, stylish, highly unstable in 88% humidity.",
    status: "maintenance", // This will trigger a Warning
    type: "physical",
    ip_address: "192.168.1.105",
    resources: {
      cpu: 2,
      memory: 4,
      storage: 64,
    },
  },
];

const simpleChangesets = [
  {
    id: "PR-TM001",
    title: "Implement Quantum Temporal Core",
    description:
      "Core implementation of the quantum temporal engine for precise time displacement",
    author: "Maya Patel",
    status: "merged",
    test_status: "passed",
  },
  {
    id: "PR-TM002",
    title: "Implement Temporal Navigation UI",
    description:
      "Modern interface for temporal coordinate selection and journey planning",
    author: "Alex Rivera",
    status: "open",
    test_status: "running",
  },
  {
    id: "PR-TM003",
    title: "Refactor Temporal Calibration System",
    description:
      "Improve accuracy of temporal targeting system using quantum entanglement",
    author: "James Chen",
    status: "merged",
    test_status: "passed",
  },
  {
    id: "PR-TM004",
    title: "Implement Temporal Shielding 2.0",
    description:
      "Next-generation temporal shielding to prevent paradox cascade effects",
    author: "Sarah Wong",
    status: "open",
    test_status: "failed",
  },
];

// Helper function to derive test status from testCases
function deriveTestStatus(testCases) {
  if (testCases.some((tc) => tc.status === "failed")) {
    return "failed";
  } else if (testCases.some((tc) => tc.status === "pending")) {
    return "running";
  } else {
    return "passed";
  }
}

// Function to add test data to the database
async function addTestData() {
  try {
    // Step 1: Get organization info or create default organization
    console.log("Fetching organization...");
    let { data: organizations } = await supabase
      .from("organizations")
      .select("*");
    let organizationId;

    if (!organizations || organizations.length === 0) {
      // Create a default organization
      const { data: newOrg, error } = await supabase
        .from("organizations")
        .insert({
          name: "Default Organization",
        })
        .select();

      if (error) throw error;
      organizationId = newOrg[0].id;
      console.log(`Created new organization with ID: ${organizationId}`);
    } else {
      organizationId = organizations[0].id;
      console.log(`Using existing organization with ID: ${organizationId}`);
    }

    // Step 2: Add test environments
    console.log("Adding test environments...");
    for (const testBed of testBeds) {
      const { error } = await supabase.from("environments").upsert({
        id: testBed.id,
        name: testBed.name,
        description: testBed.description,
        organization_id: organizationId,
        status: testBed.status,
        type: testBed.type,
        ip_address: testBed.ip_address,
        resources: testBed.resources,
        last_active: new Date().toISOString(),
      });

      if (error) {
        console.error(`Error adding environment ${testBed.id}:`, error);
      } else {
        console.log(`Added/updated environment ${testBed.id}`);
      }
    }

    // Step 3: Add test cases
    console.log("Adding test cases...");
    for (const testCase of testCases) {
      const { error } = await supabase.from("testcases").upsert({
        id: testCase.id,
        name: testCase.name,
        description: testCase.description,
        organization_id: organizationId,
        duration: testCase.duration,
        priority: testCase.priority,
        last_run: new Date().toISOString(),
      });

      if (error) {
        console.error(`Error adding test case ${testCase.id}:`, error);
      } else {
        console.log(`Added/updated test case ${testCase.id}`);
      }
    }

    // Step 4: Add test case to environment relationships
    console.log("Adding test case to environment relationships...");
    const testCaseEnvironmentMappings = [
      { testcase_id: "tc-001", environment_id: "TM-POD-001" },
      { testcase_id: "tc-001", environment_id: "TM-RIG-001" },
      { testcase_id: "tc-002", environment_id: "TM-POD-002" },
      { testcase_id: "tc-002", environment_id: "TM-STATION-001" },
      { testcase_id: "tc-003", environment_id: "TM-POD-001" },
      { testcase_id: "tc-003", environment_id: "TM-SUIT-001" },
      { testcase_id: "tc-004", environment_id: "TM-POD-001" },
      { testcase_id: "tc-004", environment_id: "TM-SUIT-001" },
      { testcase_id: "tc-005", environment_id: "TM-RIG-001" },
      { testcase_id: "tc-005", environment_id: "TM-STATION-001" },
    ];

    for (const mapping of testCaseEnvironmentMappings) {
      const { error } = await supabase.from("testcase_environments").upsert({
        testcase_id: mapping.testcase_id,
        environment_id: mapping.environment_id,
      });

      if (error) {
        console.error(
          `Error adding relationship between ${mapping.testcase_id} and ${mapping.environment_id}:`,
          error,
        );
      }
    }

    // Step 5: Add simple changesets
    console.log("Adding simple changesets...");
    for (const changeset of simpleChangesets) {
      const { error } = await supabase.from("changesets").upsert({
        id: changeset.id,
        title: changeset.title,
        description: changeset.description,
        author: changeset.author,
        organization_id: organizationId,
        status: changeset.status,
        test_status: changeset.test_status,
      });

      if (error) {
        console.error(`Error adding changeset ${changeset.id}:`, error);
      } else {
        console.log(`Added/updated changeset ${changeset.id}`);
      }
    }

    // Step 6: Link test cases to changesets
    console.log("Adding test cases to changesets...");
    const changesetTestcaseMappings = [
      { changeset_id: "PR-TM001", testcase_id: "tc-001", status: "passed" },
      { changeset_id: "PR-TM001", testcase_id: "tc-002", status: "passed" },
      { changeset_id: "PR-TM002", testcase_id: "tc-003", status: "failed" },
      { changeset_id: "PR-TM002", testcase_id: "tc-004", status: "pending" },
      { changeset_id: "PR-TM003", testcase_id: "tc-001", status: "passed" },
      { changeset_id: "PR-TM003", testcase_id: "tc-005", status: "passed" },
      { changeset_id: "PR-TM004", testcase_id: "tc-002", status: "failed" },
      { changeset_id: "PR-TM004", testcase_id: "tc-003", status: "pending" },
    ];

    for (const mapping of changesetTestcaseMappings) {
      const { error } = await supabase.from("changeset_testcases").upsert({
        changeset_id: mapping.changeset_id,
        testcase_id: mapping.testcase_id,
        status: mapping.status,
        last_run: new Date().toISOString(),
      });

      if (error) {
        console.error(
          `Error adding relationship between ${mapping.changeset_id} and ${mapping.testcase_id}:`,
          error,
        );
      }
    }

    console.log("Test data added successfully!");
  } catch (error) {
    console.error("Error adding test data:", error);
  }
}

// Run the function
addTestData();
