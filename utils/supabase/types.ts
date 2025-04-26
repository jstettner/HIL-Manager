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
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          default_organization_id?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          default_organization_id?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          organization_id?: string;
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
            foreignKeyName: "profiles_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      testcase_environments: {
        Row: {
          created_at: string;
          environment_id: string;
          id: string;
          organization_id: string;
          testcase_id: string;
        };
        Insert: {
          created_at?: string;
          environment_id: string;
          id?: string;
          organization_id: string;
          testcase_id: string;
        };
        Update: {
          created_at?: string;
          environment_id?: string;
          id?: string;
          organization_id?: string;
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
            foreignKeyName: "testcase_environments_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
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
            referencedRelation: "testcase_details_view";
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
      testcase_instances: {
        Row: {
          changeset_id: string | null;
          completed_at: string | null;
          created_at: string;
          duration: number | null;
          environment_id: string;
          id: string;
          logs: string | null;
          organization_id: string;
          result: Json | null;
          started_at: string | null;
          status: Database["public"]["Enums"]["test_status"];
          testcase_id: string;
          updated_at: string;
        };
        Insert: {
          changeset_id?: string | null;
          completed_at?: string | null;
          created_at?: string;
          duration?: number | null;
          environment_id: string;
          id?: string;
          logs?: string | null;
          organization_id: string;
          result?: Json | null;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["test_status"];
          testcase_id: string;
          updated_at?: string;
        };
        Update: {
          changeset_id?: string | null;
          completed_at?: string | null;
          created_at?: string;
          duration?: number | null;
          environment_id?: string;
          id?: string;
          logs?: string | null;
          organization_id?: string;
          result?: Json | null;
          started_at?: string | null;
          status?: Database["public"]["Enums"]["test_status"];
          testcase_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "testcase_invocations_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_environment_id_fkey";
            columns: ["environment_id"];
            isOneToOne: false;
            referencedRelation: "environment_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_environment_id_fkey";
            columns: ["environment_id"];
            isOneToOne: false;
            referencedRelation: "environments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcase_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcase_details_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcases";
            referencedColumns: ["id"];
          },
        ];
      };
      testcases: {
        Row: {
          changeset_id: string | null;
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
          changeset_id?: string | null;
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
          changeset_id?: string | null;
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
            foreignKeyName: "testcases_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
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
        ];
      };
      testcase_details_view: {
        Row: {
          bespoke_changeset_title: string | null;
          changeset_id: string | null;
          compatible_environment_ids: string[] | null;
          compatible_environment_names: string[] | null;
          created_at: string | null;
          description: string | null;
          duration: number | null;
          id: string | null;
          is_bespoke: boolean | null;
          last_invocation: string | null;
          last_run: string | null;
          name: string | null;
          organization_id: string | null;
          organization_name: string | null;
          priority: Database["public"]["Enums"]["priority_level"] | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "testcases_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      testcase_invocations_view: {
        Row: {
          bespoke_testcase_changeset_id: string | null;
          changeset_id: string | null;
          changeset_title: string | null;
          completed_at: string | null;
          created_at: string | null;
          duration: number | null;
          environment_id: string | null;
          environment_name: string | null;
          id: string | null;
          is_bespoke: boolean | null;
          logs: string | null;
          organization_id: string | null;
          organization_name: string | null;
          result: Json | null;
          started_at: string | null;
          status: Database["public"]["Enums"]["test_status"] | null;
          testcase_description: string | null;
          testcase_id: string | null;
          testcase_name: string | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "testcase_invocations_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_changeset_id_fkey";
            columns: ["changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_environment_id_fkey";
            columns: ["environment_id"];
            isOneToOne: false;
            referencedRelation: "environment_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_environment_id_fkey";
            columns: ["environment_id"];
            isOneToOne: false;
            referencedRelation: "environments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcase_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcase_details_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcase_invocations_testcase_id_fkey";
            columns: ["testcase_id"];
            isOneToOne: false;
            referencedRelation: "testcases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_changeset_id_fkey";
            columns: ["bespoke_testcase_changeset_id"];
            isOneToOne: false;
            referencedRelation: "changeset_simple";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "testcases_changeset_id_fkey";
            columns: ["bespoke_testcase_changeset_id"];
            isOneToOne: false;
            referencedRelation: "changesets";
            referencedColumns: ["id"];
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
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      check_organization_access: {
        Args: {
          org_id: string;
          required_roles: Database["public"]["Enums"]["user_role"][];
        };
        Returns: boolean;
      };
      check_same_organization: {
        Args: { check_user_id: string; check_org_id: string };
        Returns: boolean;
      };
      complete_testcase_run: {
        Args: {
          p_invocation_id: string;
          p_status: Database["public"]["Enums"]["test_status"];
          p_result?: Json;
          p_logs?: string;
        };
        Returns: string;
      };
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
      get_test_stats: {
        Args: { p_organization_id: string; p_time_range?: string };
        Returns: Json;
      };
      get_testcase_invocations: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          testcase_id: string;
          testcase_name: string;
          environment_id: string;
          environment_name: string;
          changeset_id: string;
          changeset_title: string;
          status: Database["public"]["Enums"]["test_status"];
          started_at: string;
          completed_at: string;
          duration_seconds: number;
          result: Json;
          logs: string;
          is_bespoke_test: boolean;
        }[];
      };
      get_user_organizations: {
        Args: Record<PropertyKey, never>;
        Returns: {
          user_id: string;
          user_email: string;
          full_name: string;
          organization_id: string;
          organization_name: string;
          role: Database["public"]["Enums"]["user_role"];
          is_default: boolean;
        }[];
      };
      import_all_changesets: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
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
      import_changeset_data: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
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
      import_pr_tm001: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      import_pr_tm002: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      import_simple_testcase: {
        Args: {
          org_id: string;
          testcase_id: string;
          testcase_name: string;
          description: string;
          changeset_id: string;
        };
        Returns: string;
      };
      import_testcase: {
        Args:
          | {
              org_id: string;
              testcase_id: string;
              testcase_name: string;
              testcase_description: string;
              duration: number;
              last_run: string;
              priority: Database["public"]["Enums"]["priority_level"];
              compatible_environments: string[];
            }
          | {
              org_id: string;
              testcase_id: string;
              testcase_name: string;
              testcase_description: string;
              duration: number;
              last_run: string;
              priority: Database["public"]["Enums"]["priority_level"];
              compatible_environments: string[];
              changeset_id?: string;
            };
        Returns: string;
      };
      import_testcase_with_changeset: {
        Args: {
          org_id: string;
          testcase_id: string;
          testcase_name: string;
          testcase_description: string;
          duration: number;
          last_run: string;
          priority: Database["public"]["Enums"]["priority_level"];
          compatible_environments: string[];
          changeset_id: string;
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
      run_testcase: {
        Args: {
          p_testcase_id: string;
          p_environment_id?: string;
          p_changeset_id?: string;
        };
        Returns: string;
      };
      same_organization: {
        Args: { target_user_id: string };
        Returns: boolean;
      };
      user_belongs_to_organization: {
        Args: { org_id: string };
        Returns: boolean;
      };
      user_can_access_changeset: {
        Args: { changeset_id: string };
        Returns: boolean;
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
      test_status:
        | "passed"
        | "failed"
        | "running"
        | "pending"
        | "proposed"
        | "queued";
      user_role: "owner" | "admin" | "member";
      verification_status: "verified" | "pending" | "failed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      changeset_status: ["open", "merged", "closed"],
      environment_status: ["active", "inactive", "maintenance"],
      environment_type: ["physical", "virtual"],
      file_change_type: ["added", "modified", "deleted"],
      priority_level: ["low", "medium", "high"],
      risk_level: ["low", "medium", "high", "critical"],
      test_status: [
        "passed",
        "failed",
        "running",
        "pending",
        "proposed",
        "queued",
      ],
      user_role: ["owner", "admin", "member"],
      verification_status: ["verified", "pending", "failed"],
    },
  },
} as const;
