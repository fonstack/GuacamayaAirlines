const sequelize = require("../config/database");

exports.viewHome = (req, res) => {
  res.render("home", { title: 'home' });
};

exports.viewLogin = (req, res) => {
  res.render("login", { title: 'login' });
};

exports.viewRegister = (req, res) => {
  res.render("register", { title: 'register' });
};

exports.viewDashboard = (req, res) => {
  res.render("dashboard", { title: 'dashboard' });  
};

exports.viewAirport = (req, res) => {
  const iata = req.params.iata.toUpperCase();
  if ( iata !== 'MIA' && iata !== 'CCS' && iata !== 'JFK' && iata !== 'ATL' && iata !== 'CDG' && iata !== 'DXB') {
    req.flash('error', 'This airport does not exists.');
    req.session.save(function () {
      res.redirect('/');
    });
  } else {
    let airport = {};

    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${iata}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      airport = {
        iata,
        city: result[0].city,
        lon: result[0].lon,
        lat: result[0].lat,
        name: result[0].name
      };

      return sequelize.query(`
        SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE Routes.origin = '${iata}' OR Routes.destiny = '${iata}'
      `, { type: sequelize.QueryTypes.SELECT});
    })
    .then(result => {
      airport.flights = result;
      let flightsCrack = [];
        airport.flights.forEach(elem => {
          const xd = [];
          xd.push(elem);
          flightsCrack.push(xd);
        });
        airport.flights = flightsCrack;
      res.render("airport", { title: 'airport', airport });
    })
      .catch(err => console.log(err));
  }
};

exports.viewAdmin = (req, res) => {
  const section = req.params.section;

  if (section === 'planningFlights') {
    res.render("admin/planningFlights", { title: 'admin' });
  } else if (section === 'planningCharters') {
    res.render("admin/planningCharters", { title: 'admin' });
  } else if (section === 'planningRoutes') {
    res.render("admin/planningRoutes", { title: 'admin' });
  } else if (section === 'planningAirplanes') {
    res.render("admin/planningAirplanes", { title: 'admin' });
  } 
  
  else if (section === 'reportsFailures') {
    res.render("admin/reportsFailures", { title: 'admin' });
  } else if (section === 'reportsMaintenances') {
    res.render("admin/reportsMaintenances", { title: 'admin' });
  } else if (section === 'reportsDetours') {
    res.render("admin/reportsDetours", { title: 'admin' });
  } else if (section === 'reportsCancelations') {
    res.render("admin/reportsCancelations", { title: 'admin' });
  } 
  
  else if (section === 'salesFlightTickets') {
    res.render("admin/salesFlightTickets", { title: 'admin' });
  } else if (section === 'statisticsFlightTickets') {
    res.render("admin/statisticsFlightTickets", { title: 'admin' });
  } 
  
  else {
    req.flash('error', 'Not Found this route.');
    req.session.save(function () {
      res.redirect('/');
    });
  }
};

exports.viewAdminOnly = (req, res) => {
  res.render("admin", { title: 'admin' });
};

