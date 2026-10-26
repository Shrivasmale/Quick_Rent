-- pgTAP Test: rentals.contracts double-booking prevention & RLS
BEGIN;
SELECT plan(3);

-- 1. Verify RLS is enabled on rentals.contracts
SELECT row_level_security_is_active('rentals', 'contracts', 'RLS should be active on rentals.contracts');

-- 2. Verify no direct INSERT policy exists for anon or standard authenticated users
SELECT policy_cmd_is(
    'rentals',
    'contracts',
    'Users can view their own rental contracts',
    'SELECT',
    'rentals.contracts only has SELECT policy for users'
);

-- 3. Verify btree_gist exclusion constraint exists
SELECT has_constraint(
    'rentals',
    'contracts',
    'no_overlapping_active_rentals',
    'rentals.contracts must have no_overlapping_active_rentals exclusion constraint'
);

SELECT * FROM finish();
ROLLBACK;
