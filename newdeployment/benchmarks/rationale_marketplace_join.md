# Marketplace N+1 Query Optimization

## Rationale
The `Marketplace.jsx` component previously exhibited an N+1 query pattern by fetching products and then manually extracting unique `seller_uid`s to sequentially fetch associated user records. This introduces redundant network round trips, directly impacting rendering latency, especially on slower connections or with larger datasets.

## Solution
We migrated the logic to a single consolidated Supabase query utilizing a foreign key join:
```javascript
.select('*, seller:users!seller_uid(id, name, city, state, profileImage)')
```

## Impact
- **Network Requests:** Reduced from 2 consecutive calls down to 1 call per fetch operation.
- **Latency:** Halves network overhead related to initial load or category switches.
- **Code Complexity:** Removes the manual iteration mapping code to merge user data, reducing client-side execution time (though negligible, it produces cleaner code).