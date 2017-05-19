    // "use strict";

    var scribe = require('scribe-js')(); //loads Scribe

    var console = process.console;


    var express = require('express');
    var app = express();

    app.use(scribe.express.logger()); //Log each request
    app.use('/logs', scribe.webPanel());


    var bodyParser = require('body-parser');
    var multer = require('multer');
    var uploader = require('./uploader/s3Uploader.js');
    var manager = require('./users/userManager');

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

        uploader.uploadFile(req, res, function (err) {
            res.json({
                error_code: err ? 1 : 0,
                err_desc: err
            });
            if (err) return;

            var authKey = req.body['authKey'];
            var user = manager.getUser(authKey);
            var currentDate = new Date();
            var objectPath = `${user.env}/${currentDate.getUTCFullYear()}_${currentDate.getUTCMonth()}_${currentDate.getUTCDay()}/`;
            var requestMetadata = user;
            requestMetadata.IP = req.ip;
            requestMetadata.objectPath = objectPath;

            var files = [].concat.apply(req.files.file || req.files.files);
            uploader.s3UploadFiles(files, user.bucket, objectPath , requestMetadata);


        });
    });



    app.listen('8080', function () {
        console.log('running on 8080...');
    });