"use strict"

var csv = require('csv-parser')
var fs = require('fs')

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
    // if (this._people)
    //   return this._people

    let data = []

    fs.readFile(this._file, "utf-8", function(err, arr2){
      arr2 = arr2.split('\n').slice(1, arr2.length - 1)
      let arr = [];
      data = []
      for(let i = 0; i < arr2.length; i++){
        arr.push(arr2[i].split(','));
      }
      for(let i = 0; i < arr.length; i++){
        data.push({
          id: arr[i][0],
          first_name: arr[i][1],
          last_name: arr[i][2],
          email: arr[i][3],
          phone: arr[i][4],
          created_at: arr[i][5]
        })
      }
      console.log(data)
    })
    return data

    // return data
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(id,first_name,last_name,email,phone,created_at) {
    let obj = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      created_at: created_at
    }
    return obj
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson(201, 'Ida Bagus', 'Chahya Dhegana', 'dhegana@gmail.com', '08129042724', '2014-02-10T03:53:40-07:00')

console.log(parser.people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
