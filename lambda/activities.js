const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  DeleteItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const tableName = process.env.ACTIVITIES_TABLE || 'Activities';

exports.handler = async (event) => {
  const { httpMethod, path, pathParameters, queryStringParameters, body } = event;
  const userId = queryStringParameters?.userId;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path === '/activities' || path === '/activities/') {
          let scanParams = { TableName: tableName };
          const scanResult = await client.send(new ScanCommand(scanParams));
          let activities = (scanResult.Items || []).map((item) => unmarshall(item));

          if (userId) {
            activities = activities.filter((a) => a.userId === userId);
          }

          activities.sort((a, b) => new Date(b.date) - new Date(a.date));
          return { statusCode: 200, body: JSON.stringify(activities) };
        }
        break;

      case 'POST':
        if (path === '/activities' || path === '/activities/') {
          const newActivity = JSON.parse(body);
          newActivity.id = Date.now();
          newActivity.createdAt = new Date().toISOString();
          await client.send(
            new PutItemCommand({
              TableName: tableName,
              Item: marshall(newActivity),
            })
          );
          return { statusCode: 201, body: JSON.stringify(newActivity) };
        }
        break;

      case 'DELETE':
        const activityId = parseInt(pathParameters?.id);
        if (activityId) {
          await client.send(
            new DeleteItemCommand({
              TableName: tableName,
              Key: marshall({ id: activityId }),
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
