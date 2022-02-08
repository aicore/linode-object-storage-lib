import pkg from 'aws-sdk';
import joinURL from 'url-join';
import path from 'path';
import fsExtra from "fs-extra";
import stream from "stream";

const {S3, Endpoint} = pkg;

/**
 * Module to upload a filePath to AWS S3/Linode Object Storage. The path of the filePath to be uploaded is
 * passed on as a parameter which is then processed and uploaded using AWS S3 client.
 *
 * @param accessKeyId bucket specific unique identifier required for authentication
 * @param secretAccessKey user specific unique identifier required for authentication
 * @param region indicates the geographical server location (e.g us-east-1, eu-west-1a)
 * @param filePath complete path of the filePath to be uploaded is passed on as a parameter
 * @param bucket uniquely identifies the bucket where the filePath should be uploaded
 * @param url suffix url to decide whether to upload the filePath to AWS S3 or LiNode Object Storage
 * @returns {Promise<{errorMessage: string, status: boolean}>} void
 */

async function uploadFileToBucket (accessKeyId, secretAccessKey, region, filePath, bucket, url) {
    const uploadStream = ({ Bucket, Key }) => {
        const s3Client = new S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            endpoint: new Endpoint(
                joinURL('https://', region + url)
            )
        });
        const pass = new stream.PassThrough();
        return {
            writeStream: pass,
            promise: s3Client.upload({ Bucket, Key, Body: pass }).promise()
        };
    };
    const fileName = path.basename(filePath);
    const { writeStream, promise } = uploadStream({Bucket: bucket, Key: fileName});
    fsExtra.createReadStream(filePath).pipe(writeStream);
    const response = {
        status: true,
        errorMessage: ''
    };
    try{
        await promise;
    }catch (exception) {
        response.status = false;
        response.errorMessage = exception.toString();
    }
    return Promise.resolve(response);
}

export default uploadFileToBucket;
