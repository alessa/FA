#!/usr/bin/env node

/**
 * Module dependencies.
 */

var scribe = require('scribe-js')(); //loads Scribe
var console = process.console;

var manager = require('../users/userManager');
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');

program
    .version('0.0.1')
//    .option('search', 'receive user by authKey', manager.getUser)
//    .option('add', 'add a new user', manager.addUser)
//    .option('delete', 'delete user', manager.deleteUser)
//    .option('list', 'list all users', manager.listUsers)

program
    .command('list')
    .description('- list all users')
    .action(function () {
        manager.listUsers();
    });

program
    .command('get <authKey>')
    .description('- get user by authKey')
    .action(function (authKey) {
        manager.printUser(manager.getUser(authKey));
    });

program
    .command('add <clientName> <bucket> <env>')
    .description('- add user')
    .action(function (clientName, bucket, env) {
        var user = {
            "clientName": clientName,
            "bucket": bucket,
            "env": env
        }
        manager.addUser(user);
        manager.listUsers();
    });

program
    .command('del <authKey>')
    .description('- delete user by authKey')
    .action(function (authKey) {
        manager.deleteUser(authKey);
        manager.listUsers();
    });




program.parse(process.argv);