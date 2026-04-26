const generateQueries = (count) => {
    const queries = [];
    const statuses = ['pending', 'accepted', 'rejected'];
    for (let i = 0; i < count; i++) {
        queries.push({
            id: i,
            status: statuses[i % 3],
            created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        });
    }
    return queries;
};

const queries = generateQueries(10000);
const filterStatus = 'pending';
const sortDate = 'newest';

console.time('Filter and Sort');
for(let i=0; i<10; i++) {
    const filteredQueries = queries
        .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
        .sort((a, b) => sortDate === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));
}
console.timeEnd('Filter and Sort');
