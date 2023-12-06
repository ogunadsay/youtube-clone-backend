import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.AWS_BUCKET_NAME

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const s3Utils = {
    async putObject(key, body) {
        return s3Client.send(
            new PutObjectCommand({
                Bucket: BUCKET_NAME, 
                Key: key, 
                Body: body
            })
        )
    },
    async deleteObject(key) {
        return s3Client.send(
            new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Ket: key
            })
        )
    }
}



export default s3Utils;