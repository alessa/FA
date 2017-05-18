    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var uploader = require('./uploader/s3Uploader.js');

    app.use(function (req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    /** Serving from the same express Server
    No cors required */
      app.use(bodyParser.json());

    // /** API path that will upload the files */
    app.post('/upload', function (req, res) {

        var files = [].concat.apply(req.files.file || req.files.files);

        uploader.uploadFile(req, res, function (err) {
              res.json({
                error_code: err ? 1 : 0,
                err_desc: err 
            });
            if (err) return;

           var files = [].concat.apply(req.files.file || req.files.files);
           uploader.s3UploadFiles(files, 'fa.tests');

          
        });
    });



    app.listen('3000', function () {
        console.log('running on 3000...');
    });