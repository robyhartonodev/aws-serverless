import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from "buffer";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const s3Client = new S3Client({ region: 'eu-central-1' });

export const handler = async (event) => {
    let requestJSON = JSON.parse(event.body);

    try {
        const { fileContent } = event.body;

        const fileKey = `images/${Date.now()}.jpg`;

        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            Body: Buffer.from(fileContent, 'base64'),
            ContentType: 'application/octet-stream'
        });
        const uploadResponse = await s3Client.send(uploadCommand);

        const params = {
            TableName: process.env.TABLE_NAME_FILE,
            Item: {
                id: Date.now().toString(),
                userId: requestJSON.userId,
                title: requestJSON.title,
                s3Key: fileKey
            }
        };

        const data = await dynamo.send(new PutCommand(params));

        return {
            statusCode: 200,
            body: `Created file ${Date.now().toString()}`,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create user file or upload user file' }),
        };
    }
};
