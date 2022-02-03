/** Driver file for the module, uncomment this file to test the changes
import linode from './linode_object_storage_module.js';

const fileName = 'YOUR_FILE_NAME';
const accessKey = 'YOUR_ACCESS_KEY';
const secretKey = 'YOUR_SECRET_KEY';
const region = 'BUCKET_REGION';
const apiToken = 'YOUR_API_TOKEN';
const bucketName = 'YOUR_BUCKET_NAME';

async function run() {
    const response = await linode.uploadFileToLinodeBucket(accessKey, secretKey, region, fileName, bucketName);
    const fileUrl = await linode.fetchObjectUrl(apiToken, region, bucketName, fileName);
}

run().catch(console.log);
 **/
