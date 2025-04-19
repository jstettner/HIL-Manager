

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."changeset_status" AS ENUM (
    'open',
    'merged',
    'closed'
);


ALTER TYPE "public"."changeset_status" OWNER TO "postgres";


CREATE TYPE "public"."environment_status" AS ENUM (
    'active',
    'inactive',
    'maintenance'
);


ALTER TYPE "public"."environment_status" OWNER TO "postgres";


CREATE TYPE "public"."environment_type" AS ENUM (
    'physical',
    'virtual'
);


ALTER TYPE "public"."environment_type" OWNER TO "postgres";


CREATE TYPE "public"."file_change_type" AS ENUM (
    'added',
    'modified',
    'deleted'
);


ALTER TYPE "public"."file_change_type" OWNER TO "postgres";


CREATE TYPE "public"."priority_level" AS ENUM (
    'low',
    'medium',
    'high'
);


ALTER TYPE "public"."priority_level" OWNER TO "postgres";


CREATE TYPE "public"."risk_level" AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);


ALTER TYPE "public"."risk_level" OWNER TO "postgres";


CREATE TYPE "public"."test_status" AS ENUM (
    'passed',
    'failed',
    'running',
    'pending'
);


ALTER TYPE "public"."test_status" OWNER TO "postgres";


CREATE TYPE "public"."user_role" AS ENUM (
    'owner',
    'admin',
    'member'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE TYPE "public"."verification_status" AS ENUM (
    'verified',
    'pending',
    'failed'
);


ALTER TYPE "public"."verification_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."complete_testcase_run"("p_invocation_id" "uuid", "p_status" "public"."test_status", "p_result" "jsonb" DEFAULT NULL::"jsonb", "p_logs" "text" DEFAULT NULL::"text") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_testcase_id uuid;
  v_changeset_id uuid;
BEGIN
  -- Update the invocation with completion info
  UPDATE testcase_invocations
  SET 
    status = p_status,
    completed_at = now(),
    result = p_result,
    logs = p_logs
  WHERE id = p_invocation_id
  RETURNING testcase_id, changeset_id INTO v_testcase_id, v_changeset_id;
  
  -- If this was a changeset-related test, update changeset_testcases if it exists
  IF v_changeset_id IS NOT NULL THEN
    UPDATE changeset_testcases
    SET 
      status = p_status,
      last_run = now()
    WHERE 
      changeset_id = v_changeset_id AND
      testcase_id = v_testcase_id;
  END IF;
  
  RETURN p_invocation_id;
END;
$$;


ALTER FUNCTION "public"."complete_testcase_run"("p_invocation_id" "uuid", "p_status" "public"."test_status", "p_result" "jsonb", "p_logs" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_sample_data"("org_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  env_id UUID;
  testcase_id UUID;
  changeset_id UUID;
BEGIN
  -- Create a sample environment
  env_id := public.import_environment(
    org_id,
    'sample-env-001',
    'Sample Environment',
    'This is a sample environment created for demonstration purposes.',
    'active',
    'virtual',
    '192.168.1.100',
    now(),
    '{"cpu": 4, "memory": 16, "storage": 512}'
  );
  
  -- Create a sample testcase
  testcase_id := public.import_testcase(
    org_id,
    'sample-test-001',
    'Sample Test Case',
    'This is a sample test case created for demonstration purposes.',
    60,  -- duration (seconds)
    now(),
    'medium',
    ARRAY['sample-env-001']
  );
  
  -- Create a sample changeset
  changeset_id := public.import_changeset(
    org_id,
    'sample-changeset-001',
    'Sample Changeset',
    'This is a sample changeset created for demonstration purposes.',
    'System',
    'open',
    now(),
    now()
  );
  
  -- Link the testcase to the changeset
  PERFORM public.import_changeset_testcase(
    changeset_id,
    'sample-test-001',
    'pending',
    now()
  );
  
  -- Add a bespoke test
  PERFORM public.import_bespoke_test(
    changeset_id,
    'Sample Bespoke Test',
    'This is a sample bespoke test.',
    'pending'
  );
  
  -- Add an impacted subsystem
  PERFORM public.import_impacted_subsystem(
    changeset_id,
    'Sample Subsystem',
    'medium',
    'This is a sample subsystem impact.'
  );
  
  -- Add a verification objective
  PERFORM public.import_verification_objective(
    changeset_id,
    'Sample Verification',
    'pending',
    'This is a sample verification objective.'
  );
  
  -- Add a plausible fallout
  PERFORM public.import_plausible_fallout(
    changeset_id,
    'Sample Fallout Scenario',
    'low',
    'This is a sample mitigation plan.'
  );
  
  -- Add a changed file
  PERFORM public.import_changed_file(
    changeset_id,
    'sample/path/to/file.ts',
    'added',
    100,
    0
  );
END;
$$;


ALTER FUNCTION "public"."create_sample_data"("org_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."derive_test_status"("changeset_id" "uuid") RETURNS "public"."test_status"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
DECLARE
  has_failed BOOLEAN;
  has_pending BOOLEAN;
  has_running BOOLEAN;
  test_status public.test_status;
BEGIN
  -- Check changeset testcases
  SELECT 
    EXISTS(SELECT 1 FROM public.changeset_testcases WHERE changeset_id = $1 AND status = 'failed'),
    EXISTS(SELECT 1 FROM public.changeset_testcases WHERE changeset_id = $1 AND status = 'pending'),
    EXISTS(SELECT 1 FROM public.changeset_testcases WHERE changeset_id = $1 AND status = 'running')
  INTO has_failed, has_pending, has_running;
  
  -- Check bespoke tests
  SELECT 
    has_failed OR EXISTS(SELECT 1 FROM public.bespoke_tests WHERE changeset_id = $1 AND status = 'failed'),
    has_pending OR EXISTS(SELECT 1 FROM public.bespoke_tests WHERE changeset_id = $1 AND status = 'pending'),
    has_running OR EXISTS(SELECT 1 FROM public.bespoke_tests WHERE changeset_id = $1 AND status = 'running')
  INTO has_failed, has_pending, has_running;
  
  -- Determine status
  IF has_failed THEN
    test_status := 'failed';
  ELSIF has_running THEN
    test_status := 'running';
  ELSIF has_pending THEN
    test_status := 'pending';
  ELSE
    test_status := 'passed';
  END IF;
  
  RETURN test_status;
END;
$_$;


ALTER FUNCTION "public"."derive_test_status"("changeset_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_uuid_from_string"("input_string" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
DECLARE
  hash BYTEA;
BEGIN
  hash := digest(input_string, 'md5');
  RETURN (
    substring(encode(hash, 'hex') from 1 for 8) || '-' ||
    substring(encode(hash, 'hex') from 9 for 4) || '-' ||
    '4' || substring(encode(hash, 'hex') from 13 for 3) || '-' ||
    substring('89ab', 1 + (get_byte(hash, 5) & 3), 1) ||
    substring(encode(hash, 'hex') from 17 for 3) || '-' ||
    substring(encode(hash, 'hex') from 21 for 12)
  )::UUID;
END;
$$;


ALTER FUNCTION "public"."generate_uuid_from_string"("input_string" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_test_stats"("p_organization_id" "uuid", "p_time_range" "text" DEFAULT '7 days'::"text") RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  start_date timestamp with time zone;
  result JSON;
BEGIN
  -- Determine the start date based on time range
  IF p_time_range = '24 hours' THEN
    start_date := now() - INTERVAL '24 hours';
  ELSIF p_time_range = '7 days' THEN
    start_date := now() - INTERVAL '7 days';
  ELSIF p_time_range = '30 days' THEN
    start_date := now() - INTERVAL '30 days';
  ELSE
    start_date := now() - INTERVAL '7 days'; -- Default to 7 days
  END IF;
  
  -- Get summary statistics
  WITH invocations AS (
    SELECT 
      ti.status,
      ti.started_at::date as run_date
    FROM testcase_invocations ti
    JOIN testcases t ON ti.testcase_id = t.id
    WHERE t.organization_id = p_organization_id
      AND ti.started_at >= start_date
  ),
  summary AS (
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'passed') as passed,
      COUNT(*) FILTER (WHERE status = 'failed') as failed,
      COUNT(*) FILTER (WHERE status = 'running') as running,
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      CASE 
        WHEN COUNT(*) > 0 THEN 
          ROUND((COUNT(*) FILTER (WHERE status = 'passed')::numeric / COUNT(*)::numeric) * 100)
        ELSE 0
      END as pass_rate
    FROM invocations
  ),
  daily_stats AS (
    SELECT
      run_date as date,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'passed') as passed,
      COUNT(*) FILTER (WHERE status = 'failed') as failed
    FROM invocations
    GROUP BY run_date
    ORDER BY run_date
  )
  SELECT json_build_object(
    'summary', (SELECT row_to_json(summary) FROM summary),
    'dailyStats', (SELECT json_agg(daily_stats) FROM daily_stats)
  ) INTO result;
  
  RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_test_stats"("p_organization_id" "uuid", "p_time_range" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_testcase_invocations"() RETURNS TABLE("id" "uuid", "testcase_id" "uuid", "testcase_name" "text", "environment_id" "uuid", "environment_name" "text", "changeset_id" "uuid", "changeset_title" "text", "status" "public"."test_status", "started_at" timestamp with time zone, "completed_at" timestamp with time zone, "duration_seconds" integer, "result" "jsonb", "logs" "text", "is_bespoke_test" boolean)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ti.id,
    ti.testcase_id,
    t.name,
    ti.environment_id,
    e.name,
    ti.changeset_id,
    c.title,
    ti.status,
    ti.started_at,
    ti.completed_at,
    CASE 
      WHEN ti.completed_at IS NOT NULL AND ti.started_at IS NOT NULL
      THEN EXTRACT(EPOCH FROM (ti.completed_at - ti.started_at))::integer
      ELSE ti.duration
    END,
    ti.result,
    ti.logs,
    CASE 
      WHEN t.changeset_id IS NOT NULL 
      THEN true 
      ELSE false 
    END
  FROM testcase_invocations ti
  JOIN testcases t ON ti.testcase_id = t.id
  LEFT JOIN environments e ON ti.environment_id = e.id
  LEFT JOIN changesets c ON ti.changeset_id = c.id;
END;
$$;


ALTER FUNCTION "public"."get_testcase_invocations"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_organization"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (NEW.id, auth.uid(), 'owner');
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_organization"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  default_org_id UUID;
BEGIN
  -- Create a new personal organization for the user
  INSERT INTO public.organizations (name)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Personal Organization'))
  RETURNING id INTO default_org_id;
  
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name, avatar_url, default_organization_id)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    default_org_id
  );
  
  -- Create sample data for the new organization
  PERFORM public.create_sample_data(default_org_id);
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_user_update"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.profiles
  SET 
    email = NEW.email,
    updated_at = now()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_user_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_bespoke_test"("changeset_id" "uuid", "name" "text", "description" "text", "status" "public"."test_status") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Generate a new ID for this bespoke test
  new_id := gen_random_uuid();
  
  -- Insert the bespoke test
  INSERT INTO public.bespoke_tests (
    id, changeset_id, name, description, status
  )
  VALUES (
    new_id, changeset_id, name, description, status
  )
  ON CONFLICT (id) DO UPDATE SET
    name = name,
    description = description,
    status = status,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_bespoke_test"("changeset_id" "uuid", "name" "text", "description" "text", "status" "public"."test_status") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_changed_file"("changeset_id" "uuid", "path" "text", "change_type" "public"."file_change_type", "lines_added" integer, "lines_removed" integer) RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Generate a new ID for this changed file
  new_id := gen_random_uuid();
  
  -- Insert the changed file
  INSERT INTO public.changed_files (
    id, changeset_id, path, change_type, lines_added, lines_removed
  )
  VALUES (
    new_id, changeset_id, path, change_type, lines_added, lines_removed
  )
  ON CONFLICT (id) DO UPDATE SET
    path = path,
    change_type = change_type,
    lines_added = lines_added,
    lines_removed = lines_removed,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_changed_file"("changeset_id" "uuid", "path" "text", "change_type" "public"."file_change_type", "lines_added" integer, "lines_removed" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_changeset"("org_id" "uuid", "changeset_id" "text", "changeset_title" "text", "changeset_description" "text", "changeset_author" "text", "changeset_status" "public"."changeset_status", "created_at" "text", "updated_at" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
  created_at_tz TIMESTAMP WITH TIME ZONE;
  updated_at_tz TIMESTAMP WITH TIME ZONE;
BEGIN
  new_id := public.generate_uuid_from_string(changeset_id);
  
  -- Convert ISO timestamps to timestamptz
  BEGIN
    created_at_tz := created_at::TIMESTAMP WITH TIME ZONE;
  EXCEPTION WHEN OTHERS THEN
    created_at_tz := now();
  END;
  
  BEGIN
    updated_at_tz := updated_at::TIMESTAMP WITH TIME ZONE;
  EXCEPTION WHEN OTHERS THEN
    updated_at_tz := now();
  END;
  
  -- Insert or update the changeset
  INSERT INTO public.changesets (
    id, title, description, author, status, organization_id, created_at, updated_at
  )
  VALUES (
    new_id, changeset_title, changeset_description, changeset_author, 
    changeset_status, org_id, created_at_tz, updated_at_tz
  )
  ON CONFLICT (id) DO UPDATE SET
    title = changeset_title,
    description = changeset_description,
    author = changeset_author,
    status = changeset_status,
    organization_id = org_id,
    updated_at = updated_at_tz;
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_changeset"("org_id" "uuid", "changeset_id" "text", "changeset_title" "text", "changeset_description" "text", "changeset_author" "text", "changeset_status" "public"."changeset_status", "created_at" "text", "updated_at" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_changeset_testcase"("changeset_id" "uuid", "testcase_id" "text", "status" "public"."test_status", "last_run" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  test_uuid UUID;
  new_id UUID;
  last_run_tz TIMESTAMP WITH TIME ZONE;
BEGIN
  test_uuid := public.generate_uuid_from_string(testcase_id);
  
  -- Convert ISO timestamp to timestamptz
  BEGIN
    last_run_tz := last_run::TIMESTAMP WITH TIME ZONE;
  EXCEPTION WHEN OTHERS THEN
    last_run_tz := NULL;
  END;
  
  -- Generate a new ID for this link
  new_id := gen_random_uuid();
  
  -- Insert or update the changeset testcase
  INSERT INTO public.changeset_testcases (
    id, changeset_id, testcase_id, status, last_run
  )
  VALUES (
    new_id, changeset_id, test_uuid, status, last_run_tz
  )
  ON CONFLICT (changeset_id, testcase_id) DO UPDATE SET
    status = status,
    last_run = last_run_tz,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_changeset_testcase"("changeset_id" "uuid", "testcase_id" "text", "status" "public"."test_status", "last_run" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_environment"("org_id" "uuid", "environment_id" "text", "environment_name" "text", "environment_description" "text", "environment_status" "public"."environment_status", "environment_type" "public"."environment_type", "ip_address" "text", "last_active" "text", "resources" "jsonb") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
  last_active_tz TIMESTAMP WITH TIME ZONE;
BEGIN
  new_id := public.generate_uuid_from_string(environment_id);
  
  -- Convert ISO timestamp to timestamptz
  BEGIN
    last_active_tz := last_active::TIMESTAMP WITH TIME ZONE;
  EXCEPTION WHEN OTHERS THEN
    last_active_tz := NULL;
  END;
  
  INSERT INTO public.environments (
    id, name, description, status, type, ip_address, 
    last_active, resources, organization_id
  )
  VALUES (
    new_id, environment_name, environment_description, environment_status,
    environment_type, ip_address, last_active_tz, resources, org_id
  )
  ON CONFLICT (id) DO UPDATE SET
    name = environment_name,
    description = environment_description,
    status = environment_status,
    type = environment_type,
    ip_address = ip_address,
    last_active = last_active_tz,
    resources = resources,
    organization_id = org_id,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_environment"("org_id" "uuid", "environment_id" "text", "environment_name" "text", "environment_description" "text", "environment_status" "public"."environment_status", "environment_type" "public"."environment_type", "ip_address" "text", "last_active" "text", "resources" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_impacted_subsystem"("changeset_id" "uuid", "name" "text", "risk_level" "public"."risk_level", "description" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Generate a new ID for this subsystem
  new_id := gen_random_uuid();
  
  -- Insert the impacted subsystem
  INSERT INTO public.impacted_subsystems (
    id, changeset_id, name, risk_level, description
  )
  VALUES (
    new_id, changeset_id, name, risk_level, description
  )
  ON CONFLICT (id) DO UPDATE SET
    name = name,
    risk_level = risk_level,
    description = description,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_impacted_subsystem"("changeset_id" "uuid", "name" "text", "risk_level" "public"."risk_level", "description" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_plausible_fallout"("changeset_id" "uuid", "scenario" "text", "severity" "public"."risk_level", "mitigation" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Generate a new ID for this fallout
  new_id := gen_random_uuid();
  
  -- Insert the plausible fallout
  INSERT INTO public.plausible_fallout (
    id, changeset_id, scenario, severity, mitigation
  )
  VALUES (
    new_id, changeset_id, scenario, severity, mitigation
  )
  ON CONFLICT (id) DO UPDATE SET
    scenario = scenario,
    severity = severity,
    mitigation = mitigation,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_plausible_fallout"("changeset_id" "uuid", "scenario" "text", "severity" "public"."risk_level", "mitigation" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_testcase"("org_id" "uuid", "testcase_id" "text", "testcase_name" "text", "testcase_description" "text", "duration" integer, "last_run" "text", "priority" "public"."priority_level", "compatible_environments" "text"[]) RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
  last_run_tz TIMESTAMP WITH TIME ZONE;
  env_id TEXT;
  env_uuid UUID;
BEGIN
  new_id := public.generate_uuid_from_string(testcase_id);
  
  -- Convert ISO timestamp to timestamptz
  BEGIN
    last_run_tz := last_run::TIMESTAMP WITH TIME ZONE;
  EXCEPTION WHEN OTHERS THEN
    last_run_tz := NULL;
  END;
  
  -- Insert or update the testcase
  INSERT INTO public.testcases (
    id, name, description, duration, last_run, priority, organization_id
  )
  VALUES (
    new_id, testcase_name, testcase_description, duration, last_run_tz, priority, org_id
  )
  ON CONFLICT (id) DO UPDATE SET
    name = testcase_name,
    description = testcase_description,
    duration = duration,
    last_run = last_run_tz,
    priority = priority,
    organization_id = org_id,
    updated_at = now();
  
  -- Link compatible environments
  IF compatible_environments IS NOT NULL THEN
    -- First, remove any existing links
    DELETE FROM public.testcase_environments WHERE testcase_id = new_id;
    
    -- Then add the new links
    FOREACH env_id IN ARRAY compatible_environments
    LOOP
      env_uuid := public.generate_uuid_from_string(env_id);
      
      INSERT INTO public.testcase_environments (testcase_id, environment_id)
      VALUES (new_id, env_uuid)
      ON CONFLICT (testcase_id, environment_id) DO NOTHING;
    END LOOP;
  END IF;
  
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_testcase"("org_id" "uuid", "testcase_id" "text", "testcase_name" "text", "testcase_description" "text", "duration" integer, "last_run" "text", "priority" "public"."priority_level", "compatible_environments" "text"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."import_verification_objective"("changeset_id" "uuid", "objective" "text", "status" "public"."verification_status", "notes" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Generate a new ID for this objective
  new_id := gen_random_uuid();
  
  -- Insert the verification objective
  INSERT INTO public.verification_objectives (
    id, changeset_id, objective, status, notes
  )
  VALUES (
    new_id, changeset_id, objective, status, notes
  )
  ON CONFLICT (id) DO UPDATE SET
    objective = objective,
    status = status,
    notes = notes,
    updated_at = now();
    
  RETURN new_id;
END;
$$;


ALTER FUNCTION "public"."import_verification_objective"("changeset_id" "uuid", "objective" "text", "status" "public"."verification_status", "notes" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."run_testcase"("p_testcase_id" "uuid", "p_environment_id" "uuid" DEFAULT NULL::"uuid", "p_changeset_id" "uuid" DEFAULT NULL::"uuid") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_invocation_id uuid;
BEGIN
  -- Insert a new invocation record
  INSERT INTO testcase_invocations (
    id,
    testcase_id,
    environment_id,
    changeset_id,
    status,
    started_at
  )
  VALUES (
    gen_random_uuid(),
    p_testcase_id,
    p_environment_id,
    p_changeset_id,
    'running',
    now()
  )
  RETURNING id INTO v_invocation_id;
  
  -- Update the testcase last_run time
  UPDATE testcases
  SET last_run = now()
  WHERE id = p_testcase_id;
  
  RETURN v_invocation_id;
END;
$$;


ALTER FUNCTION "public"."run_testcase"("p_testcase_id" "uuid", "p_environment_id" "uuid", "p_changeset_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_changeset_test_status"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.changesets 
  SET test_status = public.derive_test_status(NEW.changeset_id),
      updated_at = now()
  WHERE id = NEW.changeset_id;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_changeset_test_status"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_testcase_last_run"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  IF NEW.completed_at IS NOT NULL AND (OLD.completed_at IS NULL OR NEW.completed_at != OLD.completed_at) THEN
    UPDATE public.testcases
    SET last_run = NEW.completed_at,
        updated_at = now()
    WHERE id = NEW.testcase_id;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_testcase_last_run"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."user_is_in_changeset_organization"("changeset_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.changesets c
    JOIN public.organization_members om ON c.organization_id = om.organization_id
    WHERE c.id = changeset_id AND om.user_id = auth.uid()
  );
END;
$$;


ALTER FUNCTION "public"."user_is_in_changeset_organization"("changeset_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."bespoke_tests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "changeset_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "status" "public"."test_status" DEFAULT 'pending'::"public"."test_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."bespoke_tests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."changed_files" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "changeset_id" "uuid" NOT NULL,
    "path" "text" NOT NULL,
    "change_type" "public"."file_change_type" NOT NULL,
    "lines_added" integer DEFAULT 0 NOT NULL,
    "lines_removed" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."changed_files" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."changesets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "author" "text" NOT NULL,
    "status" "public"."changeset_status" DEFAULT 'open'::"public"."changeset_status" NOT NULL,
    "test_status" "public"."test_status",
    "organization_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."changesets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."changeset_simple" AS
 SELECT "c"."id",
    "c"."title",
    "c"."description",
    "c"."author",
    "c"."status",
    "c"."test_status",
    "c"."organization_id",
    "c"."created_at",
    "c"."updated_at",
    "o"."name" AS "organization_name"
   FROM ("public"."changesets" "c"
     JOIN "public"."organizations" "o" ON (("c"."organization_id" = "o"."id")));


ALTER TABLE "public"."changeset_simple" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."changeset_testcases" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "changeset_id" "uuid" NOT NULL,
    "testcase_id" "uuid" NOT NULL,
    "status" "public"."test_status" DEFAULT 'pending'::"public"."test_status" NOT NULL,
    "last_run" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."changeset_testcases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."environments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "status" "public"."environment_status" DEFAULT 'inactive'::"public"."environment_status" NOT NULL,
    "type" "public"."environment_type" DEFAULT 'physical'::"public"."environment_type" NOT NULL,
    "ip_address" "text",
    "last_active" timestamp with time zone,
    "resources" "jsonb" DEFAULT '{"cpu": 0, "memory": 0, "storage": 0}'::"jsonb" NOT NULL,
    "organization_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."environments" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."environment_details" AS
 SELECT "e"."id",
    "e"."name",
    "e"."description",
    "e"."status",
    "e"."type",
    "e"."ip_address",
    "e"."last_active",
    "e"."resources",
    "e"."organization_id",
    "e"."created_at",
    "e"."updated_at",
    "o"."name" AS "organization_name"
   FROM ("public"."environments" "e"
     JOIN "public"."organizations" "o" ON (("e"."organization_id" = "o"."id")));


ALTER TABLE "public"."environment_details" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."impacted_subsystems" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "changeset_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "risk_level" "public"."risk_level" DEFAULT 'low'::"public"."risk_level" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."impacted_subsystems" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organization_members" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "organization_id" "uuid",
    "user_id" "uuid",
    "role" "public"."user_role" DEFAULT 'member'::"public"."user_role" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."organization_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."plausible_fallout" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "changeset_id" "uuid" NOT NULL,
    "scenario" "text" NOT NULL,
    "severity" "public"."risk_level" DEFAULT 'low'::"public"."risk_level" NOT NULL,
    "mitigation" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."plausible_fallout" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text",
    "full_name" "text",
    "avatar_url" "text",
    "default_organization_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."testcase_details" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "name",
    NULL::"text" AS "description",
    NULL::integer AS "duration",
    NULL::timestamp with time zone AS "last_run",
    NULL::"public"."priority_level" AS "priority",
    NULL::"uuid" AS "organization_id",
    NULL::timestamp with time zone AS "created_at",
    NULL::timestamp with time zone AS "updated_at",
    NULL::"text" AS "organization_name",
    NULL::"uuid"[] AS "environment_ids";


ALTER TABLE "public"."testcase_details" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."testcase_details_view" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "name",
    NULL::"text" AS "description",
    NULL::integer AS "duration",
    NULL::timestamp with time zone AS "last_run",
    NULL::"public"."priority_level" AS "priority",
    NULL::"uuid" AS "organization_id",
    NULL::timestamp with time zone AS "created_at",
    NULL::timestamp with time zone AS "updated_at",
    NULL::"uuid" AS "changeset_id",
    NULL::"text" AS "organization_name",
    NULL::"uuid"[] AS "compatible_environment_ids",
    NULL::"text"[] AS "compatible_environment_names",
    NULL::"jsonb" AS "last_invocation",
    NULL::boolean AS "is_bespoke",
    NULL::"text" AS "bespoke_changeset_title";


ALTER TABLE "public"."testcase_details_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."testcase_environments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "testcase_id" "uuid" NOT NULL,
    "environment_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."testcase_environments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."testcase_invocations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "testcase_id" "uuid" NOT NULL,
    "environment_id" "uuid",
    "changeset_id" "uuid",
    "status" "public"."test_status" DEFAULT 'pending'::"public"."test_status" NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"(),
    "completed_at" timestamp with time zone,
    "duration" integer,
    "result" "jsonb",
    "logs" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."testcase_invocations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."testcases" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "duration" integer DEFAULT 0 NOT NULL,
    "last_run" timestamp with time zone,
    "priority" "public"."priority_level" DEFAULT 'medium'::"public"."priority_level" NOT NULL,
    "organization_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "changeset_id" "uuid"
);


ALTER TABLE "public"."testcases" OWNER TO "postgres";


COMMENT ON COLUMN "public"."testcases"."changeset_id" IS 'For bespoke testcases, references the changeset that spawned them';



CREATE OR REPLACE VIEW "public"."testcase_invocations_view" AS
 SELECT "ti"."id",
    "ti"."testcase_id",
    "t"."name" AS "testcase_name",
    "t"."description" AS "testcase_description",
    "ti"."environment_id",
    "e"."name" AS "environment_name",
    "ti"."changeset_id",
    "c"."title" AS "changeset_title",
    "ti"."status",
    "ti"."started_at",
    "ti"."completed_at",
    "ti"."duration",
    "ti"."result",
    "ti"."logs",
    "ti"."created_at",
    "ti"."updated_at",
    "t"."organization_id",
    "o"."name" AS "organization_name",
    "t"."changeset_id" AS "bespoke_testcase_changeset_id",
        CASE
            WHEN ("t"."changeset_id" IS NOT NULL) THEN true
            ELSE false
        END AS "is_bespoke"
   FROM (((("public"."testcase_invocations" "ti"
     JOIN "public"."testcases" "t" ON (("ti"."testcase_id" = "t"."id")))
     JOIN "public"."organizations" "o" ON (("t"."organization_id" = "o"."id")))
     LEFT JOIN "public"."environments" "e" ON (("ti"."environment_id" = "e"."id")))
     LEFT JOIN "public"."changesets" "c" ON (("ti"."changeset_id" = "c"."id")));


ALTER TABLE "public"."testcase_invocations_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."user_current_organization" AS
 SELECT "u"."id" AS "user_id",
    "p"."default_organization_id" AS "organization_id",
    "o"."name" AS "organization_name",
    "om"."role"
   FROM ((("auth"."users" "u"
     JOIN "public"."profiles" "p" ON (("u"."id" = "p"."id")))
     JOIN "public"."organization_members" "om" ON ((("u"."id" = "om"."user_id") AND ("p"."default_organization_id" = "om"."organization_id"))))
     JOIN "public"."organizations" "o" ON (("om"."organization_id" = "o"."id")));


ALTER TABLE "public"."user_current_organization" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."user_organizations" AS
 SELECT "u"."id" AS "user_id",
    "u"."email" AS "user_email",
    "p"."full_name",
    "o"."id" AS "organization_id",
    "o"."name" AS "organization_name",
    "om"."role",
    ("o"."id" = "p"."default_organization_id") AS "is_default"
   FROM ((("auth"."users" "u"
     JOIN "public"."profiles" "p" ON (("u"."id" = "p"."id")))
     JOIN "public"."organization_members" "om" ON (("u"."id" = "om"."user_id")))
     JOIN "public"."organizations" "o" ON (("om"."organization_id" = "o"."id")));


ALTER TABLE "public"."user_organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."verification_objectives" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "changeset_id" "uuid" NOT NULL,
    "objective" "text" NOT NULL,
    "status" "public"."verification_status" DEFAULT 'pending'::"public"."verification_status" NOT NULL,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."verification_objectives" OWNER TO "postgres";


ALTER TABLE ONLY "public"."bespoke_tests"
    ADD CONSTRAINT "bespoke_tests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."changed_files"
    ADD CONSTRAINT "changed_files_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."changeset_testcases"
    ADD CONSTRAINT "changeset_testcases_changeset_id_testcase_id_key" UNIQUE ("changeset_id", "testcase_id");



ALTER TABLE ONLY "public"."changeset_testcases"
    ADD CONSTRAINT "changeset_testcases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."changesets"
    ADD CONSTRAINT "changesets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."environments"
    ADD CONSTRAINT "environments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."impacted_subsystems"
    ADD CONSTRAINT "impacted_subsystems_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_organization_id_user_id_key" UNIQUE ("organization_id", "user_id");



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."plausible_fallout"
    ADD CONSTRAINT "plausible_fallout_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."testcase_environments"
    ADD CONSTRAINT "testcase_environments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."testcase_environments"
    ADD CONSTRAINT "testcase_environments_testcase_id_environment_id_key" UNIQUE ("testcase_id", "environment_id");



ALTER TABLE ONLY "public"."testcase_invocations"
    ADD CONSTRAINT "testcase_invocations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."testcases"
    ADD CONSTRAINT "testcases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."verification_objectives"
    ADD CONSTRAINT "verification_objectives_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_testcase_invocations_changeset_id" ON "public"."testcase_invocations" USING "btree" ("changeset_id");



CREATE INDEX "idx_testcase_invocations_environment_id" ON "public"."testcase_invocations" USING "btree" ("environment_id");



CREATE INDEX "idx_testcase_invocations_status" ON "public"."testcase_invocations" USING "btree" ("status");



CREATE INDEX "idx_testcase_invocations_testcase_id" ON "public"."testcase_invocations" USING "btree" ("testcase_id");



CREATE OR REPLACE VIEW "public"."testcase_details" AS
 SELECT "t"."id",
    "t"."name",
    "t"."description",
    "t"."duration",
    "t"."last_run",
    "t"."priority",
    "t"."organization_id",
    "t"."created_at",
    "t"."updated_at",
    "o"."name" AS "organization_name",
    "array_agg"("te"."environment_id") FILTER (WHERE ("te"."environment_id" IS NOT NULL)) AS "environment_ids"
   FROM (("public"."testcases" "t"
     JOIN "public"."organizations" "o" ON (("t"."organization_id" = "o"."id")))
     LEFT JOIN "public"."testcase_environments" "te" ON (("t"."id" = "te"."testcase_id")))
  GROUP BY "t"."id", "o"."name", "o"."id";



CREATE OR REPLACE VIEW "public"."testcase_details_view" AS
 SELECT "t"."id",
    "t"."name",
    "t"."description",
    "t"."duration",
    "t"."last_run",
    "t"."priority",
    "t"."organization_id",
    "t"."created_at",
    "t"."updated_at",
    "t"."changeset_id",
    "o"."name" AS "organization_name",
    "array_agg"(DISTINCT "te"."environment_id") FILTER (WHERE ("te"."environment_id" IS NOT NULL)) AS "compatible_environment_ids",
    "array_agg"(DISTINCT "e"."name") FILTER (WHERE ("e"."name" IS NOT NULL)) AS "compatible_environment_names",
    ( SELECT "jsonb_build_object"('id', "ti"."id", 'status', "ti"."status", 'started_at', "ti"."started_at", 'completed_at', "ti"."completed_at", 'environment_id', "ti"."environment_id", 'environment_name', "e_last"."name", 'changeset_id', "ti"."changeset_id", 'changeset_title', "c_last"."title") AS "jsonb_build_object"
           FROM (("public"."testcase_invocations" "ti"
             LEFT JOIN "public"."environments" "e_last" ON (("ti"."environment_id" = "e_last"."id")))
             LEFT JOIN "public"."changesets" "c_last" ON (("ti"."changeset_id" = "c_last"."id")))
          WHERE ("ti"."testcase_id" = "t"."id")
          ORDER BY "ti"."completed_at" DESC NULLS LAST, "ti"."started_at" DESC
         LIMIT 1) AS "last_invocation",
        CASE
            WHEN ("t"."changeset_id" IS NOT NULL) THEN true
            ELSE false
        END AS "is_bespoke",
    "bc"."title" AS "bespoke_changeset_title"
   FROM (((("public"."testcases" "t"
     JOIN "public"."organizations" "o" ON (("t"."organization_id" = "o"."id")))
     LEFT JOIN "public"."testcase_environments" "te" ON (("t"."id" = "te"."testcase_id")))
     LEFT JOIN "public"."environments" "e" ON (("te"."environment_id" = "e"."id")))
     LEFT JOIN "public"."changesets" "bc" ON (("t"."changeset_id" = "bc"."id")))
  GROUP BY "t"."id", "o"."name", "o"."id", "bc"."title";



CREATE OR REPLACE TRIGGER "on_organization_created" AFTER INSERT ON "public"."organizations" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_organization"();



CREATE OR REPLACE TRIGGER "set_updated_at_bespoke_tests" BEFORE UPDATE ON "public"."bespoke_tests" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_changed_files" BEFORE UPDATE ON "public"."changed_files" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_changeset_testcases" BEFORE UPDATE ON "public"."changeset_testcases" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_changesets" BEFORE UPDATE ON "public"."changesets" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_environments" BEFORE UPDATE ON "public"."environments" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_impacted_subsystems" BEFORE UPDATE ON "public"."impacted_subsystems" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_organization_members" BEFORE UPDATE ON "public"."organization_members" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_organizations" BEFORE UPDATE ON "public"."organizations" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_plausible_fallout" BEFORE UPDATE ON "public"."plausible_fallout" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_profiles" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_testcases" BEFORE UPDATE ON "public"."testcases" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_updated_at_verification_objectives" BEFORE UPDATE ON "public"."verification_objectives" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "update_changeset_status_from_bespoke_tests" AFTER INSERT OR DELETE OR UPDATE ON "public"."bespoke_tests" FOR EACH ROW EXECUTE FUNCTION "public"."update_changeset_test_status"();



CREATE OR REPLACE TRIGGER "update_changeset_status_from_testcases" AFTER INSERT OR DELETE OR UPDATE ON "public"."changeset_testcases" FOR EACH ROW EXECUTE FUNCTION "public"."update_changeset_test_status"();



CREATE OR REPLACE TRIGGER "update_testcase_last_run_trigger" AFTER INSERT OR UPDATE ON "public"."testcase_invocations" FOR EACH ROW EXECUTE FUNCTION "public"."update_testcase_last_run"();



ALTER TABLE ONLY "public"."bespoke_tests"
    ADD CONSTRAINT "bespoke_tests_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."changed_files"
    ADD CONSTRAINT "changed_files_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."changeset_testcases"
    ADD CONSTRAINT "changeset_testcases_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."changeset_testcases"
    ADD CONSTRAINT "changeset_testcases_testcase_id_fkey" FOREIGN KEY ("testcase_id") REFERENCES "public"."testcases"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."changesets"
    ADD CONSTRAINT "changesets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."environments"
    ADD CONSTRAINT "environments_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."impacted_subsystems"
    ADD CONSTRAINT "impacted_subsystems_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."plausible_fallout"
    ADD CONSTRAINT "plausible_fallout_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_default_organization_id_fkey" FOREIGN KEY ("default_organization_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."testcase_environments"
    ADD CONSTRAINT "testcase_environments_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "public"."environments"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."testcase_environments"
    ADD CONSTRAINT "testcase_environments_testcase_id_fkey" FOREIGN KEY ("testcase_id") REFERENCES "public"."testcases"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."testcase_invocations"
    ADD CONSTRAINT "testcase_invocations_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."testcase_invocations"
    ADD CONSTRAINT "testcase_invocations_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "public"."environments"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."testcase_invocations"
    ADD CONSTRAINT "testcase_invocations_testcase_id_fkey" FOREIGN KEY ("testcase_id") REFERENCES "public"."testcases"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."testcases"
    ADD CONSTRAINT "testcases_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."testcases"
    ADD CONSTRAINT "testcases_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."verification_objectives"
    ADD CONSTRAINT "verification_objectives_changeset_id_fkey" FOREIGN KEY ("changeset_id") REFERENCES "public"."changesets"("id") ON DELETE CASCADE;



CREATE POLICY "Bespoke tests are deletable by organization members" ON "public"."bespoke_tests" FOR DELETE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Bespoke tests are insertable by organization members" ON "public"."bespoke_tests" FOR INSERT WITH CHECK ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Bespoke tests are updatable by organization members" ON "public"."bespoke_tests" FOR UPDATE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Bespoke tests are viewable by organization members" ON "public"."bespoke_tests" FOR SELECT USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changed files are deletable by organization members" ON "public"."changed_files" FOR DELETE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changed files are insertable by organization members" ON "public"."changed_files" FOR INSERT WITH CHECK ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changed files are updatable by organization members" ON "public"."changed_files" FOR UPDATE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changed files are viewable by organization members" ON "public"."changed_files" FOR SELECT USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changeset testcases are deletable by organization members" ON "public"."changeset_testcases" FOR DELETE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changeset testcases are insertable by organization members" ON "public"."changeset_testcases" FOR INSERT WITH CHECK ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changeset testcases are updatable by organization members" ON "public"."changeset_testcases" FOR UPDATE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changeset testcases are viewable by organization members" ON "public"."changeset_testcases" FOR SELECT USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Changesets are deletable by organization admins and owners" ON "public"."changesets" FOR DELETE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE (("organization_members"."organization_id" = "changesets"."organization_id") AND ("organization_members"."role" = ANY (ARRAY['admin'::"public"."user_role", 'owner'::"public"."user_role"]))))));



CREATE POLICY "Changesets are insertable by organization members" ON "public"."changesets" FOR INSERT WITH CHECK (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "changesets"."organization_id"))));



CREATE POLICY "Changesets are updatable by organization members" ON "public"."changesets" FOR UPDATE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "changesets"."organization_id"))));



