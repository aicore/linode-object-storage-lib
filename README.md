# Linode Object Storage JS Module
A javascript based module to access and perform operations on Linode object storage via code.

## Installing
* > npm i linode-object-storage-lib

## Usage
### Prerequisite
1. To upload a file to a bucket in Linode Object Storage users need to configure accessKey, secretKey and create a bucket.
 Please refer to the official Linode guide to generate an accessKey and create a bucket.

   AccessKey Guide: https://www.linode.com/docs/products/storage/object-storage/guides/generate-access-keys/
   
   Creating a Bucket Guide: https://www.linode.com/docs/products/storage/object-storage/guides/create-bucket/
2. To retrieve the shareable public file URL using Linode v4 API, users need to generate the API Key which is a mandatory parameter required for authentication. Please refer to following guide to generate the API Key.
    
    API Key Generation Guide: https://www.linode.com/docs/guides/getting-started-with-the-linode-api/

### Code usage
```js
// import the module directly to your file
import linodeModule from 'linode_object_storage_module';

//Example for uploading file to linode object storage
await linodeModule.uploadFileToLinodeBucket(accessKeyId, 
    secretAccessKey, region, file, bucket);

//Example for retrieving the File object URL
const fileURL = await linodeModule.fetchObjectUrl(accessToken, 
    clusterId, bucketName, objectName);
```
    
