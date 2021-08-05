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