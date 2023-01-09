const express  = require("express");
const db = require("./utils/database");
const initmodels = require("./models/init.models");
const Users = require("./models/users.models");
const Todos = require("./models/todos.models");

//crear una isntancia de express
const app = express();
app.use(express.json());

//puerto localhost
const PORT = 8000;

//probar la conexion  de la base de datos 
db.authenticate()
  .then(() => console.log("Autentication existosa"))//no lleva llave esta parte
  .catch((error) => console.log(error));

initmodels();
db.sync({force: false})//usar el sync para sincronizar la if
.then(() => console.log("base de datos sincronizada"))//no lleva llave esta parte
.catch((error) => console.log(error));

app.get('/', (req, res)=>{
  res.status(200).json({message: "Bienvenido al servidor"});
});

//definir la rutas de nustras enpoints (de ahira en adelanta)
//todas las consultas de usuarios
//localhost: 8000/users = todo para usuario
//localhodt: 8000/todos = todas las tareas

//GET a /users
app.get('/users', async (req, res) => {
  try {
    const result = await Users.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//obtener un usuario usando el id
app.get("/users/:id", async (req, res) => {
  try {
    //console.log(req.params);
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//obtner un usurio por username
app.get('/users/username/:username', async (req, res) =>{
  try {
    const {username} = req.params;
    const result = await Users.findOne({where: {username}});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//craer un usurio
app.post('/users', async (req, res) =>{
  try {
    const user = req.body;
    const result =  Users.create(user)
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
});

//actuliazar un usuario, solo podemos cabiar el password
app.put('/users/:id', async (req, res)=> {
  try {
    const {id} = req.params;
    const field = req.body;
    const result = await Users.update(field, {
      where: {id},
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//eliminar un usuario o tareas?
app.delete('/users/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const result = await Users.destroy({
      where: {id},
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en el ${PORT}`)
});

//Entregable 2 Todos

app.get('/todos', async (req, res) => {
  try {
    const result = await Todos.findAll();
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
});

app.get('/todos/:id', async (req, res)=> {
  try {
    const {id}=  req.params;
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});
// Buscando por la descripcion en la base de datos Todos
app.get('/todos/title/:title', async (req, res)=>{
  try {
    const {title} = req.params;
    const result = await Todos.findOne({where: {title},})
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

// creaer nuevas tareas en Todos
app.post('/todos', async (req, res) =>{
  try {
    const tod = req.body;
    const result = Todos.create(tod);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
});

//para actulaizar tareas 
app.put('/todos/:id', async (req, res)=>{
  try {
    const {id} = req.params;
    const field = req.body;
    const result = await Todos.update(field, {where: {id}, });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.delete('/todos/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const result = await Todos.destroy({where: {id}})
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
  }
})

