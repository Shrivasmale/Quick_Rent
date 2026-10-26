-- 20261026000001_extensions_and_schemas.sql
-- Enables required PostgreSQL extensions and creates domain schemas

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gist";
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Microservice Domain Isolation Schemas
CREATE SCHEMA IF NOT EXISTS rentals;
CREATE SCHEMA IF NOT EXISTS payments;
CREATE SCHEMA IF NOT EXISTS audit;

-- Grant usage to standard roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA rentals TO authenticated, service_role;
GRANT USAGE ON SCHEMA payments TO authenticated, service_role;
GRANT USAGE ON SCHEMA audit TO service_role;
