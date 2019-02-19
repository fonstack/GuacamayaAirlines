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
// http.open("GET", '/getCustomers', true);
// http.onload = function() {
//   if(http.status === 200) {
//     ds();
//     function ds() {
//       var elems = document.querySelectorAll('.autocomplete');
//       const array = JSON.parse(http.responseText).reduce((acc, cur) => ({...acc, [cur.identityCard]: `https://randomuser.me/api/portraits/${cur.gender === 'Male' ? 'men' : 'women'}/${Math.floor((Math.random() * 100))}.jpg`}), {});
//       console.log(JSON.parse(http.responseText));
//       var instances = M.Autocomplete.init(elems, {
//         data: array,
//         onAutocomplete: disabledOtherInputs,
//         limit: 4
//       });
//     };

//   } else {
//     console.log("Error: " + http.status);
//   }
// }
// http.send();

axios.get('/getCustomers')
  .then(response => {
    const elems = document.querySelectorAll('.autocomplete');
    const array = response.data.reduce((acc, cur) => ({...acc, [cur.identityCard]: `https://randomuser.me/api/portraits/${cur.gender === 'Male' ? 'men' : 'women'}/${Math.floor((Math.random() * 100))}.jpg`}), {});
    const instances = M.Autocomplete.init(elems, {
      data: array,
      onAutocomplete: disabledOtherInputs,
      limit: 4
    });
  }).catch(err => console.log(err));

const identityC = document.querySelector('#identityCardPur');
const firstName = document.querySelector('#firstNamePur');
const lastName = document.querySelector('#lastNamePur');
const age = document.querySelector('#agePur');
const nationality = document.querySelector('#nationalityPur');
const gender = document.querySelector('#genderPur');
const email = document.querySelector('#emailPur');

function disabledOtherInputs() {
  axios.get(`/getCustomer/${identityC.value}`)
  .then(response => {
    const customerData = response.data[0];
    console.log(customerData);
    // Llenamos los campos
    identityC.disabled = true;
    firstName.value = customerData.firstName;
    firstName.disabled = true;
    lastName.value = customerData.lastName;
    lastName.disabled = true;
    age.value = customerData.age;
    age.disabled = true;
    email.value = customerData.email;
    email.disabled = true;
    setSelectBoxByText('nationalityPur', customerData.nationality);
    nationality.disabled = true;
    setSelectBoxByText('genderPur', customerData.gender);
    gender.disabled = true;

    document.querySelectorAll('#fre').forEach(entry => {
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

document.querySelector('#cleanButton').addEventListener('click', (e) => {
  identityC.value = '';
  identityC.disabled = false;
  firstName.value = '';
  firstName.disabled = false;
  lastName.value = '';
  lastName.disabled = false;
  age.value = '';
  age.disabled = false;
  email.value = '';
  email.disabled = false;
  nationality.selectedIndex = 0;
  nationality.disabled = false;
  gender.selectedIndex = 0;
  gender.disabled = false;

  document.querySelectorAll('#fre').forEach(entry => {
    entry.classList.remove('active');
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


