import { Page, expect } from "@playwright/test";
import path from "path";
import { Url } from "url";

export class assert {

    async areEqual(expected: any, actual: any, message: string = "") {
        expect(expected, message).toEqual(actual)
    }
}  