/*
const fetch = require('node-fetch');
const dotenv = require("dotenv").config();
const yargs = require("yargs");

const TOKEN = process.env.TOKEN;
const URL = process.env.URL;

fetch('https://jsonplaceholder.typicode.com/users')
     .then(res => res.json())
     .then(json => {
         console.log("First user in the array");

         console.log(json[0]);
         console.log("Namse of the first user in the array")
         console.log(json[0].name);
     })

let todo = {
    userID : 123,
    title:"Loren lipsum doloris",
    completed:false
};

fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body : JSON.stringify(todo),
    headers : {'Content-Type':'application/json'}
}).then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err))

*/

//console.log("Hello World")
const args = process.argv
const name = args[2] ||  'world'
const times = args[4] || 1
if(args[2] === '--times'){
    name = args[4]
    times = args[3]
}
else if(args[3] === '--times'){
    name = args[2]
    times = args[4]
}
else if(args[2] && args[2] !== '--times'){
    name = args[2]
}
for(let i = 0 ; i<times ; i++){
    console.log(`Hello ${name}!`)
}
