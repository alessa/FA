const sum = require('../uploader/s3Uploader');
var AWS = require('aws-sdk-mock');
var uploader = require('../uploader/s3Uploader.js');
var fs = require('fs');

AWS.mock('S3', 'putObject', function (params, callback) {
    callback(null, "successfully put item in database");
});

//s3UploadFile


test('s3UploadFile successfull', () => {
    var fileBuffer = fs.readFileSync("./README.md");
    var callback = function (error, response) {
        expect(error).toBeNull();
    }
    uploader.s3UploadFile("bucket", fileBuffer, "README.md", callback);
});