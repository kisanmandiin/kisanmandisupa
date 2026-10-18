## 2024-10-18 - [Supabase Real-time Global N+1 Refetching Bottleneck]
**Learning:** The application was subscribing to global channel broadcasts ('public:queries') for all queries and manually re-fetching inside the client callback, meaning every user's client refetched their data whenever *any* inquiry changed globally.
**Action:** Always utilize database-level '`postgres_changes`' filters (`filter: '${filterField}=eq.${user.id}'`) and dynamic channel names (`public:queries:${user.id}:${activeTab}`) when setting up Supabase subscriptions to prevent O(N) redundant client network requests.
