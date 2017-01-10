"use strict"

const fs = require('fs')
const csv = require("fast-csv")

class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id;
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at;
  }
}

// fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);

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

    let peopleList;
    peopleList = fs.readFileSync(this._file, 'utf-8').split('\n')
    peopleList = peopleList.slice(1, peopleList.length - 1)

    let people = [];

    for(let i = 0; i < peopleList.length; i++){
      people.push(peopleList[i].split(','));
    }

    for(let i = 0; i < people.length; i++){
      this.data.push({
        id: people[i][0],
        first_name: people[i][1],
        last_name: people[i][2],
        email: people[i][3],
        phone: people[i][4],
        created_at: people[i][5]
      })
    }
    return this.data

    // return data
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(id,first_name,last_name,email,phone,created_at) {
    this._people.push(id,first_name,last_name,email,phone,created_at);
  }

  save() {
    let save = fs.createWriteStream("newPeople.csv");
    csv.write(this._people).pipe(save);
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.people);
let gana = new Person(201, 'Ida Bagus', 'Chahya Dhegana', 'dhegana@gmail.com', '08129042724', '2014-02-10T03:53:40-07:00')
parser.addPerson(gana)
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
