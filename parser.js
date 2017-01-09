"use strict"

var fs = require('fs')
var csv = require('fast-csv')
var dataPerson = [];
var temp = "";

class PersonData {
    constructor(params) {
        this.id = params['id']
        this.first_name = params['first_name']
        this.last_name = params['last_name']
        this.email = params['email']
        this.phone = params['phone']
        this.created_at = params['created_at']
    }
}

class PersonParser {
    constructor(csvFile) {
        this._file = csvFile
    }

    get people() {
        fs.createReadStream(this._file).pipe(csv())
            .on('data', function(data) { // Untuk Menampilkan Data
                var tampilData = {
                    id: data[0],
                    first_name: data[1],
                    last_name: data[2],
                    email: data[3],
                    phone: data[4],
                    created_at: data[5]
                }
                dataPerson.push(new PersonData(tampilData))
            }).on('end', function(data) { // Untuk Menambah Data jika "end" diganti "data" prosesnya akan looping tidak akan berhenti
                var tambahData = {
                    id: "201",
                    first_name: "Dila",
                    last_name: "Arista",
                    email: "diladilo@gmail.com",
                    phone: "021-000033333",
                    created_at: new Date()
                }
                parser.addPerson(new PersonData(tambahData))
                for (var i = 0; i < dataPerson.length; i++) {
                    if (i == 0) {
                        temp += dataPerson[i].id + "," + dataPerson[i].first_name + "," + dataPerson[i].last_name + "," + dataPerson[i].email + "," + dataPerson[i].phone + "," + dataPerson[i].created_at + "\n";
                    } else {
                        temp += dataPerson[i].id + "," + dataPerson[i].first_name + "," + dataPerson[i].last_name + "," + dataPerson[i].email + "," + dataPerson[i].phone + "," + new Date(dataPerson[i].created_at) + "\n";
                    }
                }
                // console.log(dataPerson);
                console.log(temp);
                parser.save(temp); //Memasukkan Data ke dalam csv, data awal tidak boleh dalam bentuk csv
            })
    }
    addPerson(add) {
        dataPerson.push(add)
    }
    save(temp) {
        fs.writeFile('people.csv', temp)
    }

}

let parser = new PersonParser('people.csv')
parser.people // menampilkan ge people
