var fs = require('fs');
var multer = require('multer');
var aws = require('aws-sdk');

var configPath = './AwsConfig.json';

if (fs.exists(configPath)) {
  aws.config.loadFromPath(configPath);
} else {
  /**
   * Export the following environment variables instead:
   *
   * export AWS_ACCESS_KEY_ID='AKID'
   * export AWS_SECRET_ACCESS_KEY='SECRET'
   */

}
var s3 = new aws.S3({});


var baseUploader = require('./baseUploader.js'),
  util = require('util');

class s3Uploader extends baseUploader {
  constructor() {
    super();
  }
  write(data) {
    this.emit('data', data);
  }
}

// const uploader = new s3Uploader();

// uploader.on('data', (data) => {
//   console.log(`Received data`);
// });


var storage = multer.memoryStorage();

s3Uploader.prototype.uploadFile = multer({ //multer settings
  storage: storage
}).fields([{
  name: 'file',
  maxCount: 100
}, {
  name: 'files',
  maxCount: 100
}]);

function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fileNameLowerCase = fileName.toLowerCase();

  if (fileNameLowerCase.indexOf('.html') >= 0) rc = 'text/html';
  else if (fileNameLowerCase.indexOf('.css') >= 0) rc = 'text/css';
  else if (fileNameLowerCase.indexOf('.json') >= 0) rc = 'application/json';
  else if (fileNameLowerCase.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fileNameLowerCase.indexOf('.png') >= 0) rc = 'image/png';
  else if (fileNameLowerCase.indexOf('.jpg') >= 0) rc = 'image/jpg';

  return rc;
}

//---------------------------------------------------------------


s3Uploader.prototype.getBucketList = function (path) {
  var s3 = new AWS.S3();
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      for (var index in data.Buckets) {
        var bucket = data.Buckets[index];
        console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
      }
    }
  });
}

s3Uploader.prototype.getFile = function (bucket, fileKey) {
  var params = {
    Bucket: bucket,
    Key: fileKey
  };
  var file = require('fs').createWriteStream(fileKey);
  //var file = require('fs').createWriteStream('/path/to/file.jpg');
  s3.getObject(params).createReadStream().pipe(file);
}

s3Uploader.prototype.s3UploadFiles = function (files, bucket) {
  if (files) {
    for (var index = 0; index < files.length; index++) {
      var file = files[index];
      this.s3UploadFile(bucket, file.buffer, file.originalname);
    }
  }

}


s3Uploader.prototype.s3UploadFile = function (bucket, fileBuffer, fileName, callback) {

  var contentType = getContentTypeByFile(fileName);

  s3.putObject({
    //http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUTacl.html
    // private | public-read | public-read-write | aws-exec-read | authenticated-read | bucket-owner-read | bucket-owner-full-control
    ACL: 'bucket-owner-full-control',
    Bucket: bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType
  }, function (error, response) {
    console.log('uploaded file[' + fileName + '] to [' + bucket + '] as [' + contentType + ']');
    console.log(arguments);
    if (callback) callback(error);
  });


}


s3Uploader.prototype.createBucket = function (bucketName) {
  s3.createBucket({
    Bucket: bucketName
  }, function () {
    console.log('created the bucket[' + bucketName + ']')
    console.log(arguments);
  });
}

module.exports = new s3Uploader();