CREATE POLICY "Changesets are viewable by organization members" ON "public"."changesets" FOR SELECT USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "changesets"."organization_id"))));



CREATE POLICY "Environments are deletable by organization admins and owners" ON "public"."environments" FOR DELETE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE (("organization_members"."organization_id" = "environments"."organization_id") AND ("organization_members"."role" = ANY (ARRAY['admin'::"public"."user_role", 'owner'::"public"."user_role"]))))));



CREATE POLICY "Environments are insertable by organization members" ON "public"."environments" FOR INSERT WITH CHECK (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "environments"."organization_id"))));



CREATE POLICY "Environments are updatable by organization members" ON "public"."environments" FOR UPDATE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "environments"."organization_id"))));



CREATE POLICY "Environments are viewable by organization members" ON "public"."environments" FOR SELECT USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "environments"."organization_id"))));



CREATE POLICY "Impacted subsystems are deletable by organization members" ON "public"."impacted_subsystems" FOR DELETE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Impacted subsystems are insertable by organization members" ON "public"."impacted_subsystems" FOR INSERT WITH CHECK ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Impacted subsystems are updatable by organization members" ON "public"."impacted_subsystems" FOR UPDATE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Impacted subsystems are viewable by organization members" ON "public"."impacted_subsystems" FOR SELECT USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Organization members are deletable by organization owners and a" ON "public"."organization_members" FOR DELETE USING (("auth"."uid"() IN ( SELECT "organization_members_1"."user_id"
   FROM "public"."organization_members" "organization_members_1"
  WHERE (("organization_members_1"."organization_id" = "organization_members_1"."organization_id") AND ("organization_members_1"."role" = ANY (ARRAY['owner'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "Organization members are insertable by organization owners and " ON "public"."organization_members" FOR INSERT WITH CHECK (("auth"."uid"() IN ( SELECT "organization_members_1"."user_id"
   FROM "public"."organization_members" "organization_members_1"
  WHERE (("organization_members_1"."organization_id" = "organization_members_1"."organization_id") AND ("organization_members_1"."role" = ANY (ARRAY['owner'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "Organization members are updatable by organization owners and a" ON "public"."organization_members" FOR UPDATE USING (("auth"."uid"() IN ( SELECT "organization_members_1"."user_id"
   FROM "public"."organization_members" "organization_members_1"
  WHERE (("organization_members_1"."organization_id" = "organization_members_1"."organization_id") AND ("organization_members_1"."role" = ANY (ARRAY['owner'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "Organization members are viewable by organization members" ON "public"."organization_members" FOR SELECT USING (("auth"."uid"() IN ( SELECT "organization_members_1"."user_id"
   FROM "public"."organization_members" "organization_members_1"
  WHERE ("organization_members_1"."organization_id" = "organization_members_1"."organization_id"))));



CREATE POLICY "Organization members can view other members' profiles" ON "public"."profiles" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM ("public"."organization_members" "om1"
     JOIN "public"."organization_members" "om2" ON (("om1"."organization_id" = "om2"."organization_id")))
  WHERE (("om1"."user_id" = "auth"."uid"()) AND ("om2"."user_id" = "profiles"."id")))));



CREATE POLICY "Organizations are deletable by organization owners" ON "public"."organizations" FOR DELETE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE (("organization_members"."organization_id" = "organization_members"."id") AND ("organization_members"."role" = 'owner'::"public"."user_role")))));



CREATE POLICY "Organizations are insertable by authenticated users" ON "public"."organizations" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Organizations are updatable by organization owners and admins" ON "public"."organizations" FOR UPDATE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE (("organization_members"."organization_id" = "organization_members"."id") AND ("organization_members"."role" = ANY (ARRAY['owner'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "Organizations are viewable by organization members" ON "public"."organizations" FOR SELECT USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "organization_members"."id"))));



CREATE POLICY "Plausible fallout are deletable by organization members" ON "public"."plausible_fallout" FOR DELETE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Plausible fallout are insertable by organization members" ON "public"."plausible_fallout" FOR INSERT WITH CHECK ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Plausible fallout are updatable by organization members" ON "public"."plausible_fallout" FOR UPDATE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Plausible fallout are viewable by organization members" ON "public"."plausible_fallout" FOR SELECT USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Testcase environments are deletable by organization members" ON "public"."testcase_environments" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."testcases"
  WHERE (("testcases"."id" = "testcase_environments"."testcase_id") AND ("auth"."uid"() IN ( SELECT "organization_members"."user_id"
           FROM "public"."organization_members"
          WHERE ("organization_members"."organization_id" = "testcases"."organization_id")))))));



CREATE POLICY "Testcase environments are insertable by organization members" ON "public"."testcase_environments" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."testcases"
  WHERE (("testcases"."id" = "testcase_environments"."testcase_id") AND ("auth"."uid"() IN ( SELECT "organization_members"."user_id"
           FROM "public"."organization_members"
          WHERE ("organization_members"."organization_id" = "testcases"."organization_id")))))));



CREATE POLICY "Testcase environments are viewable by organization members" ON "public"."testcase_environments" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."testcases"
  WHERE (("testcases"."id" = "testcase_environments"."testcase_id") AND ("auth"."uid"() IN ( SELECT "organization_members"."user_id"
           FROM "public"."organization_members"
          WHERE ("organization_members"."organization_id" = "testcases"."organization_id")))))));



CREATE POLICY "Testcase invocations are deletable by organization admins and o" ON "public"."testcase_invocations" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM ("public"."testcases" "t"
     JOIN "public"."organization_members" "om" ON (("t"."organization_id" = "om"."organization_id")))
  WHERE (("t"."id" = "testcase_invocations"."testcase_id") AND ("om"."user_id" = "auth"."uid"()) AND ("om"."role" = ANY (ARRAY['admin'::"public"."user_role", 'owner'::"public"."user_role"]))))));



CREATE POLICY "Testcase invocations are insertable by organization members" ON "public"."testcase_invocations" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM ("public"."testcases" "t"
     JOIN "public"."organization_members" "om" ON (("t"."organization_id" = "om"."organization_id")))
  WHERE (("t"."id" = "testcase_invocations"."testcase_id") AND ("om"."user_id" = "auth"."uid"())))));



