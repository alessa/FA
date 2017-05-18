
var multer = require('multer'),
baseUploader = require('./baseUploader.js'),
fs = require('fs'),
util = require('util');

var localUploader = function() {
   baseUploader.call(this, arguments);
   console.log('localUploader!');
}

util.inherits(localUploader, baseUploader);

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

localUploader.prototype.uploadFile = multer({ //multer settings
                    storage: storage
                }).single('file');

module.exports = new localUploader();