import { expect } from "@playwright/test";
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true })

export class schemaValidation {

    async Schema(responseBody: any, schema: any, Message = "") {
        const valid = ajv.validate(schema, responseBody);
        // If the validation returns 'False', log the detailed errors.
        if (!valid) {
            console.error('Schema Validation Errors:', ajv.errorsText());
        }
        else {
            console.log('Schema Validated');
        }
        expect.soft(valid, Message).toBe(true);
    }



}