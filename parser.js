"use strict"

const fs = require('fs')
let csv = require("fast-csv")

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
    this._data =[];
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    let peopleRead = fs.readFileSync(this._file, 'utf-8').split('\n')
    let peopleID = peopleRead.slice(1, peopleRead.length - 1)

    let peopleArray = [];
    for(let i = 0; i < peopleID.length; i++){
      peopleArray.push(peopleRead[i].split(','));
    }

    for(let i = 0; i < peopleID.length; i++){
      this._data.push({
        id: peopleArray[i][0],
        first_name: peopleArray[i][1],
        last_name: peopleArray[i][2],
        email: peopleArray[i][3],
        phone: peopleArray[i][4],
        created_at: peopleArray[i][5]
      })
    }
    return this._data
  }

  addPerson(people = {}) {
    return this._data.push(people);

  }

  save() {
    let save = fs.createWriteStream("newpeople.csv");
    csv.write(this._data).pipe(save);
  }
}
let parser = new PersonParser('people.csv')

let didit = new Person(302, 'Didit', 'Suryadi', 'didietsuryadi@gmail.com', '0816895056', `${new Date}`)
console.log(parser.people);
parser.addPerson(didit)
console.log(parser._data);
parser.save()


console.log(`There are ${parser._data.length} people in the file '${parser._file}'.`)
