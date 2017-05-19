
var encriptor = require('../users/encription.js');
var fs = require('fs'),
util = require('util');

var initFile = "../server/uploads/readme.txt";
var encFile = "../server/uploads/readme.txt.enc";
var bisFile = "../server/uploads/readme.txt.bis";



test('testEncryptFile successfull', () => {
        var fileBuffer = fs.readFileSync(initFile);
        var hw = encriptor.encryptBuffer(fileBuffer)
        fs.writeFileSync(encFile , hw);

});
test('testDecryptFile successfull', () => {
       

        var encFileBuffer = fs.readFileSync(encFile);
        var hww = encriptor.decryptBuffer(encFileBuffer);
        fs.writeFileSync(bisFile, hww);
        

        var fileBuffer = fs.readFileSync(initFile);
        fileBuffer.toString() === hww.toString();


});   
        