CREATE POLICY "Testcase invocations are updatable by organization members" ON "public"."testcase_invocations" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM ("public"."testcases" "t"
     JOIN "public"."organization_members" "om" ON (("t"."organization_id" = "om"."organization_id")))
  WHERE (("t"."id" = "testcase_invocations"."testcase_id") AND ("om"."user_id" = "auth"."uid"())))));



CREATE POLICY "Testcase invocations are viewable by organization members" ON "public"."testcase_invocations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM ("public"."testcases" "t"
     JOIN "public"."organization_members" "om" ON (("t"."organization_id" = "om"."organization_id")))
  WHERE (("t"."id" = "testcase_invocations"."testcase_id") AND ("om"."user_id" = "auth"."uid"())))));



CREATE POLICY "Testcases are deletable by organization admins and owners" ON "public"."testcases" FOR DELETE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE (("organization_members"."organization_id" = "testcases"."organization_id") AND ("organization_members"."role" = ANY (ARRAY['admin'::"public"."user_role", 'owner'::"public"."user_role"]))))));



CREATE POLICY "Testcases are insertable by organization members" ON "public"."testcases" FOR INSERT WITH CHECK (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "testcases"."organization_id"))));



CREATE POLICY "Testcases are updatable by organization members" ON "public"."testcases" FOR UPDATE USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "testcases"."organization_id"))));



