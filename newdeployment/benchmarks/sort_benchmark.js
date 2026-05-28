const iterations = 10000;
const queries = Array.from({ length: iterations }, (_, i) => ({
    id: i,
    created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
}));

console.time('Date parsing');
const sorted1 = [...queries].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
console.timeEnd('Date parsing');

console.time('String comparison');
const sorted2 = [...queries].sort((a, b) => a.created_at < b.created_at ? 1 : (a.created_at > b.created_at ? -1 : 0));
console.timeEnd('String comparison');
