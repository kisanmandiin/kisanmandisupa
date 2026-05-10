const { performance } = require('perf_hooks');

const generateData = (count) => {
    const data = [];
    const statuses = ['pending', 'accepted', 'rejected'];
    const now = Date.now();
    for (let i = 0; i < count; i++) {
        data.push({
            id: i,
            status: statuses[i % 3],
            created_at: new Date(now - Math.random() * 10000000000).toISOString(),
        });
    }
    return data;
};

const queries = generateData(10000);
const filterStatus = 'pending';
const sortDate = 'newest';

// Original
const startOriginal = performance.now();
const filteredOriginal = queries
    .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
    .sort((a, b) => sortDate === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));
const endOriginal = performance.now();
console.log(`Original: ${endOriginal - startOriginal} ms`);

// Optimized
const startOptimized = performance.now();
const filteredOptimized = queries
    .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
    .sort((a, b) => {
        if (sortDate === 'newest') {
            return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
        } else {
            return a.created_at > b.created_at ? 1 : a.created_at < b.created_at ? -1 : 0;
        }
    });
const endOptimized = performance.now();
console.log(`Optimized: ${endOptimized - startOptimized} ms`);
