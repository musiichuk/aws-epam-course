const AWS = require('aws-sdk');

exports.catalogBatchProcesss = (event, context) => {
    const data = event.Records.map(record => record);
    let success = false;
    const sns = new AWS.SNS({ region: 'eu-west-1' });
    sns.publish({
        Subject: 'catalogBatchProcesss is going',
        Message: JSON.stringify(data[0].body),
        TopicArn: process.env.SNS_ARN
    }, (error, data) => {
        success = true;
        console.log('Send email with csv body: ', data[0].body);
    })

    return success;

}