exports.searchFlights = (req, res) => {
  if (req.body.from === req.body.to) {
    req.flash('error', 'Can\'t search a flight with same origin and destiny.');
    req.session.save(function () {
      res.redirect('/');
    });
    return;
  }

  const from = req.body.from;
  const to = req.body.to;
  const dateDepart = req.body.dateDepart;
  const [day, month, year] = dateDepart.split('/');
  const newdate = `${year}-${month}-${day}`;
  const scales = req.body.scales;

  
  if (req.body.from && req.body.to && !req.body.dateDepart && !req.body.scales) { // From, To, NoScales
    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${to}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      airport = {
        iata: to,
        city: result[0].city,
        lon: result[0].lon,
        lat: result[0].lat,
        name: result[0].name
      };

      return sequelize.query(`
        SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE Routes.origin = '${from}' AND Routes.destiny = '${to}'
      `, { type: sequelize.QueryTypes.SELECT});
    })
    .then(result => {
      airport.flights = result;
      if (airport.flights.length === 0) {
        req.flash('info', 'Not found flights like that.');
        req.session.save(function () {
          res.redirect('/');
        });
      } else {
        let flightsCrack = [];
        airport.flights.forEach(elem => {
          const xd = [];
          xd.push(elem);
          flightsCrack.push(xd);
        });
        airport.flights = flightsCrack;
        
        res.render("airport", { title: 'airport', airport });
      }
    })
      .catch(err => console.log(err));

  } else if (req.body.from && req.body.to && req.body.dateDepart && !req.body.scales) { // From, To, Date, NoScales
    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${to}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      airport = {
        iata: to,
        city: result[0].city,
        lon: result[0].lon,
        lat: result[0].lat,
        name: result[0].name
      };

      return sequelize.query(`
        SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE Routes.origin = '${from}' AND Routes.destiny = '${to}' AND Flights.date = '${newdate}'
      `, { type: sequelize.QueryTypes.SELECT});
    })
    .then(result => {
      airport.flights = result;
      if (airport.flights.length === 0) {
        req.flash('info', 'Not found flights like that.');
        req.session.save(function () {
          res.redirect('/');
        });
      } else {
        let flightsCrack = [];
        airport.flights.forEach(elem => {
          const xd = [];
          xd.push(elem);
          flightsCrack.push(xd);
        });
        airport.flights = flightsCrack;
        res.render("airport", { title: 'airport', airport });
      }
    })
      .catch(err => console.log(err));

  } else if (req.body.from && req.body.to && !req.body.dateDepart && req.body.scales) { // From, To, Scales
































    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${to}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
        airport = {
          iata: to,
          city: result[0].city,
          lon: result[0].lon,
          lat: result[0].lat,
          name: result[0].name
        };
        airport.flights = [];

        // #######################################################################################################
        // ######################## PRIMER GENERADOR DE NUMEROS DE RUTAS PARA DOS ESCALAS ########################
        // #######################################################################################################
        sequelize.query(`
          SELECT a.id as ruta1, b.id as ruta2
          FROM Routes as a
          JOIN Routes as b
          WHERE (a.destiny = b.origin) AND (a.origin = '${from}') AND (b.destiny = '${to}')
        `, { type: sequelize.QueryTypes.SELECT})
          .then(result => {
            const ruta11 = result[0].ruta1;
            const ruta12 = result[0].ruta2;
              const ruta21 = result[1].ruta1;
              const ruta22 = result[1].ruta2;
                const ruta31 = result[2].ruta1;
                const ruta32 = result[2].ruta2;
                  const ruta41 = result[3].ruta1;
                  const ruta42 = result[3].ruta2;
            // VUELOS CON ESCALA (UTILIZAR NUMEROS DE RUTA GENERADOS POR EL QUERY GENERADOR DE RUTAS)
            sequelize.query(`
              SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
              FROM Flights AS a
              JOIN Flights AS b 
              INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
              INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
              WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta11}) + 2 HOUR) 
              AND (a.routeId = ${ruta11}) AND (b.routeId = ${ruta12}) AND (a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta11}) + 24 HOUR > b.date)
            `, { type: sequelize.QueryTypes.SELECT})
              .then(result => {
                result.forEach(element => {
                  let flightsCrack = [];
                  flightsCrack.push({
                    code: element.code_1,
                    origin: element.origin_1,
                    destiny: element.destiny_1,
                    date: element.date_1,
                    basePrice: element.price_1
                  });
                  flightsCrack.push({
                    code: element.code_2,
                    origin: element.origin_2,
                    destiny: element.destiny_2,
                    date: element.date_2,
                    basePrice: element.price_2
                  });
                  airport.flights.push(flightsCrack);
                });
                
                return sequelize.query(`
                  SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
                  FROM Flights AS a
                  JOIN Flights AS b 
                  INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
                  INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
                  WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta21}) + 2 HOUR) 
                  AND (a.routeId = ${ruta21}) AND (b.routeId = ${ruta22}) AND (a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta21}) + 24 HOUR > b.date)
                `, { type: sequelize.QueryTypes.SELECT})

              })
              .then(result => {
                result.forEach(element => {
                  let flightsCrack = [];
                  flightsCrack.push({
                    code: element.code_1,
                    origin: element.origin_1,
                    destiny: element.destiny_1,
                    date: element.date_1,
                    basePrice: element.price_1
                  });
                  flightsCrack.push({
                    code: element.code_2,
                    origin: element.origin_2,
                    destiny: element.destiny_2,
                    date: element.date_2,
                    basePrice: element.price_2
                  });
                  airport.flights.push(flightsCrack);
                });

                return sequelize.query(`
                  SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
                  FROM Flights AS a
                  JOIN Flights AS b 
                  INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
                  INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
                  WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta31}) + 2 HOUR) 
                  AND (a.routeId = ${ruta31}) AND (b.routeId = ${ruta32}) AND (a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta31}) + 24 HOUR > b.date)
                `, { type: sequelize.QueryTypes.SELECT})
              })
              .then(result => {
                result.forEach(element => {
                  let flightsCrack = [];
                  flightsCrack.push({
                    code: element.code_1,
                    origin: element.origin_1,
                    destiny: element.destiny_1,
                    date: element.date_1,
                    basePrice: element.price_1
                  });
                  flightsCrack.push({
                    code: element.code_2,
                    origin: element.origin_2,
                    destiny: element.destiny_2,
                    date: element.date_2,
                    basePrice: element.price_2
                  });
                  airport.flights.push(flightsCrack);
                });

                return sequelize.query(`
                  SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
                  FROM Flights AS a
                  JOIN Flights AS b 
                  INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
                  INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
                  WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta41}) + 2 HOUR) 
                  AND (a.routeId = ${ruta41}) AND (b.routeId = ${ruta42}) AND (a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta41}) + 24 HOUR > b.date)
                `, { type: sequelize.QueryTypes.SELECT})
              })
              .then(result => {
                result.forEach(element => {
                  let flightsCrack = [];
                  flightsCrack.push({
                    code: element.code_1,
                    origin: element.origin_1,
                    destiny: element.destiny_1,
                    date: element.date_1,
                    basePrice: element.price_1
                  });
                  flightsCrack.push({
                    code: element.code_2,
                    origin: element.origin_2,
                    destiny: element.destiny_2,
                    date: element.date_2,
                    basePrice: element.price_2
                  });
                  airport.flights.push(flightsCrack);
                });


                
              })
                .catch(err => console.log(err));
        })
          .catch(err => console.log(err));
          




        // #######################################################################################################
        // ####################### SEGUNDO GENERADOR DE NUMEROS DE RUTAS PARA TRES ESCALAS #######################
        // #######################################################################################################
        sequelize.query(`
          SELECT a.id as ruta1, b.id as ruta2, c.id as ruta3
          FROM Routes as a
          JOIN Routes as b
          JOIN Routes as c
          WHERE (a.destiny = b.origin) AND (b.destiny = c.origin) AND (a.origin = '${from}') AND (c.destiny = '${to}') AND (a.origin != b.destiny) AND (c.destiny != b.origin)
        `, { type: sequelize.QueryTypes.SELECT})
          .then(result => {
            const ruta11 = result[0].ruta1;
            const ruta12 = result[0].ruta2;
            const ruta13 = result[0].ruta3;
              const ruta21 = result[1].ruta1;
              const ruta22 = result[1].ruta2;
              const ruta23 = result[1].ruta3;
                const ruta31 = result[2].ruta1;
                const ruta32 = result[2].ruta2;
                const ruta33 = result[2].ruta3;
                  const ruta41 = result[3].ruta1;
                  const ruta42 = result[3].ruta2;
                  const ruta43 = result[3].ruta3;
                    const ruta51 = result[4].ruta1;
                    const ruta52 = result[4].ruta2;
                    const ruta53 = result[4].ruta3;
                      const ruta61 = result[5].ruta1;
                      const ruta62 = result[5].ruta2;
                      const ruta63 = result[5].ruta3;
                        const ruta71 = result[6].ruta1;
                        const ruta72 = result[6].ruta2;
                        const ruta73 = result[6].ruta3;
                          const ruta81 = result[7].ruta1;
                          const ruta82 = result[7].ruta2;
                          const ruta83 = result[7].ruta3;
                            const ruta91 = result[8].ruta1;
                            const ruta92 = result[8].ruta2;
                            const ruta93 = result[8].ruta3;
                              const ruta101 = result[9].ruta1;
                              const ruta102 = result[9].ruta2;
                              const ruta103 = result[9].ruta3;
                                const ruta111 = result[10].ruta1;
                                const ruta112 = result[10].ruta2;
                                const ruta113 = result[10].ruta3;
                                  const ruta121 = result[11].ruta1;
                                  const ruta122 = result[11].ruta2;
                                  const ruta123 = result[11].ruta3;
            const array1 = [ruta11, ruta21, ruta31, ruta41, ruta51, ruta61, ruta71, ruta81, ruta91, ruta101, ruta111, ruta121];
            const array2 = [ruta12, ruta22, ruta32, ruta42, ruta52, ruta62, ruta72, ruta82, ruta92, ruta102, ruta112, ruta122];
            const array3 = [ruta13, ruta23, ruta33, ruta43, ruta53, ruta63, ruta73, ruta83, ruta93, ruta103, ruta113, ruta123];
            // VUELOS CON ESCALA (UTILIZAR NUMEROS DE RUTA GENERADOS POR EL QUERY GENERADOR DE RUTAS)
            for (let i = 0; i < 12; i++) {
              
              sequelize.query(`
                SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2, c.code as code_3, tableroutes3.origin as origin_3, tableroutes3.destiny as destiny_3, c.date as date_3, tableroutes3.basePrice as price_3
                FROM Flights AS a
                JOIN Flights AS b 
                JOIN Flights AS c
                INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
                INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
                INNER JOIN Routes AS tableroutes3 ON tableroutes3.id = c.routeId
                WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${array1[i]} ) + 2 HOUR) 
                AND (c.date > b.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${array2[i]} ) + 2 HOUR) 
                AND (a.routeId = ${array1[i]} ) AND (b.routeId = ${array2[i]} ) AND (c.routeId = ${array3[i]}) AND (a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${array1[i]}) + 24 HOUR > b.date)
                AND (b.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${array2[i]}) + 24 HOUR > c.date)
              `, { type: sequelize.QueryTypes.SELECT})
                .then(result => {
                  result.forEach(element => {
                    let flightsCrack = [];
                    flightsCrack.push({
                      code: element.code_1,
                      origin: element.origin_1,
                      destiny: element.destiny_1,
                      date: element.date_1,
                      basePrice: element.price_1
                    });
                    flightsCrack.push({
                      code: element.code_2,
                      origin: element.origin_2,
                      destiny: element.destiny_2,
                      date: element.date_2,
                      basePrice: element.price_2
                    });
                    flightsCrack.push({
                      code: element.code_3,
                      origin: element.origin_3,
                      destiny: element.destiny_3,
                      date: element.date_3,
                      basePrice: element.price_3
                    });
                    airport.flights.push(flightsCrack);
                  });
                })
                  .catch(err => console.log(err));
            }
            
            setTimeout(() => {
              if (airport.flights.length === 0) {
                req.flash('info', 'Not found flights like that.');
                req.session.save(function () {
                  res.redirect('/login');
                });
              } else {
                res.render('airport', { title: 'airport', airport });
              }
            }, 3000);
        })
          .catch(err => console.log(err));


      })
        .catch(err => console.log(err));







































  } else if (req.body.from && req.body.to && req.body.from && req.body.dateDepart && req.body.scales) { // From, To, Date, Scales
    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${to}'
    `, { type: sequelize.QueryTypes.SELECT})
      .then(result => {
        airport = {
          iata: to,
          city: result[0].city,
          lon: result[0].lon,
          lat: result[0].lat,
          name: result[0].name
        };

        // PRIMER GENERADOR DE NUMEROS DE RUTAS PARA UTILIZAR EN QUERY SUPERIOR
        return sequelize.query(`
          SELECT a.id as ruta1, b.id as ruta2
          FROM Routes as a
          JOIN Routes as b
          WHERE (a.destiny = b.origin) AND (a.origin = '${from}') AND (b.destiny = '${to}')
        `, { type: sequelize.QueryTypes.SELECT});
      })
      .then(result => {
        const ruta11 = result[0].ruta1;
        const ruta12 = result[0].ruta2;
          const ruta21 = result[1].ruta1;
          const ruta22 = result[1].ruta2;
            const ruta31 = result[2].ruta1;
            const ruta32 = result[2].ruta2;
              const ruta41 = result[3].ruta1;
              const ruta42 = result[3].ruta2;
        // VUELOS CON ESCALA (UTILIZAR NUMEROS DE RUTA GENERADOS POR EL QUERY GENERADOR DE RUTAS)
        sequelize.query(`
          SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
          FROM Flights AS a
          JOIN Flights AS b 
          INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
          INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
          WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta11}) + 2 HOUR) 
          AND (a.routeId = ${ruta11}) AND (b.routeId = ${ruta12}) AND a.date = '${newdate}'
        `, { type: sequelize.QueryTypes.SELECT})
          .then(result => {
            airport.flights = [];
            result.forEach(element => {
              let flightsCrack = [];
              flightsCrack.push({
                code: element.code_1,
                origin: element.origin_1,
                destiny: element.destiny_1,
                date: element.date_1,
                basePrice: element.price_1
              });
              flightsCrack.push({
                code: element.code_2,
                origin: element.origin_2,
                destiny: element.destiny_2,
                date: element.date_2,
                basePrice: element.price_2
              });
              airport.flights.push(flightsCrack);
            });
            
            return sequelize.query(`
              SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
              FROM Flights AS a
              JOIN Flights AS b 
              INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
              INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
              WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta21}) + 2 HOUR) 
              AND (a.routeId = ${ruta21}) AND (b.routeId = ${ruta22}) AND a.date = '${newdate}'
            `, { type: sequelize.QueryTypes.SELECT})

          })
          .then(result => {
            result.forEach(element => {
              let flightsCrack = [];
              flightsCrack.push({
                code: element.code_1,
                origin: element.origin_1,
                destiny: element.destiny_1,
                date: element.date_1,
                basePrice: element.price_1
              });
              flightsCrack.push({
                code: element.code_2,
                origin: element.origin_2,
                destiny: element.destiny_2,
                date: element.date_2,
                basePrice: element.price_2
              });
              airport.flights.push(flightsCrack);
            });

            return sequelize.query(`
              SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
              FROM Flights AS a
              JOIN Flights AS b 
              INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
              INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
              WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta31}) + 2 HOUR) 
              AND (a.routeId = ${ruta31}) AND (b.routeId = ${ruta32}) AND a.date = '${newdate}'
            `, { type: sequelize.QueryTypes.SELECT})
          })
          .then(result => {
            result.forEach(element => {
              let flightsCrack = [];
              flightsCrack.push({
                code: element.code_1,
                origin: element.origin_1,
                destiny: element.destiny_1,
                date: element.date_1,
                basePrice: element.price_1
              });
              flightsCrack.push({
                code: element.code_2,
                origin: element.origin_2,
                destiny: element.destiny_2,
                date: element.date_2,
                basePrice: element.price_2
              });
              airport.flights.push(flightsCrack);
            });

            return sequelize.query(`
              SELECT a.code as code_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, a.date as date_1, tableroutes.basePrice as price_1, b.code as code_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2, b.date as date_2, tableroutes2.basePrice as price_2
              FROM Flights AS a
              JOIN Flights AS b 
              INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
              INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
              WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = ${ruta41}) + 2 HOUR) 
              AND (a.routeId = ${ruta41}) AND (b.routeId = ${ruta42}) AND a.date = '${newdate}'
            `, { type: sequelize.QueryTypes.SELECT})
          })
          .then(result => {
            result.forEach(element => {
              let flightsCrack = [];
              flightsCrack.push({
                code: element.code_1,
                origin: element.origin_1,
                destiny: element.destiny_1,
                date: element.date_1,
                basePrice: element.price_1
              });
              flightsCrack.push({
                code: element.code_2,
                origin: element.origin_2,
                destiny: element.destiny_2,
                date: element.date_2,
                basePrice: element.price_2
              });
              airport.flights.push(flightsCrack);
            });
            
            if (airport.flights.length === 0) {
              req.flash('info', 'Not found flights like that.');
              req.session.save(function () {
                res.redirect('/');
              });
            } else {
              res.render('airport', { title: 'airport', airport });
            }
            
          })
            .catch(err => console.log(err));
      })
        .catch(err => console.log(err));
  }

};




// // -------- QUERYS --------

// // Tabla con el precio de todos los vuelos charter y su ID
// sequelize.query(`
//   SELECT Charters.id, Providers.pricePerKilometer * Routes.travelDistance as charterCost
//   FROM Charters 
//   INNER JOIN Providers ON Charters.providerId = Providers.id
//   INNER JOIN Routes ON Charters.routeId = Routes.id
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Ganancia de todos los tickets normales vendidos en un perído determinado
// sequelize.query(`
//   SELECT SUM(salePrice) as ticketsProfit FROM FlightTicket
//   WHERE createdAt = '2019-11-15'
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Costo de todos los vuelos charter en una período determinado
// sequelize.query(`
//   SELECT SUM(Providers.pricePerKilometer * Routes.travelDistance) as charterCost 
//   FROM Charters 
//   INNER JOIN Providers ON Charters.providerId = Providers.id
//   INNER JOIN Routes ON Charters.routeId = Routes.id
//   WHERE date = '2019-11-15'
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Tabla con ID de cada vuelo acompañado de #Tickets, #Abordados y %Abordados
// sequelize.query(`
//   SELECT flightCode, COUNT(flightCode) as cantTickets, SUM(isBoard) as cantBoard, concat( truncate( ( (SUM(isBoard) / COUNT(isBoard)) * 100), 2 ), '%' ) as percentageBoard
//   FROM FlightTicket_Flights
//   GROUP BY flightCode
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Tabla con destinos más visitados con la cantidad de Tickets
// sequelize.query(`
//   SELECT count(Routes.destiny), Routes.destiny
//   FROM Flights
//   INNER JOIN Routes ON Flights.routeId = Routes.id
//   INNER JOIN FlightTicket_Flights ON Flights.code = FlightTicket_Flights.flightCode
//   GROUP BY Routes.destiny
//   ORDER BY count(Routes.destiny) DESC
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

