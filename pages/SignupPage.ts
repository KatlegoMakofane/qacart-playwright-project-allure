import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";

export default class SignupPage{

    async load(page:Page){
        await page.goto('/signup')
    }

    private get firstNameInput(){
        return `[data-testid=first-name]`
    }

    private get lastNameInput(){
        return `[data-testid=last-name]`
    }

    private get emailInput(){
        return `[data-testid=email]`
    }

    private get passwordInput(){
        return `[data-testid=password]`
    }
    
    private get confirmPasswordInput(){
        return `[data-testid=confirm-password]`
    }
    
    private get submitButton(){
        return `[data-testid=submit]`
    }

    
    async signup(page: Page, user:User){
        await page.fill(this.firstNameInput,user.getFirstName());
        await page.fill(this.lastNameInput,user.getLastName());
        await page.fill(this.emailInput,user.getEmail());
        await page.fill(this.passwordInput,user.getPassword());
        await page.fill(this.confirmPasswordInput,user.getPassword());
        await page.click(this.submitButton);
    }

    async signupUsingApi(request:APIRequestContext,user:User , context: BrowserContext){
        const response = await new UserApi().signup(request, user);
          
            const reponseBody = await response.json();
            const access_token = reponseBody.access_token;
            const firstName = reponseBody.firstName;
            const userID = reponseBody.userID;
        
            await context.addCookies([
                 {
                     name: 'access_token',
                     value: access_token,
                     url:'https://todo.qacart.com'
                 },
                 {
                    name:'firstName',
                    value:firstName,
                    url:'https://todo.qacart.com'
                 },
                 {
                    name:'userID',
                    value: userID,
                    url:'https://todo.qacart.com'
                 }
            ]);
    }
}