"use strict"
const fs = require('fs');
var faker = require('faker');

// function foo(){
//   let people = []
//   let datacsv = fs.readFile('people.csv', 'utf8', (err, data) => {
//     data = data.split("\n");
//     data.forEach(function(val){
//       val = val.split(",")
//       let ini = {
//         id : val[0],
//         firstName : val[1],
//         lastName : val[2],
//         email : val[3],
//         phone : val[4],
//         createdAt : new Date (val[5])
//       }
//       people.push(ini);
//       // console.log(ini);
//     });
//   });
//     // var writecsv = fs.writeFile('message.txt', datacsv, (err) => {
//     //   if (err) throw err;
//     //   console.log('It\'s saved!');
//   // });
//   return people
// }

class Person {
  constructor(id, firstName, lastName, email, phone){
    this.id = id,
    this.firstName = firstName,
    this.lastName = lastName,
    this.email = email,
    this.phone = phone,
    this.createdAt = new Date()
  }
}
class PersonParser {
  constructor(file) {
    this._file = fs.readFileSync(file, 'utf8');
    this._name = file;
    this._people = null;
    this.parsedFile = [];
    this.preSavedData = []
  }
  parseFile(){
    let result = []
    this._file = this._file.split("\n")
    this._file.forEach(function(data){
      data = data.split("\n");
        data.forEach(function(val){
          val = val.split(",")
          let ini = {
            id : val[0],
            firstName : val[1],
            lastName : val[2],
            email : val[3],
            phone : val[4],
            createdAt : new Date (val[5])
          }
          result.push(ini);
        });
    });
    return this.parsedFile = result;
  }
  get people(){
    return this.parsedFile;
  }
  get file(){
    return this._name;
  }
  addPerson(id, firstName, lastName, email, phone) {
    this.parsedFile.push(new Person(id, firstName, lastName, email, phone));
  }
  save(){
    for (let i = 0; i < this.parsedFile.length; i++){
      this.preSavedData.push(
        this.parsedFile[i].id + "," +
        this.parsedFile[i].firstName + "," +
        this.parsedFile[i].lastName + "," +
        this.parsedFile[i].email + "," +
        this.parsedFile[i].phone + "," +
        new Date(this.parsedFile[i].createdAt) + "\n"
      )
    }
  fs.writeFileSync('new-people.csv', this.preSavedData);
  }

}

let parser = new PersonParser('people.csv')
parser.parseFile();
parser.people;
parser.addPerson(201, faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumber());
parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
