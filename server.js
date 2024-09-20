const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// Aqui lo que hace es validar si la tabla existe.
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 

//esto descomentarlo despues de crear la ruta para que se pueda leer
let router = require('./app/routers/canciones.router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
//luego se descomenta la linea para usar la ruta
app.use('/', router);
app.get("/",(req,res) => {
  
  res.json({mesage:"Bienvenido Estudiante Jonatan Ajanel Gonzalez al nuevo server de render"});
})

// Creando el servidor para consumir la API
const server = app.listen(8080, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port); 
  })