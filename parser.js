"use strict"

var fs = require('fs')
var csv = require('fast-csv')
var dataPerson = [];
var temp = "";

class Person {
    constructor(params) {
        this.id = params['id']
        this.first_name = params['first_name']
        this.last_name = params['last_name']
        this.email = params['email']
        this.phone = params['phone']
        this.created_at = params['created_at']
    }
}
