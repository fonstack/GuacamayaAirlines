import "../sass/styles.scss";
const http = new XMLHttpRequest();
const axios = require('axios');


// -+-+-+-+-+ INITIALIZATION DATEPICKER HOME -- Materialize -+-+-+-+-+
document.addEventListener('DOMContentLoaded', function() {
  const minDate = new Date;
  const maxDate = new Date;
  maxDate.setDate(maxDate.getDate() + 365);
  const elems = document.querySelector('.datepickerHome');
  const cont = document.querySelector('.home');
  const instances = M.Datepicker.init(elems, {
    autoClose: true,
    container: cont,
    format: 'dd/mm/yyyy',
    firstDay: 1,
    minDate: minDate,
    maxDate: maxDate
  });
});


// -+-+-+-+-+ INITIALIZATION SELECTS OF HOME -- Materialize -+-+-+-+-+
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.select-home');
  var instances = M.FormSelect.init(elems, {
    
  });
});


// -+-+-+-+-+ INITIALIZATION TOOLTIPS OF HOME MAP -+-+-+-+-+
$(document).ready(function() {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-punk',
    contentAsHTML: true,
    animation: 'swing',
    delay: 100,
    interactive: true
  });
});


// -+-+-+-+-+ INITIALIZATION SIDENAV ADMIN -- Materialize -+-+-+-+-+
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
  });
});
// Se configura el botón para mostrar el sideNav
const botonSidenav = document.querySelector('.openButton');
if (botonSidenav) {
  botonSidenav.addEventListener('click', function() {
    const instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
      instance.open();
  });
}


// -+-+-+-+-+ INITIALIZATION COOLAPSIBLE ADMIN -- Materialize -+-+-+-+-+
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {
  });
});


// -+-+-+-+-+ INITIALIZATION MODALS -- Materialize -+-+-+-+-+
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    
  });
});


// -+-+-+-+-+ INITIALIZATION BUTTON FOR LOADER IN HOME -+-+-+-+-+
if (document.querySelector('.btnHome')) {
  document.querySelector('.btnHome').addEventListener('click', () => {
    if (document.querySelector('#selectHomeTo').value != '' && document.querySelector('#selectHomeFrom').value != '')
    document.querySelector('.loadingView').style.display = 'block';
  });
}


// -+-+-+-+-+ INITIALIZATION AUTOCOMPLETE -- Materialize -+-+-+-+-+
// Se obtienen todos los Customers para el autocompletado del input de Buyer
axios.get('/getCustomers')
  .then(response => {
    const elems = document.querySelectorAll('.autocompleteBuyer');
    const array = response.data.reduce((acc, cur) => ({...acc, [cur.identityCard]: `https://randomuser.me/api/portraits/${cur.gender === 'Male' ? 'men' : 'women'}/${Math.floor((Math.random() * 100))}.jpg`}), {});
    const instances = M.Autocomplete.init(elems, {
      data: array,
      onAutocomplete: disabledOtherInputsBuyer,
      limit: 3
    });
  }).catch(err => console.log(err));

// Se obtienen todos los Customers del servidor para el autocompletado del input de Passenger
axios.get('/getCustomers')
  .then(response => {
    const elems = document.querySelectorAll('.autocompletePass');
    const array = response.data.reduce((acc, cur) => ({...acc, [cur.identityCard]: `https://randomuser.me/api/portraits/${cur.gender === 'Male' ? 'men' : 'women'}/${Math.floor((Math.random() * 100))}.jpg`}), {});
    const instances = M.Autocomplete.init(elems, {
      data: array,
      onAutocomplete: disabledOtherInputsPass,
      limit: 3
    });
  }).catch(err => console.log(err));
  
const identityC = document.querySelectorAll('#identityCardPur');
const firstName = document.querySelectorAll('#firstNamePur');
const lastName = document.querySelectorAll('#lastNamePur');
const age = document.querySelectorAll('#agePur');
const nationality = document.querySelectorAll('#nationalityPur');
const gender = document.querySelectorAll('#genderPur');
const email = document.querySelectorAll('#emailPur');

const identityCPass = document.querySelectorAll('#identityCardPurPass');
const firstNamePass = document.querySelectorAll('#firstNamePurPass');
const lastNamePass = document.querySelectorAll('#lastNamePurPass');
const agePass = document.querySelectorAll('#agePurPass');
const nationalityPass = document.querySelectorAll('#nationalityPurPass');
const genderPass = document.querySelectorAll('#genderPurPass');
const emailPass = document.querySelectorAll('#emailPurPass');

