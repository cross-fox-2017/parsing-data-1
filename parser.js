"use strict"

const fs = require('fs');
const csv = require("fast-csv");

let dataPerson = []
let dataString = ''

class Person {
  constructor(person){
  this.userId = person['userId'];
  this.first_name = person['first_name'];
  this.last_name = person['last_name'];
  this.email = person['email'];
  this.phone = person['phone'];
  this.created_at = person['created_at'];
  }
}

let person = new Person({
  userId:202,
  first_name:'mangku',
  last_name:'widodo',
  email:'mangkuwi26@gmail.com',
  phone:0-633-389-7170,
  created_at:"2016-12-03T12:00:00"
})

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    csv.fromPath(this._file).on("data", function(data){
    dataPerson.push(new Person({userId: data[0], first_name: data[1], last_name: data[2], email:data[3], phone: data[4], created_at: data[5]}))
   })
   .on("end", function(){
     parser.addPerson(person)
     for (var i = 0; i < dataPerson.length; i++) {
       dataString += dataPerson[i].userId + ',' + dataPerson[i].first_name+","
       +dataPerson[i].last_name+","+dataPerson[i].email+","+dataPerson[i].phone+","
       +new Date(dataPerson[i].created_at)+"\n";
     }
    //  console.log(dataString);
     parser.save(dataString);
   });

  if (this._people)
    return this._people;
  }


  addPerson() {
    dataPerson.push(person)
  }
  save(){
    fs.writeFile('people.csv', dataString)
  }

}

let parser = new PersonParser('people.csv')
parser.people
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
