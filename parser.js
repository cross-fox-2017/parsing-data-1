"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
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
    if (this._people)
      return this._people
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
    let csv = fs.readFile("people.csv", 'utf8', (err, data) => {
      if (err) throw err;
      callback(data);
      console.log(this.data);
      console.log(`There are ${this.data.length} people in the file '${this._file}'.`)
    })
  }

  addPerson(id,first_name,last_name,email,phone,created_at) {
    let orang = new Person(id,first_name,last_name,email,phone,created_at)
    this.data.push(orang)
  }

}

let parser = new PersonParser('people.csv')
parser.people(function(data){
  for (var i = 1; i < data.split('\n').length -1; i++ ) {
    let id = data.split('\n')[i].split(',')[0]
    let first_name = data.split('\n')[i].split(',')[1]
    let last_name = data.split('\n')[i].split(',')[2]
    let email = data.split('\n')[i].split(',')[3]
    let phone = data.split('\n')[i].split(',')[4]
    let created_at = data.split('\n')[i].split(',')[5]

    let orang = new Person(id,first_name,last_name,email,phone,created_at)
    parser.data.push(orang);
  }
})

parser.addPerson(201,'muhammad','iqbal','iqbal@a.com','08123123','2013-02-12T11:49:28-08:00')
console.log(parser.data)
