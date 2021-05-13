const { test, expect } = require('@jest/globals');
const awsMock = require('aws-sdk-mock');
const fs = require('fs');
const path = require('path');

const { importProductsFile } = require('./importProductsFile');

describe('importFileParser() lambda tests', () => {
    const csvFilename = path.resolve(__dirname, 'test.csv');

    it('should return a correct status code and body must contain a domain to bucket', async () => {
        const event = {
            queryStringParameters: {
                name: 'test.csv'
            }
        }

        awsMock.mock("S3", "putObject", Buffer.from(require("fs").readFileSync(csvFilename)));

        const result = await importProductsFile(event);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeTruthy();
        expect(result.body).toContain('https://products-bucket-aws-epam.s3.eu-west-1.amazonaws.com/uploaded/test.csv');
    });
    it('should return 500 status and Invalid Param if there is no file name param at event', async () => {
        const event = {
            queryStringParameters: {
                name: ''
            }
        }

        awsMock.mock("S3", "putObject", Buffer.from(require("fs").readFileSync(csvFilename)));

        const result = await importProductsFile(event);
        console.log(result);
        expect(result).toEqual({ statusCode: 500, body: '"Invalid Param"' });
    });
});