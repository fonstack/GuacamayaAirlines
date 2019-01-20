import "../sass/styles.scss";

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


