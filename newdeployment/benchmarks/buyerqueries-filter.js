const n = 10000;
const queries = Array.from({length: n}, (_, i) => ({
    id: i,
    status: i % 3 === 0 ? 'accepted' : (i % 3 === 1 ? 'rejected' : 'pending'),
    created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
}));

const filterStatus = 'accepted';
const sortDate = 'newest';

console.time('Old Approach (Filter + Date Parsing Sort)');
for (let i = 0; i < 100; i++) {
    const filteredQueries = queries
        .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
        .sort((a, b) => sortDate === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));
}
console.timeEnd('Old Approach (Filter + Date Parsing Sort)');

console.time('New Approach (Filter + String Compare Sort)');
for (let i = 0; i < 100; i++) {
    const filteredQueries = queries
        .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
        .sort((a, b) => {
            if (a.created_at === b.created_at) return 0;
            if (sortDate === 'newest') {
                return a.created_at < b.created_at ? 1 : -1;
            } else {
                return a.created_at > b.created_at ? 1 : -1;
            }
        });
}
console.timeEnd('New Approach (Filter + String Compare Sort)');
