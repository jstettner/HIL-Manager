import { createClient } from "./server";
import { Database } from "./types";
import { ActivityHistory, EventInfo, ResolutionStats, StatusInfo, SystemStatus } from "@/app/dashboard/overview/types";

/**
 * Helper functions for interacting with Supabase database
 */

export const getOrganizations = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("*");
  
  if (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
  
  return data;
};

export const getCurrentUserOrganization = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_current_organization")
    .select("*")
    .single();
  
  if (error) {
    console.error("Error fetching current organization:", error);
    throw error;
  }
  
  return data;
};

export const getUserOrganizations = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_organizations")
    .select("*");
  
  if (error) {
    console.error("Error fetching user organizations:", error);
    throw error;
  }
  
  return data;
};

export const getEnvironments = async (organizationId?: string) => {
  const supabase = await createClient();
  
  const query = supabase
    .from("environment_details")
    .select("*");
  
  if (organizationId) {
    query.eq("organization_id", organizationId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching environments:", error);
    throw error;
  }
  
  return data;
};

export const getTestcases = async (organizationId?: string) => {
  const supabase = await createClient();
  
  const query = supabase
    .from("testcase_details")
    .select("*");
  
  if (organizationId) {
    query.eq("organization_id", organizationId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching testcases:", error);
    throw error;
  }
  
  return data;
};

export const getChangesets = async (organizationId?: string) => {
  const supabase = await createClient();
  
  const query = supabase
    .from("changeset_simple")
    .select("*");
  
  if (organizationId) {
    query.eq("organization_id", organizationId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching changesets:", error);
    throw error;
  }
  
  return data;
};

export const getChangesetDetails = async (changesetId: string) => {
  const supabase = await createClient();
  const [
    changesetData,
    testcasesData,
    bespokeTestsData,
    impactedSubsystemsData,
    verificationObjectivesData,
    plausibleFalloutData,
    changedFilesData
  ] = await Promise.all([
    supabase
      .from("changeset_simple")
      .select("*")
      .eq("id", changesetId)
      .single()
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    supabase
      .from("changeset_testcases")
      .select("*, testcase:testcases(*)")
      .eq("changeset_id", changesetId)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    supabase
      .from("bespoke_tests")
      .select("*")
      .eq("changeset_id", changesetId)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    supabase
      .from("impacted_subsystems")
      .select("*")
      .eq("changeset_id", changesetId)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    supabase
      .from("verification_objectives")
      .select("*")
      .eq("changeset_id", changesetId)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    supabase
      .from("plausible_fallout")
      .select("*")
      .eq("changeset_id", changesetId)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    supabase
      .from("changed_files")
      .select("*")
      .eq("changeset_id", changesetId)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
  ]);

  return {
    changeset: changesetData,
    testcases: testcasesData,
    bespokeTests: bespokeTestsData,
    impactedSubsystems: impactedSubsystemsData,
    verificationObjectives: verificationObjectivesData,
    plausibleFallout: plausibleFalloutData,
    changedFiles: changedFilesData
  };
};

export const getProfile = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();
  
  if (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
  
  return data;
};

export const updateProfile = async (updates: {
  full_name?: string;
  avatar_url?: string;
  default_organization_id?: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
  
  return data;
};

export const createOrganization = async (name: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .insert({ name })
    .select()
    .single();
  
  if (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
  
  return data;
};

export const createEnvironment = async (environment: Database['public']['Tables']['environments']['Insert']) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("environments")
    .insert(environment)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating environment:", error);
    throw error;
  }
  
  return data;
};

export const createTestcase = async (testcase: Database['public']['Tables']['testcases']['Insert']) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testcases")
    .insert(testcase)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating testcase:", error);
    throw error;
  }
  
  return data;
};

export const createChangeset = async (changeset: Database['public']['Tables']['changesets']['Insert']) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("changesets")
    .insert(changeset)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating changeset:", error);
    throw error;
  }
  
  return data;
};

export const addTestcaseToChangeset = async (
  changesetId: string,
  testcaseId: string,
  status: Database['public']['Enums']['test_status'] = 'pending'
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("changeset_testcases")
    .insert({
      changeset_id: changesetId,
      testcase_id: testcaseId,
      status
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error adding testcase to changeset:", error);
    throw error;
  }
  
  return data;
};

export const updateTestcaseStatus = async (
  changesetId: string,
  testcaseId: string,
  status: Database['public']['Enums']['test_status']
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("changeset_testcases")
    .update({ status, last_run: new Date().toISOString() })
    .eq("changeset_id", changesetId)
    .eq("testcase_id", testcaseId)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating testcase status:", error);
    throw error;
  }
  
  return data;
};

export const deleteChangeset = async (changesetId: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("changesets")
    .delete()
    .eq("id", changesetId);
  
  if (error) {
    console.error("Error deleting changeset:", error);
    throw error;
  }
  
  return true;
};