CREATE POLICY "Testcases are viewable by organization members" ON "public"."testcases" FOR SELECT USING (("auth"."uid"() IN ( SELECT "organization_members"."user_id"
   FROM "public"."organization_members"
  WHERE ("organization_members"."organization_id" = "testcases"."organization_id"))));



CREATE POLICY "Users can update their own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Verification objectives are deletable by organization members" ON "public"."verification_objectives" FOR DELETE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Verification objectives are insertable by organization members" ON "public"."verification_objectives" FOR INSERT WITH CHECK ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Verification objectives are updatable by organization members" ON "public"."verification_objectives" FOR UPDATE USING ("public"."user_is_in_changeset_organization"("changeset_id"));



CREATE POLICY "Verification objectives are viewable by organization members" ON "public"."verification_objectives" FOR SELECT USING ("public"."user_is_in_changeset_organization"("changeset_id"));



ALTER TABLE "public"."bespoke_tests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."changed_files" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."changeset_testcases" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."changesets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."environments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."impacted_subsystems" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organization_members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."plausible_fallout" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."testcase_environments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."testcase_invocations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."testcases" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."verification_objectives" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."complete_testcase_run"("p_invocation_id" "uuid", "p_status" "public"."test_status", "p_result" "jsonb", "p_logs" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."complete_testcase_run"("p_invocation_id" "uuid", "p_status" "public"."test_status", "p_result" "jsonb", "p_logs" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."complete_testcase_run"("p_invocation_id" "uuid", "p_status" "public"."test_status", "p_result" "jsonb", "p_logs" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."create_sample_data"("org_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."create_sample_data"("org_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_sample_data"("org_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."derive_test_status"("changeset_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."derive_test_status"("changeset_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."derive_test_status"("changeset_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_uuid_from_string"("input_string" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."generate_uuid_from_string"("input_string" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_uuid_from_string"("input_string" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_test_stats"("p_organization_id" "uuid", "p_time_range" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_test_stats"("p_organization_id" "uuid", "p_time_range" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_test_stats"("p_organization_id" "uuid", "p_time_range" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_testcase_invocations"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_testcase_invocations"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_testcase_invocations"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_organization"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_organization"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_organization"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_user_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_user_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_user_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."import_bespoke_test"("changeset_id" "uuid", "name" "text", "description" "text", "status" "public"."test_status") TO "anon";
GRANT ALL ON FUNCTION "public"."import_bespoke_test"("changeset_id" "uuid", "name" "text", "description" "text", "status" "public"."test_status") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_bespoke_test"("changeset_id" "uuid", "name" "text", "description" "text", "status" "public"."test_status") TO "service_role";



GRANT ALL ON FUNCTION "public"."import_changed_file"("changeset_id" "uuid", "path" "text", "change_type" "public"."file_change_type", "lines_added" integer, "lines_removed" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."import_changed_file"("changeset_id" "uuid", "path" "text", "change_type" "public"."file_change_type", "lines_added" integer, "lines_removed" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_changed_file"("changeset_id" "uuid", "path" "text", "change_type" "public"."file_change_type", "lines_added" integer, "lines_removed" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."import_changeset"("org_id" "uuid", "changeset_id" "text", "changeset_title" "text", "changeset_description" "text", "changeset_author" "text", "changeset_status" "public"."changeset_status", "created_at" "text", "updated_at" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."import_changeset"("org_id" "uuid", "changeset_id" "text", "changeset_title" "text", "changeset_description" "text", "changeset_author" "text", "changeset_status" "public"."changeset_status", "created_at" "text", "updated_at" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_changeset"("org_id" "uuid", "changeset_id" "text", "changeset_title" "text", "changeset_description" "text", "changeset_author" "text", "changeset_status" "public"."changeset_status", "created_at" "text", "updated_at" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."import_changeset_testcase"("changeset_id" "uuid", "testcase_id" "text", "status" "public"."test_status", "last_run" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."import_changeset_testcase"("changeset_id" "uuid", "testcase_id" "text", "status" "public"."test_status", "last_run" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_changeset_testcase"("changeset_id" "uuid", "testcase_id" "text", "status" "public"."test_status", "last_run" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."import_environment"("org_id" "uuid", "environment_id" "text", "environment_name" "text", "environment_description" "text", "environment_status" "public"."environment_status", "environment_type" "public"."environment_type", "ip_address" "text", "last_active" "text", "resources" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."import_environment"("org_id" "uuid", "environment_id" "text", "environment_name" "text", "environment_description" "text", "environment_status" "public"."environment_status", "environment_type" "public"."environment_type", "ip_address" "text", "last_active" "text", "resources" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_environment"("org_id" "uuid", "environment_id" "text", "environment_name" "text", "environment_description" "text", "environment_status" "public"."environment_status", "environment_type" "public"."environment_type", "ip_address" "text", "last_active" "text", "resources" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."import_impacted_subsystem"("changeset_id" "uuid", "name" "text", "risk_level" "public"."risk_level", "description" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."import_impacted_subsystem"("changeset_id" "uuid", "name" "text", "risk_level" "public"."risk_level", "description" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_impacted_subsystem"("changeset_id" "uuid", "name" "text", "risk_level" "public"."risk_level", "description" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."import_plausible_fallout"("changeset_id" "uuid", "scenario" "text", "severity" "public"."risk_level", "mitigation" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."import_plausible_fallout"("changeset_id" "uuid", "scenario" "text", "severity" "public"."risk_level", "mitigation" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_plausible_fallout"("changeset_id" "uuid", "scenario" "text", "severity" "public"."risk_level", "mitigation" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."import_testcase"("org_id" "uuid", "testcase_id" "text", "testcase_name" "text", "testcase_description" "text", "duration" integer, "last_run" "text", "priority" "public"."priority_level", "compatible_environments" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."import_testcase"("org_id" "uuid", "testcase_id" "text", "testcase_name" "text", "testcase_description" "text", "duration" integer, "last_run" "text", "priority" "public"."priority_level", "compatible_environments" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_testcase"("org_id" "uuid", "testcase_id" "text", "testcase_name" "text", "testcase_description" "text", "duration" integer, "last_run" "text", "priority" "public"."priority_level", "compatible_environments" "text"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."import_verification_objective"("changeset_id" "uuid", "objective" "text", "status" "public"."verification_status", "notes" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."import_verification_objective"("changeset_id" "uuid", "objective" "text", "status" "public"."verification_status", "notes" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."import_verification_objective"("changeset_id" "uuid", "objective" "text", "status" "public"."verification_status", "notes" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."run_testcase"("p_testcase_id" "uuid", "p_environment_id" "uuid", "p_changeset_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."run_testcase"("p_testcase_id" "uuid", "p_environment_id" "uuid", "p_changeset_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."run_testcase"("p_testcase_id" "uuid", "p_environment_id" "uuid", "p_changeset_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_changeset_test_status"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_changeset_test_status"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_changeset_test_status"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_testcase_last_run"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_testcase_last_run"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_testcase_last_run"() TO "service_role";



GRANT ALL ON FUNCTION "public"."user_is_in_changeset_organization"("changeset_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."user_is_in_changeset_organization"("changeset_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."user_is_in_changeset_organization"("changeset_id" "uuid") TO "service_role";


















GRANT ALL ON TABLE "public"."bespoke_tests" TO "anon";
GRANT ALL ON TABLE "public"."bespoke_tests" TO "authenticated";
GRANT ALL ON TABLE "public"."bespoke_tests" TO "service_role";



GRANT ALL ON TABLE "public"."changed_files" TO "anon";
GRANT ALL ON TABLE "public"."changed_files" TO "authenticated";
GRANT ALL ON TABLE "public"."changed_files" TO "service_role";



GRANT ALL ON TABLE "public"."changesets" TO "anon";
GRANT ALL ON TABLE "public"."changesets" TO "authenticated";
GRANT ALL ON TABLE "public"."changesets" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."changeset_simple" TO "anon";
GRANT ALL ON TABLE "public"."changeset_simple" TO "authenticated";
GRANT ALL ON TABLE "public"."changeset_simple" TO "service_role";



GRANT ALL ON TABLE "public"."changeset_testcases" TO "anon";
GRANT ALL ON TABLE "public"."changeset_testcases" TO "authenticated";
GRANT ALL ON TABLE "public"."changeset_testcases" TO "service_role";



GRANT ALL ON TABLE "public"."environments" TO "anon";
GRANT ALL ON TABLE "public"."environments" TO "authenticated";
GRANT ALL ON TABLE "public"."environments" TO "service_role";



GRANT ALL ON TABLE "public"."environment_details" TO "anon";
GRANT ALL ON TABLE "public"."environment_details" TO "authenticated";
GRANT ALL ON TABLE "public"."environment_details" TO "service_role";



GRANT ALL ON TABLE "public"."impacted_subsystems" TO "anon";
GRANT ALL ON TABLE "public"."impacted_subsystems" TO "authenticated";
GRANT ALL ON TABLE "public"."impacted_subsystems" TO "service_role";



GRANT ALL ON TABLE "public"."organization_members" TO "anon";
GRANT ALL ON TABLE "public"."organization_members" TO "authenticated";
GRANT ALL ON TABLE "public"."organization_members" TO "service_role";



GRANT ALL ON TABLE "public"."plausible_fallout" TO "anon";
GRANT ALL ON TABLE "public"."plausible_fallout" TO "authenticated";
GRANT ALL ON TABLE "public"."plausible_fallout" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."testcase_details" TO "anon";
GRANT ALL ON TABLE "public"."testcase_details" TO "authenticated";
GRANT ALL ON TABLE "public"."testcase_details" TO "service_role";



GRANT ALL ON TABLE "public"."testcase_details_view" TO "anon";
GRANT ALL ON TABLE "public"."testcase_details_view" TO "authenticated";
GRANT ALL ON TABLE "public"."testcase_details_view" TO "service_role";



GRANT ALL ON TABLE "public"."testcase_environments" TO "anon";
GRANT ALL ON TABLE "public"."testcase_environments" TO "authenticated";
GRANT ALL ON TABLE "public"."testcase_environments" TO "service_role";



GRANT ALL ON TABLE "public"."testcase_invocations" TO "anon";
GRANT ALL ON TABLE "public"."testcase_invocations" TO "authenticated";
GRANT ALL ON TABLE "public"."testcase_invocations" TO "service_role";



GRANT ALL ON TABLE "public"."testcases" TO "anon";
GRANT ALL ON TABLE "public"."testcases" TO "authenticated";
GRANT ALL ON TABLE "public"."testcases" TO "service_role";



GRANT ALL ON TABLE "public"."testcase_invocations_view" TO "anon";
GRANT ALL ON TABLE "public"."testcase_invocations_view" TO "authenticated";
GRANT ALL ON TABLE "public"."testcase_invocations_view" TO "service_role";



GRANT ALL ON TABLE "public"."user_current_organization" TO "anon";
GRANT ALL ON TABLE "public"."user_current_organization" TO "authenticated";
GRANT ALL ON TABLE "public"."user_current_organization" TO "service_role";



GRANT ALL ON TABLE "public"."user_organizations" TO "anon";
GRANT ALL ON TABLE "public"."user_organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."user_organizations" TO "service_role";



GRANT ALL ON TABLE "public"."verification_objectives" TO "anon";
GRANT ALL ON TABLE "public"."verification_objectives" TO "authenticated";
GRANT ALL ON TABLE "public"."verification_objectives" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
