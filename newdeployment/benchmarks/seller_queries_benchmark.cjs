const { performance } = require('perf_hooks');

const generateData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        status: i % 2 === 0 ? 'pending' : 'accepted',
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        buyer_uid: `buyer_${i % 100}`,
        farmer_uid: `farmer_${i % 100}`
    }));
};

const items = generateData(10000);

const measure = (name, fn) => {
    let results = [];
    // warmup
    for (let i = 0; i < 5; i++) fn();

    for (let i = 0; i < 10; i++) {
        const start = performance.now();
        fn();
        const end = performance.now();
        results.push(end - start);
    }
    const avg = results.reduce((a, b) => a + b, 0) / results.length;
    console.log(`${name}: ${avg.toFixed(2)}ms`);
};

// Assuming activeTab logic and basic render filtering

measure('Unoptimized map/filter/sort (mock render block)', () => {
   // Assuming simple pass through as it renders directly from state currently
   const data = items.map(q => ({...q, status: q.status || 'pending'}));
});
