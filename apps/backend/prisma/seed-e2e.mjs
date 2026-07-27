import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
const email = process.env.E2E_USER_EMAIL ?? 'buyer@example.com';
const password = process.env.E2E_USER_PASSWORD ?? 'valid-password';
const passwordHash = await argon2.hash(password);

try {
  await prisma.user.upsert({
    where: { email },
    update: { displayName: 'E2E 구매자', passwordHash },
    create: { email, displayName: 'E2E 구매자', passwordHash },
  });
} finally {
  await prisma.$disconnect();
}
