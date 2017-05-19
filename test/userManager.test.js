var manager = require('../users/userManager');
var fs = require('fs');
var faker = require('faker');
var uuid = require('node-uuid');
var _ = require("lodash")


var console = process.console;


test('test add and deleteuser successfull', () => {
    var authKey = uuid.v4();
    var user = {
        clientName: faker.Company.companyName(),
        authKey: authKey,
        bucket: faker.Name.firstName(),
        env: faker.random.number(2) % 2 ? 'dev' : 'test'
    };

    manager.addUser(user);
    var foundUser = manager.getUser(authKey);
    expect(user).toEqual(foundUser);
    
    manager.deleteUser(authKey);
    foundUser = manager.getUser(authKey);
    expect(foundUser).toBeUndefined();
});

