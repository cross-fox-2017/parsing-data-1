"use strict"
const fs = require('fs');
const fast_csv = require('fast-csv')

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

  people() {
    if (this._people) {
      return this._people
    }
    let csv = fs.readFileSync(this._file, 'utf8').split('\n')
    let temp = []
    for (var i = 0; i < csv.length; i++) {
      temp.push(csv[i].split(','))
    }
    temp = temp.splice(1, temp.length-1)
    //return temp

    for (var j = 0; j < temp.length; j++) {
      this.data.push({
      id: temp[j][0],
      first_name: temp[j][1],
      last_name: temp[j][2],
      email: temp[j][3],
      phone: temp[j][4],
      created_at: temp[j][5]
      })
    }
    return this.data
  }

  save() {
    let save = fs.createWriteStream("new_people.csv")
    fast_csv.write(this.data).pipe(save)
  }

  addPerson(add ={}) {
    this.data.push(add)
  }

}


let parser = new PersonParser('people.csv')
let raditya = new Person(201,'Raditya','Pradipta','me@raditya.com','08561234567','2017-11-11T11:49:28-09:00')

console.log(`There are ${parser.people().length} people in the file '${parser._file}'`)

parser.addPerson(raditya)
parser.save()
