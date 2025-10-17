import { BasePage } from "../page-objects/base/BasePage";
import {expect} from "@playwright/test";
import path from 'path';
import { faker } from '@faker-js/faker';

const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/';
// https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList

export class JobTitlePage extends BasePage {

    get addBtn() { return this.page.locator('//button[normalize-space()="Add"]'); }
    get jobTitleInput() { return this.page.locator('(//input[@class="oxd-input oxd-input--active"])[2]'); }
    get jobDescInput()      { return this.page.getByPlaceholder('Type description here'); }
    get jobFileInput()      { return this.page.locator('.oxd-file-input'); }
    get noteInput()      { return this.page.getByPlaceholder('Add note'); }
    get saveBtn() { return this.page.locator('//button[normalize-space()="Save"]'); }
    get sortBtn() { return this.page.locator('.oxd-table-header-sort'); }
    get sortAscBtn() { return this.page.locator('//li[@class="oxd-table-header-sort-dropdown-item"][1]'); }
    get sortDescBtn() { return this.page.locator('//li[@class="oxd-table-header-sort-dropdown-item"][2]'); }

    public async navigateToJobTitlesPage(): Promise<void> {
        await this.navigate(url + 'admin/viewJobTitleList');
    }
    
    public async clickAddButton(): Promise<void> {
        await this.addBtn.click();
    }
    
    public async fillJobTitle(jobTitle: string): Promise<void> {
        const randomNum = faker.number.int()
        await this.jobTitleInput.fill(jobTitle + randomNum);
    }

    public async fillJobDescription(jobDesc: string): Promise<void> {
        await this.jobDescInput.fill(jobDesc);
    }

    public async uploadJobFile(jobSpecFile: string): Promise<void> {
        const filePath = path.resolve(process.cwd(), 'src/resources', jobSpecFile);
        // const input = this.page.locator('.oxd-file-input');
        await this.jobFileInput.setInputFiles(filePath);
    }

    public async fillNote(note: string): Promise<void> {
        await this.noteInput.fill(note);
    }

    public async clickSaveButton(): Promise<void> {
        await this.saveBtn.click();
    }

    public async directToJobTitles(): Promise<void> {
        await this.page.waitForTimeout(6000);
        await this.navigate(url + 'admin/viewJobTitleList');
        
    }

    public async clickSortButton(): Promise<void> {
        await this.sortBtn.click();
    }

    public async clickSortAscButton(): Promise<void> {
        await this.sortAscBtn.click();
    }

    public async clickSortDescButton(): Promise<void> {
        await this.page.waitForTimeout(6000);
        await this.sortDescBtn.click();
    }

    public async waitForLoadState(state: 'networkidle') {
        await this.page.waitForLoadState(state);
    }

    public async getJobTitles(): Promise<string[]> {
        const rows = this.page.locator('.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(2)');
        const count = await rows.count();
        const titles: string[] = [];
    
        for (let i = 0; i < count; i++) {
          titles.push(await rows.nth(i).innerText());
        }
    
        return titles;
    }
    
    public async verifySortedOrder(expected: string) {
        const titles = await this.getJobTitles();
        const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    
        if (expected === 'ascending order') {
          expect(titles).toEqual(sorted);
        } else if (expected === 'descending order') {
          expect(titles).toEqual(sorted.reverse());
        } else {
          throw new Error(`Unknown expected sort result: ${expected}`);
        }
    }
    

    
}