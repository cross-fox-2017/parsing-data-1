"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.data = []
  }

  people(callback) {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    let csv = fs.readFile('people.csv', 'utf8', (err, data) => {
      if (err) return console.error(err);
      callback(data)
      console.log(this.data);
      console.log(`There are ${this.data.length} people in the file '${this._file}'`);
    });
  }

  addPerson(id,first_name,last_name,email,phone, created_at) {
    let newPerson = new Person(id,first_name,last_name,email,phone, created_at)
    this.data.push(newPerson)
  }
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
}




let parser = new PersonParser('people.csv')
parser.people( function(data) {
  let dataSplit = data.split('\n')
  for (var i = 1; i < dataSplit.length; i++) {
    let parserId = dataSplit[i].split(',')[0]
    let parserFirst_name = dataSplit[i].split(',')[1]
    let parserLast_name = dataSplit[i].split(',')[2]
    let parserEmail = dataSplit[i].split(',')[3]
    let parserPhone = dataSplit[i].split(',')[4]
    let parserCreated_at = dataSplit[i].split(',')[5]

    let orang = new Person(parserId,parserFirst_name,parserLast_name, parserEmail, parserPhone, parserCreated_at)
    parser.data.push(orang)
  }
})
//
// let parser = new PersonParser('people.csv')
//
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

parser.addPerson(201,'Raditya','Pradipta','me@raditya.com','08561234567','2017-11-11T11:49:28-09:00')
console.log(parser.data)
