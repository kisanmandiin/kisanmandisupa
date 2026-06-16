# Performance Rationale: SellerQueries Real-time Subscription Optimization

## The Problem
The `SellerQueries` component previously subscribed to real-time updates on the `queries` table without any filtering:
```javascript
.on('postgres_changes', { event: '*', schema: 'public', table: 'queries' }, ...)
```
This meant that *every single time any user in the application submitted, accepted, or rejected an inquiry*, a websocket event was fired to every connected client viewing the `SellerQueries` component.
Upon receiving this global event, the component blindly fired off a `fetchQueries()` call to the Supabase backend.

This created an O(N*M) scaling issue where N is the rate of global query changes and M is the number of connected users viewing the dashboard. It caused significant unnecessary network traffic and database load, and pointless re-renders for users whose data hadn't actually changed.

## The Solution
A database-level filter was added to the `postgres_changes` configuration:
```javascript
const filterColumn = activeTab === 'received' ? 'farmer_uid' : 'buyer_uid';
...
filter: `${filterColumn}=eq.${user.id}`
```

## Expected Impact
1. **Network Bandwidth:** Drastically reduced websocket traffic. Clients now only receive events relevant to their own `uid` acting as a buyer or seller.
2. **Database Load:** Eliminated the N+1 refetch storm. `fetchQueries()` is now only invoked when a relevant record actually changes.
3. **Client Performance:** Prevents unnecessary main-thread execution and React re-renders caused by handling irrelevant websocket payloads and state updates.