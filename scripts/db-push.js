const { execSync } = require('child_process');

console.log('Running prisma generate...');
execSync('npx prisma generate', { stdio: 'inherit', cwd: '/vercel/share/v0-project' });

console.log('Running prisma db push...');
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', cwd: '/vercel/share/v0-project' });

console.log('Done! Database schema updated.');
