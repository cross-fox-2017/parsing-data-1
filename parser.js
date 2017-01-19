"use strict"
let fs = require('fs');
let csv = require('fast-csv');

class Person {
  constructor(id,firstName,lastName,email,phone) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
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
    if (this._people)
      return this._people

    let csv = fs.readFileSync(this._file, 'utf8').split('\n')
    let arr = []
    for (let i = 0; i < csv.length; i++) {
      arr.push(csv[i].split(','))
    }
    arr = arr.splice(1, arr.length-1)

    for (let j = 0; j < arr.length; j++) {
      this.data.push(new Person(arr[j][0],arr[j][1],arr[j][2],arr[j][3],arr[j][4],arr[j][5]))
    }
    return this.data
  }

  addPerson(val) {
    this.data.push(val)
  }

  save() {
    let save = fs.createWriteStream("peopleNew.csv")
    csv.write(this.people).pipe(save)
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson( new Person(201,'yoma','sofwan','yomaswn@gmail.com','089694026806'))
parser.save()
console.log(`There are ${parser.data.length} people in the file '${parser._file}'.`)
