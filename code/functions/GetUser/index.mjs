import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    GetCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME_USER,
        Key: {
            id: event.pathParameters.id
        }
    };

    try {
        const data = await dynamo.send(new GetCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            }
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Get user failed' }),
        };
    }
};
