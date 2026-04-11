const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const tableName = process.env.PREFERENCES_TABLE || 'Preferences';

exports.handler = async (event) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  const userId = queryStringParameters?.userId || JSON.parse(body || '{}').userId;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path === '/preferences' || path === '/preferences/') {
          if (!userId) {
            return { statusCode: 400, body: JSON.stringify({ error: 'userId is required' }) };
          }
          const scanResult = await client.send(
            new ScanCommand({
              TableName: tableName,
              FilterExpression: 'userId = :userId',
              ExpressionAttributeValues: marshall({ ':userId': userId }),
            })
          );
          const prefs = (scanResult.Items || []).map((item) => unmarshall(item))[0];
          return {
            statusCode: 200,
            body: JSON.stringify(
              prefs || {
                theme: 'light',
                language: 'pt-BR',
                emailNotifications: true,
                pushNotifications: true,
                weeklyDigest: true,
              }
            ),
          };
        }
        break;

      case 'PATCH':
        if (path === '/preferences' || path === '/preferences/') {
          const updateData = JSON.parse(body);
          const { userId: updateUserId, ...prefs } = updateData;

          const scanResult = await client.send(
            new ScanCommand({
              TableName: tableName,
              FilterExpression: 'userId = :userId',
              ExpressionAttributeValues: marshall({ ':userId': updateUserId }),
            })
          );

          const existing = (scanResult.Items || []).map((item) => unmarshall(item))[0];

          if (existing) {
            const updated = { ...existing, ...prefs };
            await client.send(
              new UpdateItemCommand({
                TableName: tableName,
                Key: marshall({ userId: updateUserId }),
                UpdateExpression:
                  'SET theme = :theme, language = :language, emailNotifications = :emailNotifications, pushNotifications = :pushNotifications, weeklyDigest = :weeklyDigest',
                ExpressionAttributeValues: marshall({
                  ':theme': updated.theme,
                  ':language': updated.language,
                  ':emailNotifications': updated.emailNotifications,
                  ':pushNotifications': updated.pushNotifications,
                  ':weeklyDigest': updated.weeklyDigest,
                }),
                ReturnValues: 'ALL_NEW',
              })
            );
            return { statusCode: 200, body: JSON.stringify(updated) };
          } else {
            const newPrefs = { userId: updateUserId, ...prefs };
            await client.send(
              new PutItemCommand({
                TableName: tableName,
                Item: marshall(newPrefs),
              })
            );
            return { statusCode: 201, body: JSON.stringify(newPrefs) };
          }
        }
        break;

      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Unsupported method' }) };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
