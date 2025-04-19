export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bespoke_tests: {
        Row: {
          changeset_id: string;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          status: Database["public"]["Enums"]["test_status"];
          updated_at: string;
        };
        Insert: {
          changeset_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          status?: Database["public"]["Enums"]["test_status"];
          updated_at?: string;
        };
        Update: {
          changeset_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          status?: Database["public"]["Enums"]["test_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bespoke_tests_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bespoke_tests_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
        ];
      };
      changed_files: {
        Row: {
          change_type: Database["public"]["Enums"]["file_change_type"];
          changeset_id: string;
          created_at: string;
          id: string;
          lines_added: number;
          lines_removed: number;
          path: string;
          updated_at: string;
        };
        Insert: {
          change_type: Database["public"]["Enums"]["file_change_type"];
          changeset_id: string;
          created_at?: string;
          id?: string;
          lines_added?: number;
          lines_removed?: number;
          path: string;
          updated_at?: string;
        };
        Update: {
          change_type?: Database["public"]["Enums"]["file_change_type"];
          changeset_id?: string;
          created_at?: string;
          id?: string;
          lines_added?: number;
          lines_removed?: number;
          path?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "changed_files_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "changed_files_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
        ];
      };
      changeset_testcases: {
        Row: {
          changeset_id: string;
          created_at: string;
          id: string;
          last_run: string | null;
          status: Database["public"]["Enums"]["test_status"];
          testcase_id: string;
          updated_at: string;
        };
        Insert: {
          changeset_id: string;
          created_at?: string;
          id?: string;
          last_run?: string | null;
          status?: Database["public"]["Enums"]["test_status"];
          testcase_id: string;
          updated_at?: string;
        };
        Update: {
          changeset_id?: string;
          created_at?: string;
          id?: string;
          last_run?: string | null;
          status?: Database["public"]["Enums"]["test_status"];
          testcase_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "changeset_testcases_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "changeset_testcases_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "changeset_testcases_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcase_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "changeset_testcases_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcases";
            referencedColumns: ["id"];
          },
        ];
      };
      changesets: {
        Row: {
          author: string;
          created_at: string;
          description: string | null;
          id: string;
          organization_id: string;
          status: Database["public"]["Enums"]["changeset_status"];
          test_status: Database["public"]["Enums"]["test_status"] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          organization_id: string;
          status?: Database["public"]["Enums"]["changeset_status"];
          test_status?: Database["public"]["Enums"]["test_status"] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          organization_id?: string;
          status?: Database["public"]["Enums"]["changeset_status"];
          test_status?: Database["public"]["Enums"]["test_status"] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "changesets_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "changesets_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      environments: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          ip_address: string | null;
          last_active: string | null;
          name: string;
          organization_id: string;
          resources: Json;
          status: Database["public"]["Enums"]["environment_status"];
          type: Database["public"]["Enums"]["environment_type"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          ip_address?: string | null;
          last_active?: string | null;
          name: string;
          organization_id: string;
          resources?: Json;
          status?: Database["public"]["Enums"]["environment_status"];
          type?: Database["public"]["Enums"]["environment_type"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          ip_address?: string | null;
          last_active?: string | null;
          name?: string;
          organization_id?: string;
          resources?: Json;
          status?: Database["public"]["Enums"]["environment_status"];
          type?: Database["public"]["Enums"]["environment_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "environments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "environments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      impacted_subsystems: {
        Row: {
          changeset_id: string;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          risk_level: Database["public"]["Enums"]["risk_level"];
          updated_at: string;
        };
        Insert: {
          changeset_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          risk_level?: Database["public"]["Enums"]["risk_level"];
          updated_at?: string;
        };
        Update: {
          changeset_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          risk_level?: Database["public"]["Enums"]["risk_level"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "impacted_subsystems_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "impacted_subsystems_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_members: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string | null;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
          {
            foreignKeyName: "organization_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_current_organization";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "organization_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["user_id"];
          },
        ];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      plausible_fallout: {
        Row: {
          changeset_id: string;
          created_at: string;
          id: string;
          mitigation: string | null;
          scenario: string;
          severity: Database["public"]["Enums"]["risk_level"];
          updated_at: string;
        };
        Insert: {
          changeset_id: string;
          created_at?: string;
          id?: string;
          mitigation?: string | null;
          scenario: string;
          severity?: Database["public"]["Enums"]["risk_level"];
          updated_at?: string;
        };
        Update: {
          changeset_id?: string;
          created_at?: string;
          id?: string;
          mitigation?: string | null;
          scenario?: string;
          severity?: Database["public"]["Enums"]["risk_level"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "plausible_fallout_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "plausible_fallout_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          default_organization_id: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          default_organization_id?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          default_organization_id?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_default_organization_id_fkey";
            columns: ["default_organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_default_organization_id_fkey";
            columns: ["default_organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "user_current_organization";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "user_organizations";
            referencedColumns: ["user_id"];
          },
        ];
      };
      testcase_environments: {
        Row: {
          created_at: string;
          environment_id: string;
          id: string;
          testcase_id: string;
        };
        Insert: {
          created_at?: string;
          environment_id: string;
          id?: string;
          testcase_id: string;
        };
        Update: {
          created_at?: string;
          environment_id?: string;
          id?: string;
          testcase_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "testcase_environments_environment_id_fkey";
            columns: ["environment_id"];
            isOneToOne: false;
            referencedRelation: "environment_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_environments_environment_id_fkey";
            columns: ["environment_id"];
            isOneToOne: false;
            referencedRelation: "environments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_environments_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcase_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_environments_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcases";
            referencedColumns: ["id"];
          },
        ];
      };
      testcases: {
        Row: {
          created_at: string;
          description: string | null;
          duration: number;
          id: string;
          last_run: string | null;
          name: string;
          organization_id: string;
          priority: Database["public"]["Enums"]["priority_level"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          duration?: number;
          id?: string;
          last_run?: string | null;
          name: string;
          organization_id: string;
          priority?: Database["public"]["Enums"]["priority_level"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          duration?: number;
          id?: string;
          last_run?: string | null;
          name?: string;
          organization_id?: string;
          priority?: Database["public"]["Enums"]["priority_level"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "testcases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      verification_objectives: {
        Row: {
          changeset_id: string;
          created_at: string;
          id: string;
          notes: string | null;
          objective: string;
          status: Database["public"]["Enums"]["verification_status"];
          updated_at: string;
        };
        Insert: {
          changeset_id: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          objective: string;
          status?: Database["public"]["Enums"]["verification_status"];
          updated_at?: string;
        };
        Update: {
          changeset_id?: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          objective?: string;
          status?: Database["public"]["Enums"]["verification_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "verification_objectives_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "verification_objectives_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      changeset_simple: {
        Row: {
          author: string | null;
          created_at: string | null;
          description: string | null;
          id: string | null;
          organization_id: string | null;
          organization_name: string | null;
          status: Database["public"]["Enums"]["changeset_status"] | null;
          test_status: Database["public"]["Enums"]["test_status"] | null;
          title: string | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "changesets_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "changesets_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      environment_details: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string | null;
          ip_address: string | null;
          last_active: string | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          resources: Json | null;
          status: Database["public"]["Enums"]["environment_status"] | null;
          type: Database["public"]["Enums"]["environment_type"] | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "environments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "environments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      testcase_details: {
        Row: {
          created_at: string | null;
          description: string | null;
          duration: number | null;
          environment_ids: string[] | null;
          id: string | null;
          last_run: string | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          priority: Database["public"]["Enums"]["priority_level"] | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "testcases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      user_current_organization: {
        Row: {
          organization_id: string | null;
          organization_name: string | null;
          role: Database["public"]["Enums"]["user_role"] | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_default_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_default_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "user_organizations";
            referencedColumns: ["organization_id"];
          },
        ];
      };
      user_organizations: {
        Row: {
          full_name: string | null;
          is_default: boolean | null;
          organization_id: string | null;
          organization_name: string | null;
          role: Database["public"]["Enums"]["user_role"] | null;
          user_email: string | null;
          user_id: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      create_sample_data: {
        Args: { org_id: string };
        Returns: undefined;
      };
      derive_test_status: {
        Args: { changeset_id: string };
        Returns: Database["public"]["Enums"]["test_status"];
      };
      generate_uuid_from_string: {
        Args: { input_string: string };
        Returns: string;
      };
      import_bespoke_test: {
        Args: {
          changeset_id: string;
          name: string;
          description: string;
          status: Database["public"]["Enums"]["test_status"];
        };
        Returns: string;
      };
      import_changed_file: {
        Args: {
          changeset_id: string;
          path: string;
          change_type: Database["public"]["Enums"]["file_change_type"];
          lines_added: number;
          lines_removed: number;
        };
        Returns: string;
      };
      import_changeset: {
        Args: {
          org_id: string;
          changeset_id: string;
          changeset_title: string;
          changeset_description: string;
          changeset_author: string;
          changeset_status: Database["public"]["Enums"]["changeset_status"];
          created_at: string;
          updated_at: string;
        };
        Returns: string;
      };
      import_changeset_testcase: {
        Args: {
          changeset_id: string;
          testcase_id: string;
          status: Database["public"]["Enums"]["test_status"];
          last_run: string;
        };
        Returns: string;
      };
      import_environment: {
        Args: {
          org_id: string;
          environment_id: string;
          environment_name: string;
          environment_description: string;
          environment_status: Database["public"]["Enums"]["environment_status"];
          environment_type: Database["public"]["Enums"]["environment_type"];
          ip_address: string;
          last_active: string;
          resources: Json;
        };
        Returns: string;
      };
      import_impacted_subsystem: {
        Args: {
          changeset_id: string;
          name: string;
          risk_level: Database["public"]["Enums"]["risk_level"];
          description: string;
        };
        Returns: string;
      };
      import_plausible_fallout: {
        Args: {
          changeset_id: string;
          scenario: string;
          severity: Database["public"]["Enums"]["risk_level"];
          mitigation: string;
        };
        Returns: string;
      };
      import_testcase: {
        Args: {
          org_id: string;
          testcase_id: string;
          testcase_name: string;
          testcase_description: string;
          duration: number;
          last_run: string;
          priority: Database["public"]["Enums"]["priority_level"];
          compatible_environments: string[];
        };
        Returns: string;
      };
      import_verification_objective: {
        Args: {
          changeset_id: string;
          objective: string;
          status: Database["public"]["Enums"]["verification_status"];
          notes: string;
        };
        Returns: string;
      };
      user_is_in_changeset_organization: {
        Args: { changeset_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      changeset_status: "open" | "merged" | "closed";
      environment_status: "active" | "inactive" | "maintenance";
      environment_type: "physical" | "virtual";
      file_change_type: "added" | "modified" | "deleted";
      priority_level: "low" | "medium" | "high";
      risk_level: "low" | "medium" | "high" | "critical";
      test_status: "passed" | "failed" | "running" | "pending";
      user_role: "owner" | "admin" | "member";
      verification_status: "verified" | "pending" | "failed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Simplified type definitions for common usage
export type Environment = Tables<"environments">;
export type EnvironmentDetails =
  Database["public"]["Views"]["environment_details"]["Row"];
export type Testcase = Tables<"testcases">;
export type TestcaseDetails =
  Database["public"]["Views"]["testcase_details"]["Row"];
export type Changeset = Tables<"changesets">;
export type ChangesetSimple =
  Database["public"]["Views"]["changeset_simple"]["Row"];
export type Organization = Tables<"organizations">;
export type OrganizationMember = Tables<"organization_members">;
export type UserOrganization =
  Database["public"]["Views"]["user_organizations"]["Row"];
export type UserCurrentOrganization =
  Database["public"]["Views"]["user_current_organization"]["Row"];
export type Profile = Tables<"profiles">;
export type BespokeTest = Tables<"bespoke_tests">;
export type ChangedFile = Tables<"changed_files">;
export type ImpactedSubsystem = Tables<"impacted_subsystems">;
export type PlausibleFallout = Tables<"plausible_fallout">;
export type VerificationObjective = Tables<"verification_objectives">;
export type ChangesetTestcase = Tables<"changeset_testcases">;
export type TestcaseEnvironment = Tables<"testcase_environments">;

// Enums
export type ChangesetStatus = Enums<"changeset_status">;
export type EnvironmentStatus = Enums<"environment_status">;
export type EnvironmentType = Enums<"environment_type">;
export type FileChangeType = Enums<"file_change_type">;
export type PriorityLevel = Enums<"priority_level">;
export type RiskLevel = Enums<"risk_level">;
export type TestStatus = Enums<"test_status">;
export type UserRole = Enums<"user_role">;
export type VerificationStatus = Enums<"verification_status">;
