import {test , expect} from '@playwright/test'
import User from '../models/User'
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';
test("should be able to register to our application", async({page})=>{

    const user = new User();
    const signupPage = new SignupPage();
     
    await signupPage.load(page);
    await signupPage.signup(page, user);

    const todoPage= new TodoPage();

    const welcomeMessage= todoPage.getWelcomeMessageElement(page);
    await expect(welcomeMessage).toBeVisible();
})

// import { test, expect } from '@playwright/test';

// test("should be able to register to our application", async ({ page }) => {
//     // 1️⃣ Go to the signup page
//     await page.goto('https://todo.qacart.com/signup');

//     // 2️⃣ Wait for the first field to appear to ensure page loaded
//     // await page.waitForSelector('[data-testid=first-name]');

//     // 3️⃣ Fill the registration form
//     await page.fill('[data-testid=first-name]', 'QAcart');
//     await page.fill('[data-testid=last-name]', 'Awesome');

//     // Generate a unique email to avoid conflicts
//     const timestamp = Date.now();
//     const email = `test${timestamp}@example.com`;
//     await page.fill('[data-testid=email]', email);

//     await page.fill('[data-testid=password]', 'Test1234');
//     await page.fill('[data-testid=confirm-password]', 'Test1234');

//     // 4️⃣ Click the submit button
//     await page.locator('[data-testid=submit]').click();

//     // 5️⃣ Wait for the welcome message to appear and verify it
//     const welcomeMessage = page.locator('[data-testid=welcome]');
//     await expect(welcomeMessage).toBeVisible();
// });

