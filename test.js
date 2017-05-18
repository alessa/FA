
var fs = require('fs');

var uploader = require('./uploader/s3Uploader.js');
var BUCKET_NAME = 'fa.tests';

var fileBuffer = fs.readFileSync("./uploads/readme.txt");

uploader.uploadFile(BUCKET_NAME, fileBuffer, "readme.txt")
// uploader.createBucket("koko.roco.test")
// uploader.getLocalFileList("./uploads/");