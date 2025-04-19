import { createClient } from "./server";
import { Database } from "./types";

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