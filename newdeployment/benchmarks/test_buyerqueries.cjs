const { performance } = require('perf_hooks');

const generateQueries = (count) => {
    const statuses = ['pending', 'accepted', 'rejected'];
    return Array.from({ length: count }, (_, i) => {
        const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
        return {
            id: i,
            status: statuses[i % 3],
            created_at: date.toISOString()
        };
    });
};

const queries = generateQueries(10000);

function testUnoptimized() {
    const start = performance.now();
    const filterStatus = 'pending';
    const sortDate = 'newest';

    for (let i = 0; i < 10; i++) {
        const filteredQueries = queries
            .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
            .sort((a, b) => sortDate === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));
    }
    const end = performance.now();
    return end - start;
}

function testOptimized() {
    const start = performance.now();
    const filterStatus = 'pending';
    const sortDate = 'newest';

    for (let i = 0; i < 10; i++) {
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
    const end = performance.now();
    return end - start;
}

console.log(`Unoptimized sorting 10x: ${testUnoptimized().toFixed(2)}ms`);
console.log(`Optimized sorting 10x: ${testOptimized().toFixed(2)}ms`);
