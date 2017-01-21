"use strict"
const fs     = require('fs')
let csv      = require("fast-csv")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id         = id,
    this.first_name  = first_name,
    this.last_name  = last_name,
    this.email      = email,
    this.phone      = phone,
    this.created_at = created_at
  }
}
class PersonParser {

  constructor(file) {
    this._file = file,
    this._people = null,
    this._data = []

  }

  get people() {
      // If we've already parsed the CSV file, don't parse it again
      // Remember: people is null by default
      let readFile = fs.readFileSync(this._file, 'UTF-8').split('\n')
      let data = readFile.slice(1, readFile.length - 1)

      let arr = [];
      for(let i = 0; i < data.length; i++){
        arr.push(readFile[i].split(','));
      }

      for(let i = 0; i < data.length; i++){
        this._data.push({
          id: arr[i][0],
          first_name: arr[i][1],
          last_name: arr[i][2],
          email: arr[i][3],
          phone: arr[i][4],
          created_at: arr[i][5]
        })
      }
        return this._data
    }

    addPerson(people =  {}) {
      return this._data.push(people);
    }

    save() {
      let save = fs.createWriteStream("sample.csv");
      csv.write(this._data).pipe(save);
    }

}

let parser   = new PersonParser('sample.csv')
let newInput = new Person(200, 'irsan', 'sebastian', 'fatboy@crossfox.com', '081234567890', `${new Date}`)

console.log(parser.people);
parser.addPerson(newInput)
console.log(parser._data);
parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
