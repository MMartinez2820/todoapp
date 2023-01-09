//conectarnos a la base de datos 
const {Sequelize} = require("sequelize");


const db = new Sequelize({
  database: "todoapp",//nombre de la base de datos hecha
  username: "postgres",//mi orm usado o tipo de base
  host: "localhost",//direcion ip
  port: "5432",//el puerto que usas de la base de dato
  password: "miguel123",//poner tu contraseña
  dialect: "postgres",//la base de datos que usas
} );
module.exports = db;
