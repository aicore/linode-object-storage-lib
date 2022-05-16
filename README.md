# Linode Object Storage JS Module
A javascript based module to access and perform operations on Linode object storage via code.

## Code Guardian
[![<app> build verification](https://github.com/aicore/linode-object-storage-lib/actions/workflows/build_verify.yml/badge.svg)](https://github.com/aicore/linode-object-storage-lib/actions/workflows/build_verify.yml)

<a href="https://sonarcloud.io/summary/new_code?id=aicore_linode-object-storage-lib">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=alert_status" alt="Sonar code quality check" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=security_rating" alt="Security rating" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=vulnerabilities" alt="vulnerabilities" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=coverage" alt="Code Coverage" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=bugs" alt="Code Bugs" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=reliability_rating" alt="Reliability Rating" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=sqale_rating" alt="Maintainability Rating" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=ncloc" alt="Lines of Code" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=aicore_linode-object-storage-lib&metric=sqale_index" alt="Technical debt" />
</a>

## Installing
* > npm i @aicore/linode-object-storage-lib

## Usage
### Prerequisite
1. To upload a file to a bucket in Linode Object Storage users need to configure accessKey, secretKey and create a bucket.
 Please refer to the official Linode guide to generate an accessKey and create a bucket.

   AccessKey Guide: https://www.linode.com/docs/products/storage/object-storage/guides/generate-access-keys/
   
   Creating a Bucket Guide: https://www.linode.com/docs/products/storage/object-storage/guides/create-bucket/
2. To retrieve the shareable public file URL using Linode v4 API, users need to generate the API Key which is a mandatory parameter required for authentication. Please refer to following guide to generate the API Key.
    
    API Key Generation Guide: https://www.linode.com/docs/guides/getting-started-with-the-linode-api/

## Code usage

### Uploading File to Linode Bucket

Request Parameters :

* **accessKeyId (type: String):** bucket specific unique identifier required for authentication
* **secretAccessKey (type: String):** user specific unique identifier required for authentication
* **region (type: String):** indicates the geographical server location (e.g us-east-1, eu-west-1a)
* **file (type: String):** complete path of the file to be uploaded is passed on as a parameter
* **bucket (type: String):** uniquely identifies the bucket where the file should be uploaded
* **objectNameOverride (type: String):** Optional parameter, if given, the file name in linode will be overridden.

Please refer to https://docs.aws.amazon.com/sdk-for-javascript/index.html for more details.

```js
// import the module directly to your file
import linodeModule from 'linode_object_storage_module';

//Example for uploading file to linode object storage
const response = await linodeModule.uploadFileToLinodeBucket(accessKeyId, 
    secretAccessKey, region, file, bucket);

//Example if you want to change the file name in linode/ provide suctom upload location
const response = await linodeModule.uploadFileToBucket(accessKey, secretKey, region, fileName, bucketName, customPathInLinode);
```

### Fetching Object URL

Request Parameters :

* **accessToken (type: String):** Linode API Key.
* **clusterId (type: String):**  indicates the geographical server location (e.g 'us-east-1', 'eu-west-1a')
* **bucketName (type: String):** Exact Name of the bucket the file resides in
* **objectName (type: String):** Exact Name(not the path) of the the file in String

Please refer to the API Documentation for the complete list of path and request body parameters:
https://www.linode.com/docs/api/object-storage/#object-storage-object-url-create

```js
//Example for retrieving the File object URL
const fileURL = await linodeModule.fetchObjectUrl(accessToken, 
    clusterId, bucketName, objectName);
```

```
Request Body:

curl -H "Content-Type: application/json" \ -H "Authorization: Bearer $TOKEN" \
  -X POST -d '{
      "method": "GET",
      "name": "example"
    }' \
  https://api.linode.com/v4/object-storage/buckets/us-east-1/example-bucket/object-url

Response Body:

{
  "url": "https://us-east-1.linodeobjects.com/example-bucket/example?Signature=qr98TEucCntPgEG%2BsZQGDsJg93c%3D\u0026Expires=1567609905\u0026AWSAccessKeyId=G4YAF81XWY61DQM94SE0"
}

```

# Commands available
## Building
Since this is a pure JS template project, build command just runs test with coverage.
```shell
> npm run build
```

## Linting
To lint the files in the project, run the following command:
```shell
> npm run lint
```
To Automatically fix lint errors:
```shell
> npm run lint:fix
```

## Testing
To run all tests:
```shell
> npm run test
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present
```

Additionally, to run unit/integration tests only, use the commands:
```shell
> npm run test:unit
> npm run test:integ
```

## Coverage Reports
To run all tests with coverage:

```shell
> npm run cover
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present


  2 passing (6ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 index.js |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 5/5 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 1/1 )
Lines        : 100% ( 5/5 )
================================================================================
Detailed unit test coverage report: file:///template-nodejs/coverage-unit/index.html
Detailed integration test coverage report: file:///template-nodejs/coverage-integration/index.html
```
After running coverage, detailed reports can be found in the coverage folder listed in the output of coverage command.
Open the file in browser to view detailed reports.

To run unit/integration tests only with coverage
```shell
> npm run cover:unit
> npm run cover:integ
```

Sample coverage report:
![image](https://user-images.githubusercontent.com/5336369/148687351-6d6c12a2-a232-433d-ab62-2cf5d39c96bd.png)

### Unit and Integration coverage configs
Unit and integration test coverage settings can be updated by configs `.nycrc.unit.json` and `.nycrc.integration.json`.

See https://github.com/istanbuljs/nyc for config options.

# Code Guardian
Several automated workflows that check code integrity are integrated into this template.
These include:
1. GitHub actions that runs build/test/coverage flows when a contributor raises a pull request
2. [Sonar cloud](https://sonarcloud.io/) integration using `.sonarcloud.properties`
    1. In sonar cloud, enable Automatic analysis from `Administration
       Analysis Method` for the first time ![image](https://user-images.githubusercontent.com/5336369/148695840-65585d04-5e59-450b-8794-54ca3c62b9fe.png)

## IDE setup
SonarLint is currently available as a free plugin for jetbrains, eclipse, vscode and visual studio IDEs.
Use sonarLint plugin for webstorm or any of the available
IDEs from this link before raising a pull request: https://www.sonarlint.org/ .

SonarLint static code analysis checker is not yet available as a Brackets
extension.

## Internals
### Testing framework: Mocha , assertion style: chai
See https://mochajs.org/#getting-started on how to write tests
Use chai for BDD style assertions (expect, should etc..). See move here: https://www.chaijs.com/guide/styles/#expect

### Mocks and spies: sinon
if you want to mock/spy on fn() for unit tests, use sinon. refer docs: https://sinonjs.org/

### Note on coverage suite used here:
we use c8 for coverage https://github.com/bcoe/c8. Its reporting is based on nyc, so detailed docs can be found
here: https://github.com/istanbuljs/nyc ; We didn't use nyc as it do not yet have ES module support
see: https://github.com/digitalbazaar/bedrock-test/issues/16 . c8 is drop replacement for nyc coverage reporting tool
    
