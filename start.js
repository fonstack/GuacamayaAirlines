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
const Airplane = require('./models/Airplane');
const AirplaneModel = require('./models/AirplaneModel');
const Provider = require('./models/Provider');
const Customer = require('./models/Customer');
const Airport = require('./models/Airport');
const CharterTicket = require('./models/CharterTicket');
const DetourManifest = require('./models/DetourManifest');
const FailureReport = require('./models/FailureReport');
const MaintenanceReport = require('./models/MaintenanceReport');
const CancelationManifest = require('./models/CancelationManifest');
// const Flight = require('./models/Flight');
const FlightTicket = require('./models/FlightTicket');
// const FlightTicket_Flights = require('./models/FlightTicket_Flights');

// Declaramos todas las relaciones entre nuestros modelos
Airplane.belongsTo(AirplaneModel, { foreignKey: 'model', targetKey: 'model' });
AirplaneModel.hasMany(Airplane, { foreignKey: 'model', sourceKey: 'model' });

MaintenanceReport.belongsTo(Airplane, { foreignKey: 'airplaneId', targetKey: 'id' });
Airplane.hasMany(MaintenanceReport, { foreignKey: 'airplaneId', sourceKey: 'id' });

// Necesito la clase de Flight
// CancelationManifest.belongsTo(Flight, { foreignKey: 'flightCode', targetKey: 'code' })
// Flight.hasMany(CancelationManifest, { foreignKey: 'flightCode', sourceKey: 'code' })

FailureReport.belongsTo(Airplane, { foreignKey: 'airplaneId', targetKey: 'id' });
Airplane.hasMany(FailureReport, { foreignKey: 'airplaneId', sourceKey: 'id' });

// Necesito la clase de Flight
// DetourManifest.belongsTo(Flight, { foreignKey: 'flightCode', targetKey: 'code' })
// Flight.hasMany(DetourManifest, { foreignKey: 'flightCode', sourceKey: 'code' })

CharterTicket.belongsTo(Customer, { as: 'Passenger', foreignKey: 'passengerId', targetKey: 'id' });
Customer.hasMany(CharterTicket, { foreignKey: 'passengerId', sourceKey: 'id' });
// Necesito la clase de CharterFlight
// CharterTicket.belongsTo(Charter, { foreignKey: 'charterId', targetKey: 'id' });
// Charter.hasMany(CharterTicket, { foreignKey: 'charterId', sourcetKey: 'id' });

FlightTicket.belongsToMany(Flight, { through: 'FlightTicket_Flights', foreignKey: 'flightTicketId', otherKey: 'flightCode' });


FlightTicket.belongsTo(Customer, { as: 'Buyer', foreignKey: 'buyerId', targetKey: 'id' });
Customer.hasMany(FlightTicket, { foreignKey: 'buyerId', sourceKey: 'id' });
FlightTicket.belongsTo(Customer, { as: 'Passenger', foreignKey: 'passengerId', targetKey: 'id' });
Customer.hasMany(FlightTicket, { foreignKey: 'passengerId', sourceKey: 'id' });


// Le decimos a sequelize que cree las tablas
sequelize.sync({ force: true });

// Empezamos la aplicación
const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running ? PORT ${server.address().port}`);
});