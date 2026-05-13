const performance = require('perf_hooks').performance;

// Mock data
const mockQueries = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'accepted' : 'rejected',
    created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
}));

const filterStatus = 'all';
const sortDate = 'newest';

function unoptimized(queries) {
    return queries
        .filter(q => filterStatus === 'all' || (q.status || 'pending') === filterStatus)
        .sort((a, b) => sortDate === 'newest' ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at));
}

function optimized(queries) {
    return queries
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

// Warmup
for (let i = 0; i < 10; i++) {
    unoptimized([...mockQueries]);
    optimized([...mockQueries]);
}

const runs = 100;

let t0 = performance.now();
for (let i = 0; i < runs; i++) {
    unoptimized(mockQueries); // using same array is fine for unoptimized because filter creates a new array
}
let t1 = performance.now();
const unoptimizedAvg = (t1 - t0) / runs;

t0 = performance.now();
for (let i = 0; i < runs; i++) {
    optimized(mockQueries);
}
t1 = performance.now();
const optimizedAvg = (t1 - t0) / runs;

console.log(`Unoptimized average: ${unoptimizedAvg.toFixed(2)} ms`);
console.log(`Optimized average: ${optimizedAvg.toFixed(2)} ms`);
console.log(`Improvement: ${((unoptimizedAvg - optimizedAvg) / unoptimizedAvg * 100).toFixed(2)}%`);
