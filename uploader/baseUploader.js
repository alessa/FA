var fs = require('fs');

function baseUploader() {
  console.log('baseUploader!');
}

baseUploader.prototype.getLocalFileList = function (path) {
  var i, fileInfo, filesFound;
  var fileList = [];

  console.info(`Listing files on "${path}"`);
  filesFound = fs.readdirSync(path);
  for (i = 0; i < filesFound.length; i++) {
    fileInfo = fs.lstatSync(path + filesFound[i]);
    if (fileInfo.isFile()) {
      console.info("- "+filesFound[i]);
      fileList.push(filesFound[i]);
    }
  }

  return fileList;
}



module.exports = baseUploader;