import pkg from 'aws-sdk';
import joinURL from 'url-join';
import path from 'path';
import {readFile} from 'fs';

const {S3, Endpoint} = pkg;

/**
 * Module to upload a file to AWS S3/Linode Object Storage. The path of the file to be uploaded is
 * passed on as a parameter which is then processed and uploaded using AWS S3 client.
 *
 * @param accessKeyId bucket specific unique identifier required for authentication
 * @param secretAccessKey user specific unique identifier required for authentication
 * @param region indicates the geographical server location (e.g us-east-1, eu-west-1a)
 * @param file complete path of the file to be uploaded is passed on as a parameter
 * @param bucket uniquely identifies the bucket where the file should be uploaded
 * @param url suffix url to decide whether to upload the file to AWS S3 or LiNode Object Storage
 * @returns {Promise<void>} void
 */

async function uploadFileToBucket (accessKeyId, secretAccessKey, region, file, bucket, url) {

    const fileName = path.basename(file);

    // Initialized the AWS S3 Client
    const s3Client = new S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        endpoint: new Endpoint(
            joinURL('https://', region + url)
        )
    });

    // Read the file contents and upload it to object storage
    readFile(path.resolve(file), {}, async (error, data) => {
        if (error) {
            return console.log('There was a error reading your file\n' + JSON.stringify(error));
        }

        console.log('Uploading...');

        try {
            await s3Client
                .putObject({
                    Bucket: bucket,
                    Key: fileName,
                    Body: data
                })
                .promise();

            console.log(`Uploaded ${file}`);
        } catch (e) {
            const errorMsg = 'Error in uploading\n' + JSON.stringify(e);
            console.error(errorMsg);
            throw errorMsg;
        }
    });
}

export default uploadFileToBucket;
