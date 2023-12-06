import { DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const TABLE_NAME = "youtube-clone"

const dynamoDBUtils = {
    save(fileName, title, uploader) {
        dynamoDBClient.send(new PutItemCommand({
            TableName: TABLE_NAME,
            Item: {
                FileName: {
                    S: fileName
                }
                ,
                Title: { S: title },
                ViewCount: { N: "0" },
                Uploader: { S: uploader },
                UploadedOn: {
                    S: new Date().toUTCString()
                },
                UploadStatus: {
                    S: "Success"
                }
            }
        }));
    },
    updateAttribute(key, attribute, attributeValue) {
        dynamoDBClient.send(new UpdateItemCommand({
            TableName: TABLE_NAME,
            Key: {
                "Title": {
                    S: key
                }
            },
            UpdateExpression: 'SET #att=:val',
            ExpressionAttributeNames: { "#att": attribute },
            ExpressionAttributeValues: { ":val": { S: attributeValue } }
        }));
    },
    async getAll() {
        return await dynamoDBClient.send(new ScanCommand({
            TableName: TABLE_NAME,

        }))
    }
}

export default dynamoDBUtils;