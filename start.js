// Importamos variables de entorno
require("dotenv").config({ path: "./variables.env" });

// Configuración inicial de Base de Datos
const sequelize = require("./config/database");
// Conectamos el ORM
sequelize.authenticate()
  .then( () => {
    console.log('✔✔✔✔ Database connected succesfully ✔✔✔✔');
  })
  .catch(err => {
    console.log(`✕✕✕✕ ${err.message} ✕✕✕✕`);
  });

// Declaramos los modelos que tendrá nuestra Base de Datos
const Employee = require('./models/Employee');

// Declaramos todas las relaciones entre nuestros modelos


// Le decimos a sequelize que cree las tablas
sequelize.sync();

// Empezamos la aplicación
const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
