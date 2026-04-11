const {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const tableName = process.env.USERS_TABLE || 'Users';

exports.handler = async (event) => {
  const { httpMethod, body } = event;

  try {
    if (httpMethod === 'POST' && event.path === '/login') {
      const { email, password } = JSON.parse(body);

      const scanResult = await client.send(
        new ScanCommand({
          TableName: tableName,
          FilterExpression: 'email = :email',
          ExpressionAttributeValues: marshall({ ':email': email }),
        })
      );

      const users = (scanResult.Items || []).map((item) => unmarshall(item));
      const user = users.find((u) => u.password === password);

      if (user) {
        const { password, ...userWithoutPassword } = user;
        return {
          statusCode: 200,
          body: JSON.stringify({
            user: userWithoutPassword,
            token: `mock-jwt-token-${Date.now()}`,
          }),
        };
      } else {
        return { statusCode: 401, body: JSON.stringify({ message: 'Credenciais inválidas' }) };
      }
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Unsupported method' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
