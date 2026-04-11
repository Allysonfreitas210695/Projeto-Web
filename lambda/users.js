const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const tableName = process.env.USERS_TABLE || 'Users';

exports.handler = async (event) => {
  const { httpMethod, path, pathParameters, body } = event;
  const userId = pathParameters?.id;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path === '/users' || path === '/users/') {
          const scanResult = await client.send(new ScanCommand({ TableName: tableName }));
          const users = (scanResult.Items || []).map((item) => {
            const user = unmarshall(item);
            delete user.password;
            return user;
          });
          return { statusCode: 200, body: JSON.stringify(users) };
        } else if (userId) {
          const getResult = await client.send(
            new GetItemCommand({
              TableName: tableName,
              Key: marshall({ id: userId }),
            })
          );
          if (!getResult.Item) {
            return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
          }
          const user = unmarshall(getResult.Item);
          delete user.password;
          return { statusCode: 200, body: JSON.stringify(user) };
        }
        break;

      case 'POST':
        if (path === '/users' || path === '/users/') {
          const newUser = JSON.parse(body);
          newUser.id = Date.now().toString();
          newUser.createdAt = new Date().toISOString();
          await client.send(
            new PutItemCommand({
              TableName: tableName,
              Item: marshall(newUser),
            })
          );
          const { password, ...userWithoutPassword } = newUser;
          return { statusCode: 201, body: JSON.stringify(userWithoutPassword) };
        }
        break;

      case 'PATCH':
        if (userId) {
          const updateData = JSON.parse(body);
          const updateExpression = Object.keys(updateData)
            .map((key, idx) => `#key${idx} = :val${idx}`)
            .join(', ');
          const expressionAttributeNames = Object.keys(updateData).reduce(
            (acc, key, idx) => ({ ...acc, [`#key${idx}`]: key }),
            {}
          );
          const expressionAttributeValues = Object.entries(updateData).reduce(
            (acc, [_, value], idx) => ({ ...acc, [`:val${idx}`]: value }),
            {}
          );

          const updateResult = await client.send(
            new UpdateItemCommand({
              TableName: tableName,
              Key: marshall({ id: userId }),
              UpdateExpression: `SET ${updateExpression}`,
              ExpressionAttributeNames: expressionAttributeNames,
              ExpressionAttributeValues: marshall(expressionAttributeValues),
              ReturnValues: 'ALL_NEW',
            })
          );
          const user = unmarshall(updateResult.Attributes);
          delete user.password;
          return { statusCode: 200, body: JSON.stringify(user) };
        }
        break;

      case 'DELETE':
        if (userId) {
          await client.send(
            new DeleteItemCommand({
              TableName: tableName,
              Key: marshall({ id: userId }),
            })
          );
          return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }
        break;

      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Unsupported method' }) };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
