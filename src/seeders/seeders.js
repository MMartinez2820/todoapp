const db = require('../utils/database');
const Users = require('../models/users.models');
const Todos = require('../models/todos.models');

const users = [
  {username: "miguel", email: "miguel@gmail.com", password: "123"},
  {username: "emma", email: "emma@gmail.com", password: "123"},
  {username: "liz", email: "liz@gmail.com", password: "123"},

];

const todos = [
  { title: "tarea1", description: "un nueva", userId: 1},
  { title: "tarea2", description: "otra tarea", userId: 2},
  { title: "tarea3", description:"la realice", userId: 3},
  { title: "tarea4", description: "otra un nueva", userId: 3},
];

const categories = [

];

const todosCategories = [];

//create= insertar datos
//finOne, findAll, findByPk
//update
//destroy

db.sync({force: true})
  .then(() => {
    console.log('iniciando con el sombrio solicitado');
      users.forEach((user) => {Users.create(user)});
      setTimeout(() =>{
        todos.forEach((todo) => {Todos.create(todo)})
      }, 100);
  })//no lleva comilla
  .catch((error) => console.log(error));