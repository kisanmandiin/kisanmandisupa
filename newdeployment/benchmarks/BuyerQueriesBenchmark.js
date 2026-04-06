function benchmark() {
  const queries = Array.from({ length: 10000 }).map((_, i) => ({
    id: i,
    status: i % 3 === 0 ? 'accepted' : i % 3 === 1 ? 'rejected' : 'pending',
    created_at: new Date(Date.now() - i * 10000).toISOString()
  }));

  const start = performance.now();

  const filterStatus = 'accepted';
  const sortDate = 'newest';

  const filteredQueries = queries
        .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
        .sort((a, b) => sortDate === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));

  const end = performance.now();
  console.log(`Filtering and sorting 10,000 items took ${end - start}ms`);
}

benchmark();
