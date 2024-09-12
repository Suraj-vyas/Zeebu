import { Page } from "@playwright/test";
import { poolsPage } from "./Balancer_Fi_Pages/poolsPage";
import { individualPoolPage } from "./Balancer_Fi_Pages/individualPoolPage";
import { resuableMethods } from "../../libs/reusableMethods";
import { assert } from "../../libs/assert";

export class app {
    protected readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    public get poolsPage(): poolsPage {
        return new poolsPage(this.page)
    }
    public get poolPage(): individualPoolPage {
        return new individualPoolPage(this.page)
    }
    public get webPage(): resuableMethods {
        return new resuableMethods(this.page)
    }
    public get assert(): assert {
        return new assert() 
    }

}