export const addEnvironmentToTestcase = async (testcaseId: string, environmentId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testcase_environments")
    .insert({
      testcase_id: testcaseId,
      environment_id: environmentId
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error adding environment to testcase:", error);
    throw error;
  }
  
  return data;
};

// New API functions for dashboard overview components

export const getSystemStatus = async (organizationId?: string): Promise<SystemStatus> => {
  const supabase = await createClient();
  
  // Get environments for health status counts
  const query = supabase
    .from("environment_details")
    .select("*");
  
  if (organizationId) {
    query.eq("organization_id", organizationId);
  }
  
  const { data: environments, error: envError } = await query;
  
  if (envError) {
    console.error("Error fetching environments for system status:", envError);
    throw envError;
  }
  
  // Count environments by status
  const statusCounts = {
    Critical: 0,
    Warning: 0,
    Healthy: 0
  };
  
  const outages: StatusInfo[] = [];
  const warnings: StatusInfo[] = [];
  
  environments.forEach(env => {
    if (env.status === 'inactive') {
      statusCounts.Critical++;
      outages.push({
        id: env.id || '',
        title: `Host Offline - ${env.name}`,
        description: `Environment server is currently unreachable (${env.ip_address || 'Unknown IP'}).`,
        date: new Date(env.updated_at || new Date()).toLocaleString(),
        priority: 'high'
      });
    } else if (env.status === 'maintenance') {
      statusCounts.Warning++;
      warnings.push({
        id: env.id || '',
        title: `Maintenance Mode - ${env.name}`,
        description: `Environment is currently in maintenance mode.`,
        date: new Date(env.updated_at || new Date()).toLocaleString(),
        priority: 'medium'
      });
    } else {
      statusCounts.Healthy++;
    }
  });
  
  // Get testcase status to check for high failure rates
  const { data: testcases, error: testError } = await supabase
    .from("changeset_testcases")
    .select("*, testcase:testcases(name, id)")
    .order('created_at', { ascending: false })
    .limit(100);
  
  if (testError) {
    console.error("Error fetching testcases for system status:", testError);
    throw testError;
  }
  
  // Group testcases by environment to check for high failure rates
  const envFailureMap = new Map<string, { failed: number, total: number, name: string }>();
  
  testcases.forEach(tc => {
    // This is simplified - in a real implementation, you would have a relationship
    // between testcases and the environments they ran on
    const envId = tc.testcase.id.substring(0, 5); // Just using a substring of the ID as an example
    
    if (!envFailureMap.has(envId)) {
      envFailureMap.set(envId, { failed: 0, total: 0, name: `TM-${envId.toUpperCase()}` });
    }
    
    const envStats = envFailureMap.get(envId)!;
    envStats.total++;
    
    if (tc.status === 'failed') {
      envStats.failed++;
    }
  });
  
  // Check for environments with high failure rates
  envFailureMap.forEach((stats, envId) => {
    if (stats.total >= 5 && stats.failed / stats.total > 0.5) {
      warnings.push({
        id: envId,
        title: `High Failure Rate - ${stats.name}`,
        description: `${stats.failed} out of the last ${stats.total} test cases failed on this host. Diagnostics recommended.`,
        date: new Date().toLocaleString(),
        priority: 'high'
      });
      
      // Only increment Warning count if not already counted from maintenance status
      if (statusCounts.Warning === 0) {
        statusCounts.Warning++;
      }
    }
  });
  
  return {
    counts: statusCounts,
    outages,
    warnings
  };
};

export const getResolutionStats = async (organizationId?: string): Promise<ResolutionStats> => {
  const supabase = await createClient();
  
  // Get testcases and their durations
  const query = supabase
    .from("testcase_details")
    .select("duration");
  
  if (organizationId) {
    query.eq("organization_id", organizationId);
  }
  
  const { data: testcases, error: testError } = await query;
  
  if (testError) {
    console.error("Error fetching testcases for resolution stats:", testError);
    throw testError;
  }
  
  // Get changeset_testcases for timing data
  const { data: testResults, error: resultError } = await supabase
    .from("changeset_testcases")
    .select("status, created_at, last_run")
    .not('last_run', 'is', null);
  
  if (resultError) {
    console.error("Error fetching test results for resolution stats:", resultError);
    throw resultError;
  }
  
  // Calculate resolution time (difference between created_at and last_run)
  const resolutionTimes: number[] = [];
  testResults.forEach(result => {
    if (result.last_run && result.created_at) {
      const created = new Date(result.created_at).getTime();
      const resolved = new Date(result.last_run).getTime();
      const diffInHours = (resolved - created) / (1000 * 60 * 60);
      resolutionTimes.push(diffInHours);
    }
  });
  
  // Calculate average test duration
  const durations = testcases.map(tc => tc.duration || 0);
  const avgDuration = durations.length ? 
    durations.reduce((sum, duration) => sum + duration, 0) / durations.length : 0;
  
  // Calculate average resolution time
  const avgResolution = resolutionTimes.length ? 
    resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length : 0;
  
  // Calculate overhead (difference between resolution time and test duration)
  const avgOverhead = Math.max(0, avgResolution - (avgDuration / 60)); // Convert duration from minutes to hours
  
  // Determine trends based on historical data (mocked for now)
  // In a real implementation, you would compare to previous week's data
  
  return {
    stats: [
      {
        id: "1",
        title: "Average Time to Resolution",
        description: `~${avgResolution.toFixed(1)}hr`,
        trend: "up"
      },
      {
        id: "2",
        title: "Average Testcase Duration",
        description: `~${(avgDuration / 60).toFixed(1)}hr`,
        trend: "up"
      },
      {
        id: "3",
        title: "Average Testcase Overhead",
        description: `~${Math.round(avgOverhead * 60)}m`,
        trend: "none"
      }
    ]
  };
};

export const getActivityHistory = async (organizationId?: string): Promise<ActivityHistory> => {
  const supabase = await createClient();
  
  // Get recent events from various tables
  const [environments, testcases, changesets] = await Promise.all([
    // Get environment status changes
    supabase
      .from("environments")
      .select("id, name, status, updated_at")
      .order('updated_at', { ascending: false })
      .limit(5)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    
    // Get recent testcase runs
    supabase
      .from("changeset_testcases")
      .select("id, status, last_run, testcase_id, changeset_id, testcase:testcases(name)")
      .order('last_run', { ascending: false })
      .limit(5)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    
    // Get changeset status changes
    supabase
      .from("changesets")
      .select("id, title, test_status, updated_at")
      .order('updated_at', { ascending: false })
      .limit(5)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      })
  ]);
  
  // Convert data to events
  const events: EventInfo[] = [];
  
  // Environment events
  environments.forEach(env => {
    const event: EventInfo = {
      id: `env-${env.id}`,
      title: '',
      description: '',
      date: formatTimeAgo(env.updated_at),
      sentiment: 'neutral'
    };
    
    if (env.status === 'active') {
      event.title = `${env.name} is Now Active`;
      event.description = `${env.name} is healthy and operational.`;
      event.sentiment = 'positive';
    } else if (env.status === 'inactive') {
      event.title = `Host Offline - ${env.name}`;
      event.description = `Environment server is currently unreachable.`;
      event.sentiment = 'negative';
    } else if (env.status === 'maintenance') {
      event.title = `${env.name} Entered Maintenance Mode`;
      event.description = `${env.name} is in maintenance mode.`;
      event.sentiment = 'neutral';
    }
    
    events.push(event);
  });
  
  // Testcase events
  testcases.forEach(test => {
    if (!test.last_run) return;
    
    const event: EventInfo = {
      id: `test-${test.id}`,
      title: '',
      description: '',
      date: formatTimeAgo(test.last_run),
      sentiment: 'neutral'
    };
    
    if (test.status === 'passed') {
      event.title = `Test Passed - ${test.testcase?.name || 'Unknown Test'}`;
      event.description = `Test case passed successfully for changeset #${test.changeset_id}.`;
      event.sentiment = 'positive';
    } else if (test.status === 'failed') {
      event.title = `Test Failed - ${test.testcase?.name || 'Unknown Test'}`;
      event.description = `Test case failed for changeset #${test.changeset_id}.`;
      event.sentiment = 'negative';
    } else if (test.status === 'running') {
      event.title = `Test Running - ${test.testcase?.name || 'Unknown Test'}`;
      event.description = `Test case is currently running for changeset #${test.changeset_id}.`;
      event.sentiment = 'neutral';
    }
    
    events.push(event);
  });
  
  // Changeset events
  changesets.forEach(cs => {
    const event: EventInfo = {
      id: `cs-${cs.id}`,
      title: '',
      description: '',
      date: formatTimeAgo(cs.updated_at),
      sentiment: 'neutral'
    };
    
    if (cs.test_status === 'passed') {
      event.title = 'Test Set Passed';
      event.description = `Changeset #${cs.id} test set passed.`;
      event.sentiment = 'positive';
    } else if (cs.test_status === 'failed') {
      event.title = 'Test Set Failed';
      event.description = `Changeset #${cs.id} test set failed.`;
      event.sentiment = 'negative';
    } else if (cs.test_status === 'running' || cs.test_status === 'pending') {
      event.title = 'Test Set Queued';
      event.description = `Changeset #${cs.id} assessment was approved. Test set queued for execution.`;
      event.sentiment = 'neutral';
    }
    
    events.push(event);
  });
  
  // Sort events by date (most recent first)
  events.sort((a, b) => {
    const timeA = parseTimeAgo(a.date);
    const timeB = parseTimeAgo(b.date);
    return timeA - timeB;
  });
  
  return {
    events: events.slice(0, 10) // Return only the 10 most recent events
  };
};

// Helper function to format dates as "X time ago"
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${days} days ago`;
}

// Helper function to parse "X time ago" back to milliseconds for sorting
function parseTimeAgo(timeAgo: string): number {
  const match = timeAgo.match(/(\d+) (\w+) ago/);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  if (unit.includes('minute')) {
    return value * 60 * 1000;
  } else if (unit.includes('hour')) {
    return value * 60 * 60 * 1000;
  } else if (unit.includes('day')) {
    return value * 24 * 60 * 60 * 1000;
  }
  
  return 0;
}