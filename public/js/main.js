import "../sass/styles.scss";
const http = new XMLHttpRequest();
const axios = require('axios');

// Initialization Materialize Components

// Datepicker Home
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

// Selects Home
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.select-home');
  var instances = M.FormSelect.init(elems, {
    
  });
});

// Tooltips
$(document).ready(function() {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-punk',
    contentAsHTML: true,
    animation: 'swing',
    delay: 100,
    interactive: true
  });
});

// Sidenav
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {

  });
});

const botonSidenav = document.querySelector('.openButton');

if (botonSidenav) {
  botonSidenav.addEventListener('click', function() {
    const instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
      instance.open();
  });
}

// Collapsible
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {
    
  });
});

// Modals
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    
  });
});

// Autocomplete
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

function disabledOtherInputsBuyer() {
  axios.get(`/getCustomer/${identityC.value}`)
  .then(response => {
    const customerData = response.data[0];
    // Llenamos los campos
    identityC.readOnly = true;
    identityC.classList.add('disabledPirata');
    firstName.value = customerData.firstName;
    firstName.readOnly = true;
    firstName.classList.add('disabledPirata');
    lastName.value = customerData.lastName;
    lastName.readOnly = true;
    lastName.classList.add('disabledPirata');
    age.value = customerData.age;
    age.readOnly = true;
    age.classList.add('disabledPirata');
    email.value = customerData.email;
    email.readOnly = true;
    email.classList.add('disabledPirata');
    setSelectBoxByText('nationalityPur', customerData.nationality);
    nationality.readOnly = true;
    nationality.classList.add('disabledPirata');
    setSelectBoxByText('genderPur', customerData.gender);
    gender.readOnly = true;
    gender.classList.add('disabledPirata');

    document.querySelectorAll('#fre').forEach(entry => {
      entry.classList.add('active');
    });
  }).catch(err => console.log(err));
}

function disabledOtherInputsPass() {
  axios.get(`/getCustomer/${identityCPass.value}`)
  .then(response => {
    const customerData = response.data[0];
    // Llenamos los campos
    identityCPass.readOnly = true;
    identityCPass.classList.add('disabledPirata');
    firstNamePass.value = customerData.firstName;
    firstNamePass.readOnly = true;
    firstNamePass.classList.add('disabledPirata');
    lastNamePass.value = customerData.lastName;
    lastNamePass.readOnly = true;
    lastNamePass.classList.add('disabledPirata');
    agePass.value = customerData.age;
    agePass.readOnly = true;
    agePass.classList.add('disabledPirata');
    emailPass.value = customerData.email;
    emailPass.readOnly = true;
    emailPass.classList.add('disabledPirata');
    setSelectBoxByText('nationalityPurPass', customerData.nationality);
    nationalityPass.readOnly = true;
    nationalityPass.classList.add('disabledPirata');
    setSelectBoxByText('genderPurPass', customerData.gender);
    genderPass.readOnly = true;
    genderPass.classList.add('disabledPirata');

    document.querySelectorAll('#frex').forEach(entry => {
      entry.classList.add('active');
    });
  }).catch(err => console.log(err));
}

function setSelectBoxByText(eid, etxt) {
  let eidd = document.getElementById(eid);
  for (let i = 0; i < eidd.options.length; ++i) {
      if (eidd.options[i].text === etxt)
        eidd.options[i].selected = true;
  }
}

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

const checkBuyerPassenger = document.querySelector('#buyerIsPassenger');
const passengerInformation = document.querySelector('.passengerInformation');
const frontSide = document.querySelector('.frontSide');
const backSide = document.querySelector('.backSide');
const modalFooter = document.querySelector('.modal-footer');
checkBuyerPassenger.addEventListener('click', () => {
  if (checkBuyerPassenger.checked == true) {
    passengerInformation.style.display = 'none';
    frontSide.style.height = '40rem';
    backSide.style.height = '40rem';
    modalFooter.style.marginTop = '5rem';

    identityCPass.disabled = true;
    firstNamePass.disabled = true;
    lastNamePass.disabled = true;
    agePass.disabled = true;
    nationalityPass.disabled = true;
    genderPass.disabled = true;
    emailPass.disabled = true;
  } else {
    passengerInformation.style.display = 'block';
    frontSide.style.height = '52rem';
    backSide.style.height = '52rem';
    modalFooter.style.marginTop = '0';

    identityCPass.disabled = false;
    firstNamePass.disabled = false;
    lastNamePass.disabled = false;
    agePass.disabled = false;
    nationalityPass.disabled = false;
    genderPass.disabled = false;
    emailPass.disabled = false;
  }
})

// Selects Seats
const selectsSeats = document.querySelectorAll('.selectSeats');

selectsSeats.forEach(element => {
  const id = element.getAttribute('id');
  const flightCode = id.split('selectSeat')[1];

  axios.get(`/getEmptySeats/${flightCode}`)
  .then(response => {

    const asientosOcupados = [];
    response.data.forEach(ele => {
      asientosOcupados.push(ele.seatNumber);
    });

    for (let i = 0; i < 38; i++) {
      if (!asientosOcupados.includes('' + (i + 1))) {
        const opt = document.createElement('option');
        opt.value = i + 1;
        opt.innerHTML = i + 1;
        element.appendChild(opt);
      }
    }
  }).catch(err => console.log(err));




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


