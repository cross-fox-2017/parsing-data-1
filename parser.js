"use strict"
const fs = require('fs');
const csv = require('fast-csv');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.data = []
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people)
      return this._people
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
    let csv = fs.readFileSync(this._file, 'utf8').split('\n')
    let arr = []
    for (var i = 0; i < csv.length; i++) {
      arr.push(csv[i].split(','))
    }
    arr = arr.splice(1, arr.length-1)

    for (var j = 0; j < arr.length; j++) {
      this.data.push(new Person(arr[j][0],arr[j][1],arr[j][2],arr[j][3],arr[j][4],arr[j][5]))
    }
    return this.data
  }

  addPerson(orang) {
    this.data.push(orang)
  }

  save() {
    let save = fs.createWriteStream("newPeople.csv")
    csv.write(this.people).pipe(save)
  }

}

let parser = new PersonParser('people.csv')
let orang = new Person(100,'irwin','pratajaya','irwin@pratajaya.com','08123456789')

parser.addPerson(orang)
parser.save()
console.log(`There are ${parser.data.length} people in the file '${parser._file}'.`);
