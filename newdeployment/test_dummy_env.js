import fs from 'fs';
fs.writeFileSync('newdeployment/.env.local', 'VITE_SUPABASE_URL=http://localhost:54321\nVITE_SUPABASE_ANON_KEY=dummy\n');
