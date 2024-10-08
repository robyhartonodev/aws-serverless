import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DeleteCommand,
    DynamoDBDocumentClient
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
        const data = await dynamo.send(new DeleteCommand(params));
        return {
            statusCode: 200,
            body: `Deleted user ${event.pathParameters.id}`,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete user' }),
        };
    }
};