// Función que se ejecuta cuando se autocompleta el campo de Buyer
function disabledOtherInputsBuyer() {
  // Pedimos la data del Customer que se autocompletó al servidor
  identityC.forEach(element => {
    if (element.value != '') {
      axios.get(`/getCustomer/${element.value}`)
        .then(response => {
          const customerData = response.data[0];
          // Llenamos los campos con la data del Customer y deshabilitamos los campos
          identityC.forEach(element => {
            element.value = customerData.identityCard; element.readOnly = true; element.classList.add('disabledPirata');
          });
          firstName.forEach(element => {
            element.value = customerData.firstName; element.readOnly = true; element.classList.add('disabledPirata');
          });
          lastName.forEach(element => {
            element.value = customerData.lastName; element.readOnly = true; element.classList.add('disabledPirata');
          });
          age.forEach(element => {
            element.value = customerData.age; element.readOnly = true; element.classList.add('disabledPirata');
          });
          email.forEach(element => {
            element.value = customerData.email; element.readOnly = true; element.classList.add('disabledPirata');
          });
          nationality.forEach(element => {
            setSelectBoxByText('nationalityPur', customerData.nationality); element.readOnly = true; element.classList.add('disabledPirata');
          });
          gender.forEach(element => {
            setSelectBoxByText('genderPur', customerData.gender); element.readOnly = true; element.classList.add('disabledPirata');
          });
          // Se le agrega la clase active a los labels de los inputs para quitar bug visual
          document.querySelectorAll('#fre').forEach(entry => {
            entry.classList.add('active');
          });
        }).catch(err => console.log(err));
    }
  });
}

// Función que se ejecuta cuando se autocompleta el campo de Passenger
function disabledOtherInputsPass() {
// Pedimos la data del Customer que se autocompletó al servidor
  identityCPass.forEach(element => {
    if (element.value != '') {
      axios.get(`/getCustomer/${element.value}`)
        .then(response => {
          const customerData = response.data[0];
          // Llenamos los campos con la data del Customer y deshabilitamos los campos
          identityCPass.forEach(element => {
            element.value = customerData.identityCard; element.readOnly = true; element.classList.add('disabledPirata');
          });
          firstNamePass.forEach(element => {
            element.value = customerData.firstName; element.readOnly = true; element.classList.add('disabledPirata');
          });
          lastNamePass.forEach(element => {
            element.value = customerData.lastName; element.readOnly = true; element.classList.add('disabledPirata');
          });
          agePass.forEach(element => {
            element.value = customerData.age; element.readOnly = true; element.classList.add('disabledPirata');
          });
          emailPass.forEach(element => {
            element.value = customerData.email; element.readOnly = true; element.classList.add('disabledPirata');
          });
          nationalityPass.forEach(element => {
            setSelectBoxByText('nationalityPurPass', customerData.nationality); element.readOnly = true; element.classList.add('disabledPirata');
          });
          genderPass.forEach(element => {
            setSelectBoxByText('genderPurPass', customerData.gender); element.readOnly = true; element.classList.add('disabledPirata');
          });
          // Se le agrega la clase active a los labels de los inputs para quitar bug visual
          document.querySelectorAll('#frex').forEach(entry => {
            entry.classList.add('active');
          });
        }).catch(err => console.log(err));
    }
  });
}

// Función para seleccionar una opción en un select
function setSelectBoxByText(eid, optionText) {
  let select = document.querySelectorAll(`#${eid}`);
  select.forEach(ele => {
    for (let i = 0; i < ele.options.length; ++i) {
      if (ele.options[i].text === optionText) {
        ele.options[i].selected = true;
      }
    }
  });
}

