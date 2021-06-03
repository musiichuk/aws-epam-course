exports.basicAuthorizer = async (event, context) => {
  console.log('AUTHORIZER EVENT: ', JSON.stringify(event));

  if (event.type !== 'TOKEN') {
    return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: JSON.stringify({message: 'Unauthorized'}),
      };
  }

  const { authorizationToken = '', methodArn } = event;
  const encodedCreds = authorizationToken.split(' ')[1];
  const buff = Buffer.from(encodedCreds, 'base64');
  const plainCreds = buff.toString('utf-8').split(':');
  const userName = plainCreds[0];
  const password = plainCreds[1];

  let effect = 'Allow';
  if (userName !== process.env.USERNAME || password !== process.env.PASSWORD) {
    console.log(`Username : ${userName}, Password: ${password}`);
    effect = 'Deny';
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({message: 'Invalid authorization_token'}),
    };
  }

  const policy = generatePolicy(encodedCreds, methodArn, effect);
  return policy;
};

const generatePolicy = (principalId, resource, effect) => {
  return {
    principalId,
    policyDocument: {
      Version: '2021-06-04',
      Statement: [
        {
          Action: 'execute-api: Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };
}

exports.hello = async (event, context) => {
  console.log('HELLO IS WORKING');
  return 'HELLO IS WORKING';
};