const performance = require('perf_hooks').performance;

// Mock data
const mockProducts = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    category: i % 2 === 0 ? 'Vegetables' : 'Fruits',
    description: `This is a description for product ${i} with some details.`
}));

const searchTerm = 'product 5';

function filterProducts(products, term) {
    if (!term) return [];
    const lower = term.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        (p.category || "").toLowerCase().includes(lower) ||
        (p.description || "").toLowerCase().includes(lower)
    );
}

// Warmup
for (let i = 0; i < 10; i++) {
    filterProducts(mockProducts, searchTerm);
}

const runs = 100;

let t0 = performance.now();
for (let i = 0; i < runs; i++) {
    filterProducts(mockProducts, searchTerm);
}
let t1 = performance.now();
const avg = (t1 - t0) / runs;

console.log(`Live Filter average: ${avg.toFixed(2)} ms for 10,000 products`);
