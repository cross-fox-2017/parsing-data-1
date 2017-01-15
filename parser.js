"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = created_at
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
    if (this._people)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
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
    this._data.push(people);

  }

  // savePerson(){
  //   let save = fs.createWriteStream(this._file);
  //   csv.write(this._data).pipe(save);
  // }

}

let parser = new PersonParser('people.csv')
console.log(parser.people);
let didit = new Person(302, 'Didit', 'Suryadi', 'didietsuryadi@gmail.com', '0816895056', `${new Date}`)
parser.addPerson(didit)
// parser.save()

console.log(`There are ${parser._data.length} people in the file '${parser._file}'.`)
