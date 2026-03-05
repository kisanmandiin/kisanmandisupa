
## 2024-05-15 - Optimize filtered products state
**Learning:** React components \`Marketplace\` and \`SearchOverlay\` were suffering from unnecessary re-renders because derived state (\`filteredProducts\`) was stored in \`useState\` and updated via \`useEffect\` instead of being computed directly during render with \`useMemo\`.
**Action:** Replace \`useState\` and \`useEffect\` pairs with \`useMemo\` for derived state to avoid double render cycles when filtering and sorting large lists of products.
