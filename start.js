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

// Declaramos los modelos que tendrá nuestra Base de Dat os
const Employee = require('./models/Employee');
const MaintenanceReport = require('./models/MaintenanceReport');
const Airplane = require('./models/Airplane');
const AirplaneModel = require('./models/AirplaneModel');
const Provider = require('./models/Provider');
const Customer = require('./models/Customer');
const Airport = require('./models/Airport');
const CharterTicket = require('./models/CharterTicket');
const DetourManifest = require('./models/DetourManifest');
const FailureReport = require('./models/FailureReport');
const CancelationManifest = require('./models/CancelationManifest');


// Declaramos todas las relaciones entre nuestros modelos
AirplaneModel.hasMany(Airplane, { foreignKey: 'model' });
Airplane.hasMany(MaintenanceReport, { foreignKey: 'airplane' });
MaintenanceReport.belongsTo(Airplane);

// Le decimos a sequelize que cree las tablas
sequelize.sync({ force: true });



// Empezamos la aplicación
const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
