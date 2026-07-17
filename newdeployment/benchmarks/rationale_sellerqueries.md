# Performance Rationale: SellerQueries Real-time Optimization

## 💡 What
The `SellerQueries` component was optimized to use dynamic channel names and database-level `postgres_changes` filters based on the active tab (either `farmer_uid` or `buyer_uid`).

## 🎯 Why
Previously, the component subscribed to `public:queries` globally. This meant the client received a websocket payload and triggered a subsequent `fetchQueries` N+1 call for **every single inquiry change** happening on the entire platform, regardless of whether it involved the logged-in user. This scales extremely poorly, causing unnecessary websocket traffic, memory churn, and database thrashing.

## 📊 Impact
* **Websocket Traffic:** Reduced from O(Total Platform Changes) to O(User Specific Changes).
* **Network & DB Load:** Eliminates unnecessary refetching. `fetchQueries` is now only called when a change actually pertains to the user.
* **Client Performance:** Prevents React re-renders triggered by irrelevant global state changes.

## 🔬 Measurement
This optimization can be logically verified via the Supabase real-time documentation for `postgres_changes` filters. Testing it at scale involves observing websocket frames in the browser's Network tab under load—only relevant events should now be received by the client.
