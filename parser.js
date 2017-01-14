"use strict"
const fs = require("fs")
const csv = require("fast-csv")

class Person {
  constructor(id,first_name,last_name,email,phone){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at= new Date()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.peoples =[]
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    let dataTable = fs.readFileSync(this._file,'utf-8').split('\n')
    let tempTable = []
    for(var i=0 ;i< dataTable.length;i++){
      tempTable.push(dataTable[i].split(','))
    }
    tempTable= tempTable.splice(1,tempTable.length-1)


    for(var j=0;j<tempTable.length;j++){
      this.peoples.push(new Person(tempTable[j][0],tempTable[j][1],tempTable[j][2],tempTable[j][3],tempTable[j][4],tempTable[j][5]))
    }
    return this.peoples
    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(person) {
    this.peoples.push(person)
  }
  save(){
    let saving = fs.createWriteStream('peopleNew.csv')
    csv.write(this.people).pipe(saving)
  }
}

let parser = new PersonParser('people.csv')
let netta = new Person(0,'Fenetta','Masinambow','fenetta@yahoo.com','08989923554')
parser.addPerson(netta)
parser.save()
//let parser2 = new PersonParser('peopleNew.csv')
console.log(`There are ${parser.peoples.length} people in the file '${parser._file}'.`)
