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
const User = require('./models/User');
const Office = require('./models/Office');

sequelize.sync()
  .then(result => {
    // console.log(result);
  })
    .catch(err => console.log(err));

// Empezamos la aplicación
const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
