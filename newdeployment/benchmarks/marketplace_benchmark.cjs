const performance = require('perf_hooks').performance;

// Mock data
const mockProducts = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    category: i % 2 === 0 ? 'All Produce' : 'Fruits',
    description: `This is a description for product ${i} with some details.`,
    price: (Math.random() * 100).toFixed(2)
}));

const search = 'product 5';
const category = 'All Produce';
const sort = 'price_asc';

function filterProductsUseEffectStyle(allProducts) {
    let filtered = [...allProducts];
    if (category !== "All Produce") {
        filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            (p.description || "").toLowerCase().includes(lowerSearch)
        );
    }
    if (sort === 'price_asc') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'price_desc') {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return filtered;
}

function filterProductsUseMemoStyle(allProducts) {
    let filtered = allProducts;
    if (category !== "All Produce") {
        filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            (p.description || "").toLowerCase().includes(lowerSearch)
        );
    }

    // Only spread and sort if we need to sort and we have elements
    if (filtered.length > 0 && (sort === 'price_asc' || sort === 'price_desc')) {
        filtered = [...filtered];
        if (sort === 'price_asc') {
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === 'price_desc') {
            filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
    }
    return filtered;
}


// Warmup
for (let i = 0; i < 10; i++) {
    filterProductsUseEffectStyle(mockProducts);
    filterProductsUseMemoStyle(mockProducts);
}

const runs = 100;

let t0 = performance.now();
for (let i = 0; i < runs; i++) {
    filterProductsUseEffectStyle(mockProducts);
}
let t1 = performance.now();
const useEffectAvg = (t1 - t0) / runs;

t0 = performance.now();
for (let i = 0; i < runs; i++) {
    filterProductsUseMemoStyle(mockProducts);
}
t1 = performance.now();
const useMemoAvg = (t1 - t0) / runs;

console.log(`Unoptimized (always clones array) average: ${useEffectAvg.toFixed(2)} ms`);
console.log(`Optimized (defers clone) average: ${useMemoAvg.toFixed(2)} ms`);
console.log(`Improvement: ${((useEffectAvg - useMemoAvg) / useEffectAvg * 100).toFixed(2)}%`);
