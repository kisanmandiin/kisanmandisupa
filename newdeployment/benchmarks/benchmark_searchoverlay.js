import { performance } from 'perf_hooks';

// Simulate the data
const generateProducts = (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            id: i,
            name: `Product ${i} Name`,
            category: i % 2 === 0 ? 'Vegetables' : 'Fruits',
            description: `This is a description for product ${i} which is very nice and good.`
        });
    }
    return products;
};

const allProducts = generateProducts(10000);
const searchTerm = "vegetables";

// Old approach: simulate what happens in the useEffect (the filter part)
function testOld() {
    const start = performance.now();
    const lower = searchTerm.toLowerCase();
    const results = allProducts.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        (p.category || "").toLowerCase().includes(lower) ||
        (p.description || "").toLowerCase().includes(lower)
    );
    const end = performance.now();
    return end - start;
}

// Just measuring the filter itself (the bottleneck). But the real bottleneck is the double-render!
// In a React environment, avoiding useEffect prevents an entire component re-render.
// The filter itself takes some time.

let totalOld = 0;
for (let i = 0; i < 100; i++) {
    totalOld += testOld();
}
console.log(`Average filter time for 10,000 items: ${(totalOld / 100).toFixed(2)} ms`);
