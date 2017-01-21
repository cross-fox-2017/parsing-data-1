"use strict"

const fs     = require('fs')
let csv      = require("fast-csv")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id         = id;
    this.first_name  = first_name;
    this.last_name  = last_name;
    this.email      = email;
    this.phone      = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file   = file;
    this._people = null;
    this._data   = [];
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    let readFile = fs.readFileSync(this._file, 'UTF-8').split('\n')
    let peopleID = readFile.slice(1, readFile.length - 1)

    let getArray = [];
    for(let i = 0; i < peopleID.length; i++){
      getArray.push(readFile[i].split(','));
    }

    for(let i = 0; i < peopleID.length; i++){
      this._data.push({
        id: getArray[i][0],
        first_name: getArray[i][1],
        last_name: getArray[i][2],
        email: getArray[i][3],
        phone: getArray[i][4],
        created_at: getArray[i][5]
      })
    }
      return this._data
  }
    // if (this._people)
    //   return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.

  addPerson(people =  {}) {
    return this._data.push(people);
  }

  save() {
    let save = fs.createWriteStream("fakedata.csv");
    csv.write(this._data).pipe(save);
  }
}

let parser   = new PersonParser('people.csv')
let newInput = new Person(212, 'Achmad', 'Kamil', 'kamil@crossfox.com', '081234567890', `${new Date}`)

console.log(parser.people);
parser.addPerson(newInput)
console.log(parser._data);
parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
