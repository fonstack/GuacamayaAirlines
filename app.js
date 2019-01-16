// Importamos todas las dependencias principales
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const promisify = require("es6-promisify").promisify;
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const sequelize = require("./config/database");
const routes = require("./routes/index");
const helpers = require("./helpers");
const errorHandlers = require("./handlers/errorHandlers");
require("./config/passport");

// Importamos express
const app = express();

// Configuramos el Template Engine que usaremos
app.set("views", path.join(__dirname, "views")); // En la carpeta views es donde todos los archivos .pug deben estar
app.set("view engine", "pug"); // Definimos que usaremos PUG como template engine

// Definimos donde estarán los archivos que no son del server
app.use(express.static(path.join(__dirname, "public")));

// Midleware para retornar JSONs de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validaciones que vienen por defecto
app.use(expressValidator());

// Se creara en req con propiedad cookies con las cookies que viene de cada peticion
app.use(cookieParser());

// Sessions nos permite guardar informacion de los visitantes cada vez que hacen una peticion
// This keeps users logged in and allows us to send flash messages
const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000
});
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store
  })
);
store.sync();

// Definimos que usaremos passport
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages para mostrar errores en la página
app.use(flash());

// Middleware propio
app.use((req, res, next) => {
  res.locals.h = helpers; // Expondra el archivo helpers en la vistas
  res.locals.flashes = req.flash(); // Expondra los flashes en la vistas
  res.locals.user = req.user || null; // Expondra el usuario en la vistas o sera null
  res.locals.currentPath = req.path; // Expondra la ruta
  next();
});

// Declaramos que usaremos promisify para pasar funciones callback a promesas
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Declaramos las rutas
app.use("/", routes);

// Si no conseguimos el archivo le mandamos 404 al cliente
app.use(errorHandlers.notFound);

// Si el error es del cliente le advertimos con un flash
app.use(errorHandlers.flashValidationErrors);

// Si estamos desarrollando y la app falla veamos donde esta el error
if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

// Si la app falla y estamos en produccion los errores cambian
app.use(errorHandlers.productionErrors);

module.exports = app;