// Limpiar los campos con el botón de Clean
if (document.querySelector('#cleanButton')) {
  document.querySelectorAll('#cleanButton').forEach(element => {
    element.addEventListener('click', () => {
      // Limpiamos campos de Buyer
      identityC.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      firstName.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      lastName.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      age.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      email.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      nationality.forEach(ele => {
        ele.selectedIndex = 0; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      gender.forEach(ele => {
        ele.selectedIndex = 0; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      // Limpiamos campos de Passenger
      identityCPass.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      firstNamePass.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      lastNamePass.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      agePass.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      emailPass.forEach(ele => {
        ele.value = ''; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      nationalityPass.forEach(ele => {
        ele.selectedIndex = 0; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      genderPass.forEach(ele => {
        ele.selectedIndex = 0; ele.readOnly = false; ele.classList.remove('disabledPirata');
      });
      // Se le remueve la clase active a los labels de los inputs para quitar bug visual
      document.querySelectorAll('#fre').forEach(entry => {
        entry.classList.remove('active');
      });  
      document.querySelectorAll('#frex').forEach(entry => {
        entry.classList.remove('active');
      });  
    });
  });
}


// -+-+-+-+-+ INITIALIZATION CONTROL BUTTONS OF AIRPORTS MODALS -+-+-+-+-+
if (document.querySelector('#nextForm')) {
  document.querySelectorAll('#nextForm').forEach(elem => {
    elem.addEventListener('click', (e) => {
      document.querySelectorAll('.modalPurchase').forEach(ele => {
        ele.classList.add('rotateActive');
      });
    });
  });
}

if (document.querySelector('#backForm')) {
  document.querySelectorAll('#backForm').forEach(elem => {
    elem.addEventListener('click', (e) => {
      document.querySelectorAll('.modalPurchase').forEach(ele => {
        ele.classList.remove('rotateActive');
      });
    });
  });  
}


// -+-+-+-+-+ INITIALIZATION CHECKBOX BUYERISPASSENGER -+-+-+-+-+
const checkBuyerPassenger = document.querySelectorAll('.buyerIsPassenger');
const passengerInformation = document.querySelectorAll('.passengerInformation');
const frontSide = document.querySelectorAll('.frontSide');
const modalFooter = document.querySelectorAll('.modal-footer');
checkBuyerPassenger.forEach(element => {
  element.addEventListener('click', () => {
    if (element.checked == true) {
      // Si uno esta checked, ponemos todos checked
      checkBuyerPassenger.forEach(ele => {
        ele.checked = true;
      });
      // Se oculta la información del pasajero
      passengerInformation.forEach(ele => {
        ele.style.display = 'none';
      });
      // Se modifica el tamaño de todos los FrontSide
      frontSide.forEach(ele => {
        ele.style.height = '40rem';
      });
      // Se modifica el tamaño de todos los footers de los modals
      modalFooter.forEach(ele => {
        ele.style.marginTop = '5rem';
      });
      
      // Deshabilitamos los campos del passenger para que no se envíen al servidor
      identityCPass.forEach(ele => {
        ele.disabled = true;
      });
      firstNamePass.forEach(ele => {
        ele.disabled = true;
      });
      lastNamePass.forEach(ele => {
        ele.disabled = true;
      });
      agePass.forEach(ele => {
        ele.disabled = true;
      });
      nationalityPass.forEach(ele => {
        ele.disabled = true;
      });
      genderPass.forEach(ele => {
        ele.disabled = true;
      });
      emailPass.forEach(ele => {
        ele.disabled = true;
      });
    } else {
      // Si uno esta no checked, ponemos todos no checked
      checkBuyerPassenger.forEach(ele => {
        ele.checked = false;
      });
      // Se muestra la información del pasajero
      passengerInformation.forEach(ele => {
        ele.style.display = 'block';
      });
      // Se modifica el tamaño de todos los FrontSide
      frontSide.forEach(ele => {
        ele.style.height = '52rem';
      });
      // Se modifica el tamaño de todos los footers de los modals
      modalFooter.forEach(ele => {
        ele.style.marginTop = '0';
      });
  
      // Habilitamos los campos del passenger para que se envíen al servidor
      identityCPass.forEach(ele => {
        ele.disabled = false;
      });
      firstNamePass.forEach(ele => {
        ele.disabled = false;
      });
      lastNamePass.forEach(ele => {
        ele.disabled = false;
      });
      agePass.forEach(ele => {
        ele.disabled = false;
      });
      nationalityPass.forEach(ele => {
        ele.disabled = false;
      });
      genderPass.forEach(ele => {
        ele.disabled = false;
      });
      emailPass.forEach(ele => {
        ele.disabled = false;
      });
    }
  });
});

// Selects Seats
// const selectsSeats = document.querySelectorAll('.selectSeats');

// selectsSeats.forEach(element => {
//   const id = element.getAttribute('id');
//   const flightCode = id.split('selectSeat')[1];

//   axios.get(`/getEmptySeats/${flightCode}`)
//   .then(response => {

//     const asientosOcupados = [];
//     response.data.forEach(ele => {
//       asientosOcupados.push(ele.seatNumber);
//     });

//     for (let i = 0; i < 38; i++) {
//       if (!asientosOcupados.includes('' + (i + 1))) {
//         const opt = document.createElement('option');
//         opt.value = i + 1;
//         opt.innerHTML = i + 1;
//         element.appendChild(opt);
//       }
//     }
//   }).catch(err => console.log(err));
// });


// -+-+-+-+-+ INITIALIZATION SEATSMAP OF AIRPORTS -+-+-+-+-+
$(document).ready(function() {
	document.querySelectorAll('.seatMaps').forEach(el => {
    let firstSeatLabel = 1;
    let firstSeatLabel2 = 1;  
    var sc = $(`#${el.getAttribute('id')}`).seatCharts({
      map: [
        'aa_aa',
        'aa_aa',
        'bb_bb',
        'bb_bb',
        'bb___',
        'bb_bb',
        'bb_bb',
        'bb_bb',
        'bbbbb'
      ],
      seats: {
        a: {
          classes : 'business' //your custom CSS class
        },
        b: {
          classes : 'economic' //your custom CSS class
        }
      },
      naming: {
        top: false,
        left: false,
        getLabel: function (character, row, column) {
          return firstSeatLabel++;
        },
        getId: function(character, row, column) {
          return firstSeatLabel2++;
        }
      },
      click: function () {
        if (this.status() == 'available') {
          // Ponemos unavailable todos los asientos excepto el escogido
          const id = this.settings.id;
          for (let i = 1; i <=35; i++) {
            if (i != id) {
              sc.get('' + i).status('unavailable');
            }
          }
          // Llenamos el input hidden del asiento seleccionado
          document.querySelector(`#seatNum${flightCode}`).value = id;
          // Habilitamos el botón de Purchase
          document.querySelectorAll('#buttonPurchaseTicket').forEach(ele => {
            ele.disabled = false;
          });
          return 'selected';

        } else if (this.status() == 'selected') {
          // Ponemos todos los asientos available excepto los que ya están vendidos
          document.querySelectorAll('.loaderSeatMap').forEach(ele => {
            ele.style.display = 'block';
          });
          axios.get(`/getEmptySeats/${flightCode}`)
            .then(response => {
              const asientosOcupados = [];
              response.data.forEach(ele => {
                asientosOcupados.push(ele.seatNumber);
              });
              const id = this.settings.id;
              for (let i = 1; i <=35; i++) {
                if (!asientosOcupados.includes('' + i)) {
                  sc.get('' + i).status('available');
                }
              }
              // Vaciamos el input hidden del asiento seleccionado
              document.querySelector(`#seatNum${flightCode}`).value = '';
              document.querySelectorAll('.loaderSeatMap').forEach(ele => {
                ele.style.display = 'none';
              });
              // Habilitamos el botón de Purchase
              document.querySelectorAll('#buttonPurchaseTicket').forEach(ele => {
                ele.disabled = true;
              });
            }).catch(err => console.log(err));
          return 'available';
        } else if (this.status() == 'unavailable') {
          //seat has been already booked
          return 'unavailable';
        } else {
          return this.style();
        }
      }
    });
  
    // Inhabilitar los que ya están comprados
    const id = el.getAttribute('id');
    const flightCode = id.split('seat-map')[1];
    axios.get(`/getEmptySeats/${flightCode}`)
    .then(response => {
      const asientosOcupados = [];
      response.data.forEach(ele => {
        asientosOcupados.push(ele.seatNumber);
      });
      for (let i = 1; i <= 35; i++) {
        if (asientosOcupados.includes('' + i)) {
          sc.get('' + i).status('unavailable');
        }
      }
    }).catch(err => console.log(err));
  });
});






// -+-+-+-+-+ VALIDACIÓN DEL CONFIRM PASSWORD DE REGISTER -+-+-+-+-+
const confirmPassRegister = document.getElementById('confirmpasswordRegister');
const passRegister = document.getElementById('passwordRegister');

if (confirmPassRegister !== null && passRegister !== null) {
  confirmPassRegister.addEventListener('keyup', () => {
    if (passRegister.value === confirmPassRegister.value) {
      confirmPassRegister.setCustomValidity('');
    } else {
      confirmPassRegister.setCustomValidity('Passwords must match');
    }
  });
  
  let cont = 0;
  passRegister.addEventListener('keyup', function() {
    cont = passRegister.value.length;
    console.log(cont);
  
    if (cont >= 6) {
      confirmPassRegister.disabled = false;
    } else {
      confirmPassRegister.disabled = true;
      confirmPassRegister.value = '';
    }
  });
}


