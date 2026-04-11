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
const tableName = process.env.REQUESTS_TABLE || 'Requests';

exports.handler = async (event) => {
  const { httpMethod, path, pathParameters, body } = event;
  const requestId = pathParameters?.id;

  try {
    switch (httpMethod) {
      case 'GET':
        if (path === '/requests' || path === '/requests/') {
          const scanResult = await client.send(new ScanCommand({ TableName: tableName }));
          const requests = (scanResult.Items || []).map((item) => unmarshall(item));
          return { statusCode: 200, body: JSON.stringify(requests) };
        } else if (requestId) {
          const getResult = await client.send(
            new GetItemCommand({
              TableName: tableName,
              Key: marshall({ id: parseInt(requestId) }),
            })
          );
          if (!getResult.Item) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Request not found' }) };
          }
          return { statusCode: 200, body: JSON.stringify(unmarshall(getResult.Item)) };
        }
        break;

      case 'POST':
        if (path === '/requests' || path === '/requests/') {
          const newRequest = JSON.parse(body);
          newRequest.id = Date.now();
          newRequest.code = `#${8000 + Math.floor(Math.random() * 1000)}`;
          newRequest.timeAgo = 'Agorinha';
          newRequest.status = 'in_progress';
          newRequest.createdAt = new Date().toISOString();
          await client.send(
            new PutItemCommand({
              TableName: tableName,
              Item: marshall(newRequest),
            })
          );
          return { statusCode: 201, body: JSON.stringify(newRequest) };
        }
        break;

      case 'PATCH':
        if (requestId) {
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
              Key: marshall({ id: parseInt(requestId) }),
              UpdateExpression: `SET ${updateExpression}`,
              ExpressionAttributeNames: expressionAttributeNames,
              ExpressionAttributeValues: marshall(expressionAttributeValues),
              ReturnValues: 'ALL_NEW',
            })
          );
          return { statusCode: 200, body: JSON.stringify(unmarshall(updateResult.Attributes)) };
        }
        break;

      case 'DELETE':
        if (requestId) {
          await client.send(
            new DeleteItemCommand({
              TableName: tableName,
              Key: marshall({ id: parseInt(requestId) }),
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
