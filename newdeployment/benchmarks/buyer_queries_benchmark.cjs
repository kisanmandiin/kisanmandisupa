const { performance } = require('perf_hooks');

const generateData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        status: i % 2 === 0 ? 'pending' : 'accepted',
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    }));
};

const items = generateData(10000);

const measure = (name, fn) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name}: ${(end - start).toFixed(2)}ms`);
};

measure('Baseline (Date parsing)', () => {
    [...items]
        .filter(q => q.status === 'pending')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

measure('Optimized (String comparison)', () => {
    [...items]
        .filter(q => q.status === 'pending')
        .sort((a, b) => a.created_at < b.created_at ? 1 : -1);
});
