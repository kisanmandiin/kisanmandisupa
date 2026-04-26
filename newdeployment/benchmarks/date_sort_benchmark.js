const generateDates = (count) => {
    const dates = [];
    for (let i = 0; i < count; i++) {
        dates.push(new Date(Date.now() - Math.random() * 10000000000).toISOString());
    }
    return dates;
};

const dates1 = generateDates(10000);
const dates2 = [...dates1];
const dates3 = [...dates1];

console.time('Date parsing sort');
for(let i=0; i<10; i++) {
    [...dates1].sort((a, b) => new Date(b) - new Date(a));
}
console.timeEnd('Date parsing sort');

console.time('String localeCompare sort');
for(let i=0; i<10; i++) {
    [...dates2].sort((a, b) => b.localeCompare(a));
}
console.timeEnd('String localeCompare sort');

console.time('String comparison sort');
for(let i=0; i<10; i++) {
    [...dates3].sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
}
console.timeEnd('String comparison sort');
