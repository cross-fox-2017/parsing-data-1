"use strict"
const fs = require('fs');

var people = []
var datacsv = fs.readFile('people.csv', 'utf8', (err, data) => {
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
    people.push(ini);
    // console.log(ini);
  })
  var writecsv = fs.writeFile('message.txt', datacsv, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
});
console.log(datacsv);
console.log(people);


// class Person {
//   // Look at the above CSV file
//   // What attributes should a Person object have?
// }
//
// class PersonParser {
//
//   constructor(file) {
//     this._file = file
//     this._people = null
//   }
//
//   get people() {
//     // If we've already parsed the CSV file, don't parse it again
//     // Remember: people is null by default
//     if (this._people)
//       return this._people
//
//     // We've never called people before, now parse the CSV file
//     // and return an Array of Person objects here
//     // Save the Array in the people instance variable.
//   }
//
//   addPerson() {}
//
// }
//
// let parser = new PersonParser('people.csv')
//
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
