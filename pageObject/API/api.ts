import { APIRequest, APIRequestContext, APIResponse } from "@playwright/test";
import { get } from "./get";
import { post } from "./post";

export class api {
    protected readonly request: APIRequestContext
    constructor(request: APIRequestContext) {
        this.request = request
    }

    public get get(): get {
        return new get(this.request)
    }

    public get post(): post {
        return new post(this.request)
    }
}




