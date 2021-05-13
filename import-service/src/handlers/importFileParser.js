const AWS = require('aws-sdk');
const csvParser = require('csv-parser')

const BUCKET = 'products-bucket-aws-epam';

// const moveToParsedFolder = (event) => {
//     const s3 = new AWS.S3({ region: 'eu-west-1' });
    
//     for (const record of event.Records) {
//         await s3.copyObject({
//             Bucket: BUCKET,
//             CopySource: BUCKET + '/' + record.s3.object.key,
//             Key: record.s3.object.key.replace('uploaded', 'parsed')
//         }).promise();

//         await s3.deleteObject({
//             Bucket: BUCKET,
//             Key: record.s3.object.key
//         }).promise();
//     }
// }

exports.importFileParser = (event, context) => {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const record = event.Records[0];
    console.log(record.s3.object.key);
    const params = {
        Bucket: BUCKET,
        Key: record.s3.object.key
    };

    const s3Stream = s3.getObject(params).createReadStream();
    const csvParserStream = csvParser();

    s3Stream
        .pipe(csvParserStream)
        .on('data', (data) => console.log('DATA: ', data))
        .on('error', (error) => console.log('ERROR importFileParser: ', error))
        .on('end', () => console.log('END'))

    // moveToParsedFolder(event);
}