//     // Tabla con cantidad de personas de n edad
//     sequelize.query(`
//       SELECT count(age) as totalCustomers, age
//       FROM Customers
//       GROUP BY age
//       ORDER BY totalCustomers DESC
//     `).then(result => res.json(result[0]))
//         .catch(err => console.log(err));

//     // Tabla con cantidad de personas de n nacionalidad
//     sequelize.query(`
//       SELECT count(nationality) as totalCustomers, nationality
//       FROM Customers
//       GROUP BY nationality
//       ORDER BY totalCustomers DESC
//     `).then(result => res.json(result[0]))
//         .catch(err => console.log(err));

//     // Tabla con cantidad de personas de n género
//     sequelize.query(`
//       SELECT count(gender) as totalCustomers, gender
//       FROM Customers
//       GROUP BY gender
//       ORDER BY gender DESC
//     `).then(result => res.json(result[0]))
//         .catch(err => console.log(err));

// // Tabla con cantidad de pasajes con sobreventa de un vuelo específico
// sequelize.query(`
//   SELECT flightTicketId, count(flightCode)
//   FROM FlightTicket_Flights
//   WHERE affectOverbooking = 1
//   GROUP BY flightCode
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Tabla con id de avión y peso promedio de los vuelos
// sequelize.query(`
//   SELECT Flights.airplaneId, (SUM(FlightTicket_Flights.cantPacking * 23) / count(DISTINCT Flights.code)) as promedio
//   FROM Flights
//   INNER JOIN FlightTicket_Flights ON Flights.code = FlightTicket_Flights.flightCode
//   GROUP BY Flights.airplaneId
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Porcentaje de vuelos son sobreventa
// sequelize.query(`
//   SELECT count(DISTINCT flightTicketId) as uniqueFlight, count(DISTINCT flightTicketId), count(case flightTicketId when affectOverbooking = 1 then 1 else null end)
//   FROM FlightTicket_Flights;
//   SELECT concat((100*(count(case flightTicketId when affectOverbooking = 1 then 1 else null end)/count(DISTINCT flightTicketId))), '%') as uniqueFlight 
//   FROM FlightTicket_Flights;
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Tabla con ID de vuelo, Origen, Destino, Fecha Salida, Precio (Solo elige origen y destino) NO ESCALA
// sequelize.query(`
//   SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
//   FROM Flights
//   INNER JOIN Routes ON Flights.routeId = Routes.id
//   WHERE Routes.origin = 'ATL' AND Routes.destiny = 'CDG'; 
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Tabla con ID de vuelo, Origen, Destino, Fecha de salida, Precio (Elige origen, destino y fecha) NO ESCALA
// sequelize.query(`
//   SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
//   FROM Flights
//   INNER JOIN Routes ON Flights.routeId = Routes.id
//   WHERE Routes.origin = 'ATL' AND Routes.destiny = 'CDG' AND Flights.date = '2019-04-13'; 
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Cantidad de aviones por estado
// sequelize.query(`
//   SELECT count(id), state
//   FROM Airplanes
//   GROUP BY state
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // Asientos ocupados por número de vuelo
// sequelize.query(`
//   SELECT Flights.code, FlightTicket_Flights.seatNumber
//   FROM Flights
//   INNER JOIN FlightTicket_Flights ON FlightTicket_Flights.flightCode = Flights.code
//   INNER JOIN Airplanes ON Airplanes.id = Flights.airplaneId
//   INNER JOIN AirplaneModels ON AirplaneModels.model = Airplanes.model
//   HAVING Flights.code = 2
//   ORDER BY FlightTicket_Flights.seatNumber ASC;
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // VUELOS CON ESCALA (UTILIZAR NUMEROS DE RUTA GENERADOS POR EL QUERY GENERADOR DE RUTAS)
// sequelize.query(`
  // SELECT a.code as code_1, a.date as date_1, tableroutes.origin as origin_1, tableroutes.destiny as destiny_1, b.code as code_2, b.date as date_2, tableroutes2.origin as origin_2, tableroutes2.destiny as destiny_2
  // FROM Flights AS a
  // JOIN Flights AS b 
  // INNER JOIN Routes AS tableroutes ON tableroutes.id = a.routeId 
  // INNER JOIN Routes AS tableroutes2 ON tableroutes2.id = b.routeId 
  // WHERE (b.date > a.date + INTERVAL (SELECT travelTime FROM Routes WHERE id = 12)+2 HOUR) 
  // AND (a.routeId = 12) AND (b.routeId = 26)
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // PRIMER GENERADOR DE NUMEROS DE RUTAS PARA UTILIZAR EN QUERY SUPERIOR
// sequelize.query(`
//   SELECT a.id as ruta1, b.id as ruta2
//   FROM Routes as a
//   JOIN Routes as b
//   WHERE (a.destiny = b.origin) AND (a.origin = 'ATL') AND (b.destiny = 'CCS')
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));

