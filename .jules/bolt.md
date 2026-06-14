## 2025-02-28 - Supabase Consolidation Join Optimization
**Learning:** Avoid client-side manual mapping for related tables when building features in Supabase. The N+1 query pattern where the client requests base records, computes foreign keys, and sends a second network query for joined fields creates artificial latency. Supabase's automatic foreign key joins (`.select('*, relation:table!fk(fields)')`) solves this efficiently at the database level.
**Action:** Always prefer `.select()` joins over multiple consecutive sequential queries in React `useEffect` data loading functions.
