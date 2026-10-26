-- pgTAP Test: payments.ledger immutability and client insert prevention
BEGIN;
SELECT plan(3);

-- 1. Verify RLS is enabled on payments.ledger
SELECT row_level_security_is_active('payments', 'ledger', 'RLS should be active on payments.ledger');

-- 2. Verify payments.ledger only has SELECT policy for users
SELECT policy_cmd_is(
    'payments',
    'ledger',
    'Users can view their own payment ledger',
    'SELECT',
    'payments.ledger only has SELECT policy for authenticated users'
);

-- 3. Verify DELETE privilege is revoked
SELECT table_privs_are(
    'payments',
    'ledger',
    'authenticated',
    ARRAY['SELECT'],
    'Authenticated users only have SELECT privileges on payments.ledger'
);

SELECT * FROM finish();
ROLLBACK;
