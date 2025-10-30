import { test, expect, Browser } from '@playwright/test';

// These should be stored in environment variables, not hardcoded.
const USER_A = {
  email: process.env.TEST_USER_A_EMAIL!,
  password: process.env.TEST_USER_A_PASSWORD!,
  name: 'Test User A',
};

const USER_B = {
  email: process.env.TEST_USER_B_EMAIL!,
  password: process.env.TEST_USER_B_PASSWORD!,
  name: 'Test User B',
};

test.describe('Poker Room E2E Flow', () => {
  test('ユーザーAがルームを作成し、ユーザーBが参加できること', async ({ browser }) => {
    // This test assumes you have test users set up in Supabase Auth.
    // It also assumes the login page is at '/login' and it navigates to '/' on success.
    
    // --- User A's actions ---
    const userAContext = await browser.newContext();
    const pageA = await userAContext.newPage();

    await pageA.goto('/login');
    await pageA.getByLabel('Email').fill(USER_A.email);
    await pageA.getByLabel('Password').fill(USER_A.password);
    await pageA.getByRole('button', { name: 'Log In' }).click();
    await expect(pageA).toHaveURL('/');

    await pageA.getByRole('link', { name: /play now/i }).first().click(); // Click Poker link
    await expect(pageA.getByRole('button', { name: 'Create New Room' })).toBeVisible();
    await pageA.getByRole('button', { name: 'Create New Room' }).click();
    
    const roomName = `Test Room ${Date.now()}`;
    await pageA.getByLabel('Room Name').fill(roomName);
    await pageA.getByRole('button', { name: 'Create' }).click();

    await expect(pageA.getByText(`Room: ${roomName}`)).toBeVisible();
    await expect(pageA.getByText('Waiting for other players...')).toBeVisible();
    const roomUrl = pageA.url();

    // --- User B's actions ---
    const userBContext = await browser.newContext();
    const pageB = await userBContext.newPage();

    await pageB.goto('/login');
    await pageB.getByLabel('Email').fill(USER_B.email);
    await pageB.getByLabel('Password').fill(USER_B.password);
    await pageB.getByRole('button', { name: 'Log In' }).click();
    await expect(pageB).toHaveURL('/');

    await pageB.goto(roomUrl);

    // Assert both players are visible on both pages
    await expect(pageB.getByText(USER_A.name)).toBeVisible();
    await expect(pageB.getByText(USER_B.name)).toBeVisible();
    await expect(pageA.getByText(USER_B.name)).toBeVisible();

    await userAContext.close();
    await userBContext.close();
  });
});
