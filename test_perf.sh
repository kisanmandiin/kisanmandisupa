echo "Testing SearchOverlay.jsx for unnecessary re-renders..."
node -e "
const fs = require('fs');
const content = fs.readFileSync('newdeployment/src/components/SearchOverlay.jsx', 'utf8');
if (content.includes('filteredProducts = useMemo')) {
    console.log('SearchOverlay.jsx uses useMemo for filtering');
} else {
    console.log('SearchOverlay.jsx does NOT use useMemo');
}
"
