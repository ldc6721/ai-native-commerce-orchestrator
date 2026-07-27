import { defineConfig, devices } from '@playwright/test';

const databaseUrl = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/commerce';
const redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: [
    {
      command: 'npm exec prisma migrate deploy && node prisma/seed-e2e.mjs && npm run start',
      cwd: '../backend',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      env: {
        DATABASE_URL: databaseUrl,
        REDIS_URL: redisUrl,
        E2E_USER_EMAIL: 'buyer@example.com',
        E2E_USER_PASSWORD: 'valid-password',
        NODE_ENV: 'test',
      },
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 4173',
      port: 4173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
