var fs = require('fs');
var faker = require('faker');
var uuid = require('node-uuid');
// var _ = require("lodash")

var scribe = require('scribe-js')(); //loads Scribe
var console = process.console;


// var uploader = require('./uploader/s3Uploader.js');
// var BUCKET_NAME = 'fa.tests';
// var fileBuffer = fs.readFileSync("./uploads/readme.txt");
// uploader.s3UploadFile(BUCKET_NAME, fileBuffer, "readme.txt")

var manager = require('./users/userManager');
manager.test();

var authKey1 = uuid.v4();
var user1 = {
    clientName: faker.Company.companyName(),
    authKey: authKey1,
    bucket: faker.Name.firstName(),
    env: faker.random.number(2) % 2 ? 'dev' : 'test'
};

manager.addUser(user1);


var authKey2 = uuid.v4();
var user2 = {
    clientName: faker.Company.companyName(),
    authKey: authKey2,
    bucket: faker.Name.firstName(),
    env: faker.random.number(2) % 2 ? 'dev' : 'test'
};

manager.addUser(user2);
manager.deleteUser(authKey2);
// manager.deleteUser(authKey1);

var foundUser = manager.getUser(authKey1);

manager.listUsers()