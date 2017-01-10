"use strict"

let fs = require("fs");
let csv = require("fast-csv")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first, last, email, phone, date) {
    this.id = id;
    this.first_name = first;
    this.last_name = last;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date (date);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get file() {
    return this._file;
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    let data = fs.readFileSync(this._file, "utf8")
    let editData = data.replace(/\r/g,"").split(/[,\n]+/g);
    let fileData = []
    for (let i = 6; i < editData.length; i+=6) {
      let person = new Person ();
      person.id = editData[i]
      person.first_name = editData[i+1];
      person.last_name = editData[i+2];
      person.email = editData[i+3];
      person.phone = editData[i+4];
      person.created_at = editData[i+5];
      fileData.push(person);
    }
    this._people = fileData;

    if (this._people) {
      return this._people;
    }
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(add = {}) {
    this._people.unshift(add);
  }

  save() {
    let ws = fs.createWriteStream("people2.csv");
    csv.write(this._people).pipe(ws);
  }
}

let parser = new PersonParser('people.csv');
let data = parser.people;
let fadly = new Person(0, "fadly", "kayo", "f_kayo@yahoo.com", "+49-176-811-36-108", "Tue, 10.01.2017");
parser.addPerson(fadly);
console.log(data);
parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
