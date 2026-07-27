import { expect, test } from '@playwright/test';

test('Auth 세션의 로그인, 복원, 로그아웃 흐름', async ({ page }) => {
  await page.goto('/account');
  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();

  await page.getByLabel('이메일').fill('buyer@example.com');
  await page.getByLabel('비밀번호').fill('wrong-password');
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page.getByRole('alert')).toContainText('이메일 또는 비밀번호를 확인해 주세요.');

  await page.getByLabel('비밀번호').fill('valid-password');
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL(/\/account$/);
  await expect(page.getByRole('heading', { name: 'E2E 구매자' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'E2E 구매자' })).toBeVisible();

  await page.getByRole('button', { name: '로그아웃' }).click();
  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();

  await page.goto('/account');
  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
});
