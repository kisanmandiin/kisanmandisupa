// Basic benchmark script to verify string comparison vs Date parsing for sorting
const iterations = 10000;
const dates = Array.from({ length: iterations }, () => {
    const start = new Date(2023, 0, 1).getTime();
    const end = new Date().getTime();
    return new Date(start + Math.random() * (end - start)).toISOString();
});

console.log(`Benchmarking sort for ${iterations} ISO date strings...`);

// Test 1: Date object parsing
const startParse = performance.now();
const sortedParse = [...dates].sort((a, b) => new Date(b) - new Date(a));
const endParse = performance.now();
console.log(`Date parsing sort took: ${(endParse - startParse).toFixed(2)}ms`);

// Test 2: String comparison
const startStr = performance.now();
const sortedStr = [...dates].sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
const endStr = performance.now();
console.log(`String comparison sort took: ${(endStr - startStr).toFixed(2)}ms`);

// Verify correctness
let correct = true;
for (let i = 0; i < iterations; i++) {
    if (sortedParse[i] !== sortedStr[i]) {
        correct = false;
        break;
    }
}
console.log(`Results match: ${correct}`);
