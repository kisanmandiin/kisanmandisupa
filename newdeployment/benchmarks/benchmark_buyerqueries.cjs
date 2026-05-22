const numItems = 10000;
const queries = [];
for (let i = 0; i < numItems; i++) {
    queries.push({
        id: i,
        status: i % 2 === 0 ? 'accepted' : 'pending',
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    });
}

function runDateSort() {
    return queries.filter(q => q.status === 'accepted')
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function runStringSort() {
    return queries.filter(q => q.status === 'accepted')
                  .sort((a, b) => b.created_at < a.created_at ? -1 : (b.created_at > a.created_at ? 1 : 0));
}

console.time("DateSort");
for(let i=0; i<10; i++) runDateSort();
console.timeEnd("DateSort");

console.time("StringSort");
for(let i=0; i<10; i++) runStringSort();
console.timeEnd("StringSort");
