import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    let requestJSON = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME_USER,
        Item: {
            id: event.pathParameters.id,
            name: requestJSON.name
        }
    };

    try {
        const data = await dynamo.send(new PutCommand(params));
        return {
            statusCode: 200,
            body: `Put user ${requestJSON.id}`,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create user' }),
        };
    }
};
