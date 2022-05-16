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
 * @param objectNameOverride If provided, the file will be uploaded with the given object name. Use this to provide
 * custom file names and paths in s3.
 * @returns {Promise<void>}
 */

async function uploadFileToBucket (accessKeyId, secretAccessKey, region, filePath, bucket, url, objectNameOverride) {
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
    const objectName = objectNameOverride ? objectNameOverride : path.basename(filePath);
    const { writeStream, promise } = uploadStream({Bucket: bucket, Key: objectName});
    fsExtra.createReadStream(filePath).pipe(writeStream);
    await promise;
}

export default uploadFileToBucket;
