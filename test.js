var fs = require('fs')

fs.readFile('people.csv', "utf-8", function(err, data){
  console.log(data);
})
