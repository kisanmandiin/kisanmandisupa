# SellerQueries Real-time Subscription Optimization

**Problem:** The `SellerQueries` component previously used an unfiltered global `postgres_changes` subscription. This meant every time ANY query was updated by ANY user across the entire platform, ALL connected clients received an event and unnecessarily refetched their local queries. This causes an O(N) refetch bottleneck.

**Solution:** Added database-level filters to the subscription (`filter: ${activeTab === 'received' ? 'farmer_uid' : 'buyer_uid'}=eq.${user.id}`) and created unique dynamic channel names (`queries_${user.id}_${activeTab}`). This ensures clients only receive events and trigger refetches for updates relevant to them.
