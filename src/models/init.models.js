const Categories = require("./categories.models");
const TodosCategories = require("./todos.categories.models");
const Todos = require("./todos.models");
const Users = require ("./users.models");


const initmodels = () =>{
  //Users;
  //Todos;
  //Categories;
  //TodosCategories;
  //creando las relaciones 
  //hasOne= que tines una tarea
  //hasMany = tienes muchas tareas
  //belongTo = pertenece a
  Todos.belongsTo(Users, {as: "author", foreignKey: "user_id"});//
  Users.hasMany(Todos, {as: "task", foreignKey: "user_id"});//

  //relacion muchos a muchos m-m
  TodosCategories.belongsTo(Todos, {as: "task", foreignKey: "todo_id"});
  Todos.hasMany(TodosCategories, {as: "category", foreignKey: "todo_id"});

  TodosCategories.belongsTo(Categories, {as: "category", foreignKey: "category_id"});
  Categories.hasMany(TodosCategories, {as: "category", foreignKey: "category_id"});
};

module.exports = initmodels;