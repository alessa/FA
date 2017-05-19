// "use strict";
var fs = require('fs')
var uuid = require('node-uuid');
const USERS_FILE = './users/users.json';

var console = process.console;

class userManager {
    constructor() {

        this.users = [];
        this.readUsers();
    }

    readUsers() {
        //console.log(`userManager readUsers`);
        this.users = [];
        var data = fs.readFileSync(USERS_FILE).toString();
        this.users = JSON.parse(data);
    }

    listUsers() {
        console.log(`User Manager list users`);
        this.users.forEach((user) => {
            this.printUser(user);
        }, this);
    }

    printUser(user) {
        console.log(`${user.authKey} | ${user.clientName} | ${user.bucket} | ${user.env}`);
    }

    addUser(user) {
        var authKey = uuid.v4();
        user.authKey = authKey;
        console.log(`userManager addUser  ${user.authKey}`);
        this.users.push(user);
        this.syncUserFile();
    }

    deleteUser(authKey) {

        var userIndex = this.users.findIndex((element) => {
            return element.authKey == authKey;
        });
        this.users.splice(userIndex, 1);
        console.log(`userManager deleteUser ${authKey}`);
        this.syncUserFile();
    }

    getUser(authKey) {
        console.log(`userManager getUser ${authKey}`);
        return this.users.find((element) => {
            return element.authKey == authKey;
        });
    }

    syncUserFile() {
        fs.writeFileSync(USERS_FILE, JSON.stringify(this.users))
        console.log(`userManager syncUserFile`);
    }
}


userManager.prototype.test = function () {

    console.log(`test test test test`);

}
module.exports = new userManager();