// // VUELOS QUE REQUIEREN MANTENIMIENTO
// sequelize.query(`
//   SELECT airplaneId
//   FROM MaintenanceReports
//   WHERE (endDate + INTERVAL 3 MONTH <= NOW())
// `).then(result => res.json(result[0]))
//     .catch(err => console.log(err));































// #################################
// ######## PRIMERA ENTREGA ########
// #################################
// exports.viewOffices = (req, res) => {
//   Office.findAll({ where: { rip: 0 } })
//     .then(offices => {
//       res.render("project", { title: 'project', offices });
//     })
//       .catch(err => console.log('ERROR IN ViewOffices ' + err));

//   // sequelize.query('SELECT * FROM Offices WHERE rip = 0', { type: sequelize.QueryTypes.SELECT})
//   //   .then(offices => {
//   //     res.render("project", { title: 'project', offices });
//   //   })
//   //     .catch(err => console.log('ERROR IN ViewOffices ' + err));
// };

// exports.createOffice = (req, res) => {
//   Office.create({
//     phone: req.body.phone,
//     address: req.body.address,
//     country: req.body.country})
//       .then(result => {
//         req.flash('success', 'An Office was added succesfully!');
//         req.session.save(function () {
//           res.redirect('/project');
//         });
//       })
//         .catch(err => console.log('ERROR IN CreateOffice ' + err));
// };

// exports.deleteOffice = (req, res) => {
//   const idToDelete = req.params.id;
//   Office.update({ rip: 1 }, { where: { officeCode: idToDelete } })
//     .then(result => {
//       req.flash('success', 'The Office was deleted succesfully!');
//       req.session.save(function () {
//         res.redirect('/project');
//       });
//     })
//       .catch(err => console.log('ERROR IN DeleteOffice ' + err));

//   // sequelize.query(`UPDATE Offices SET rip = 1 WHERE officeCode = ${idToDelete}`)
//   //   .then(result => {
//   //     req.flash('success', 'The Office was deleted succesfully!');
//   //     res.redirect('/project');
//   //   })
//   //     .catch(err => console.log('ERROR IN DeleteOffice ' + err));
// };

// Saber Cantidad de pasajes Business y Economic libres en un vuelo (Incluyendo sobreventa)
