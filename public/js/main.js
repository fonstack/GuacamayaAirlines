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

const identityC = document.querySelector('#identityCardPur');
const firstName = document.querySelector('#firstNamePur');
const lastName = document.querySelector('#lastNamePur');
const age = document.querySelector('#agePur');
const nationality = document.querySelector('#nationalityPur');
const gender = document.querySelector('#genderPur');
const email = document.querySelector('#emailPur');

const identityCPass = document.querySelector('#identityCardPurPass');
const firstNamePass = document.querySelector('#firstNamePurPass');
const lastNamePass = document.querySelector('#lastNamePurPass');
const agePass = document.querySelector('#agePurPass');
const nationalityPass = document.querySelector('#nationalityPurPass');
const genderPass = document.querySelector('#genderPurPass');
const emailPass = document.querySelector('#emailPurPass');

// Función que se ejecuta cuando se autocompleta el campo de Buyer
function disabledOtherInputsBuyer() {
  // Pedimos la data del Customer que se autocompletó al servidor
  axios.get(`/getCustomer/${identityC.value}`)
  .then(response => {
    const customerData = response.data[0];
    // Llenamos los campos con la data del Customer y deshabilitamos los campos
    identityC.readOnly = true; identityC.classList.add('disabledPirata');
    firstName.value = customerData.firstName; firstName.readOnly = true; firstName.classList.add('disabledPirata');
    lastName.value = customerData.lastName; lastName.readOnly = true; lastName.classList.add('disabledPirata');
    age.value = customerData.age; age.readOnly = true; age.classList.add('disabledPirata');
    email.value = customerData.email; email.readOnly = true; email.classList.add('disabledPirata');
    setSelectBoxByText('nationalityPur', customerData.nationality); nationality.readOnly = true; nationality.classList.add('disabledPirata');
    setSelectBoxByText('genderPur', customerData.gender); gender.readOnly = true; gender.classList.add('disabledPirata');
    // Se le agrega la clase active a los labels de los inputs para quitar bug visual
    document.querySelectorAll('#fre').forEach(entry => {
      entry.classList.add('active');
    });
  }).catch(err => console.log(err));
}

// Función que se ejecuta cuando se autocompleta el campo de Passenger
function disabledOtherInputsPass() {
  // Pedimos la data del Customer que se autocompletó al servidor
  axios.get(`/getCustomer/${identityCPass.value}`)
  .then(response => {
    const customerData = response.data[0];
    // Llenamos los campos con la data del Customer y deshabilitamos los campos
    identityCPass.readOnly = true; identityCPass.classList.add('disabledPirata');
    firstNamePass.value = customerData.firstName; firstNamePass.readOnly = true; firstNamePass.classList.add('disabledPirata');
    lastNamePass.value = customerData.lastName; lastNamePass.readOnly = true; lastNamePass.classList.add('disabledPirata');
    agePass.value = customerData.age; agePass.readOnly = true; agePass.classList.add('disabledPirata');
    emailPass.value = customerData.email; emailPass.readOnly = true; emailPass.classList.add('disabledPirata');
    setSelectBoxByText('nationalityPurPass', customerData.nationality); nationalityPass.readOnly = true; nationalityPass.classList.add('disabledPirata');
    setSelectBoxByText('genderPurPass', customerData.gender); genderPass.readOnly = true; genderPass.classList.add('disabledPirata');
    // Se le agrega la clase active a los labels de los inputs para quitar bug visual
    document.querySelectorAll('#frex').forEach(entry => {
      entry.classList.add('active');
    });
  }).catch(err => console.log(err));
}

// Función para seleccionar una opción en un select
function setSelectBoxByText(eid, optionText) {
  let select = document.getElementById(eid);
  for (let i = 0; i < select.options.length; ++i) {
    if (select.options[i].text === optionText) {
      select.options[i].selected = true;
    }
  }
}

// Limpiar los campos con el botón de Clean
if (document.querySelector('#cleanButton')) {
  document.querySelector('#cleanButton').addEventListener('click', (e) => {
    identityC.value = '';
    identityC.readOnly = false;
    identityC.classList.remove('disabledPirata');
    firstName.value = '';
    firstName.readOnly = false;
    firstName.classList.remove('disabledPirata');
    lastName.value = '';
    lastName.readOnly = false;
    lastName.classList.remove('disabledPirata');
    age.value = '';
    age.readOnly = false;
    age.classList.remove('disabledPirata');
    email.value = '';
    email.readOnly = false;
    email.classList.remove('disabledPirata');
    nationality.selectedIndex = 0;
    nationality.readOnly = false;
    nationality.classList.remove('disabledPirata');
    gender.selectedIndex = 0;
    gender.readOnly = false;
    gender.classList.remove('disabledPirata');
  
    document.querySelectorAll('#fre').forEach(entry => {
      entry.classList.remove('active');
    });  
  });
}

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
      identityCPass.disabled = true;
      firstNamePass.disabled = true;
      lastNamePass.disabled = true;
      agePass.disabled = true;
      nationalityPass.disabled = true;
      genderPass.disabled = true;
      emailPass.disabled = true;
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
  
      // Habilitamos los campos del passenger para que no se envíen al servidor
      identityCPass.disabled = false;
      firstNamePass.disabled = false;
      lastNamePass.disabled = false;
      agePass.disabled = false;
      nationalityPass.disabled = false;
      genderPass.disabled = false;
      emailPass.disabled = false;
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
          const id = this.settings.id;
          for (let i = 1; i <=35; i++) {
            if (i != id) {
              sc.get('' + i).status('unavailable');
            }
          }
          document.querySelector(`#seatNum${flightCode}`).value = id;
          return 'selected';
        } else if (this.status() == 'selected') {
          document.querySelector('.loaderSeatMap').style.display = 'block';
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
              document.querySelector(`#seatNum${flightCode}`).value = '';
              document.querySelector('.loaderSeatMap').style.display = 'none';
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






// Validation of the confirm password on Register
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


