import { execSync } from 'child_process';

try {
  console.log('Running prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit', cwd: '/vercel/share/v0-project' });
  console.log('Running prisma db push...');
  execSync('npx prisma db push --force-reset', { stdio: 'inherit', cwd: '/vercel/share/v0-project' });
  console.log('Database schema pushed successfully!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
