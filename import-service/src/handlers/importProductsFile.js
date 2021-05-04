const AWS = require('aws-sdk');
const BUCKET = 'products-bucket-aws-epam';

exports.importProductsFile = async (event, context) => {
    try {
        const fileName = event.queryStringParameters.name;
        if (!fileName) throw new Error('Invalid Param');
        
        const s3 = new AWS.S3({ region: 'eu-west-1' });
        console.log(fileName)
        const s3Params = {
            Bucket: BUCKET,
            Key: `uploaded/${fileName}`,
            ContentType: 'text/csv',
            Expires: 60,
        }

  
        const signedUrl = await s3.getSignedUrl('putObject', s3Params);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(signedUrl),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
        }
    }

}
