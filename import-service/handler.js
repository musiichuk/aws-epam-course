const { importProductsFile } = require('./src/handlers/importProductsFile');
const { importFileParser } = require('./src/handlers/importFileParser');
const { catalogBatchProcesss } = require('./src/handlers/catalogBatchProcesss');

module.exports = {
    importProductsFile,
    importFileParser,
    catalogBatchProcesss
}
