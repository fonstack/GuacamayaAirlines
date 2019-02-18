/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ "./public/sass/styles.scss");
/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var http = new XMLHttpRequest(); // Initialization Materialize Components
// Datepicker Home

document.addEventListener('DOMContentLoaded', function () {
  var minDate = new Date();
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 365);
  var elems = document.querySelector('.datepickerHome');
  var cont = document.querySelector('.home');
  var instances = M.Datepicker.init(elems, {
    autoClose: true,
    container: cont,
    format: 'dd/mm/yyyy',
    firstDay: 1,
    minDate: minDate,
    maxDate: maxDate
  });
}); // Selects Home

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.select-home');
  var instances = M.FormSelect.init(elems, {});
}); // Tooltips

$(document).ready(function () {
  $('.tooltip').tooltipster({
    theme: 'tooltipster-punk',
    contentAsHTML: true,
    animation: 'swing',
    delay: 100,
    interactive: true
  });
}); // Sidenav

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});
var botonSidenav = document.querySelector('.openButton');

if (botonSidenav) {
  botonSidenav.addEventListener('click', function () {
    var instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    instance.open();
  });
} // Collapsible


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {});
}); // Modals

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
}); // Autocomplete

http.open("GET", '/getCustomers', true);

http.onload = function () {
  if (http.status === 200) {
    var ds = function ds() {
      var elems = document.querySelectorAll('.autocomplete');
      var array = JSON.parse(http.responseText).reduce(function (acc, cur) {
        return _objectSpread({}, acc, _defineProperty({}, cur.identityCard, "https://randomuser.me/api/portraits/".concat(cur.gender === 'Male' ? 'men' : 'women', "/").concat(Math.floor(Math.random() * 100), ".jpg")));
      }, {});
      var instances = M.Autocomplete.init(elems, {
        data: array,
        onAutocomplete: disabledOtherInputs,
        limit: 4
      });
    };

    ds();
    ;
  } else {
    console.log("Error: " + http.status);
  }
};

http.send();
var identityC = document.querySelector('#identityCardPur');
var firstName = document.querySelector('#firstNamePur');
var lastName = document.querySelector('#lastNamePur');
var age = document.querySelector('#agePur');
var nationality = document.querySelector('#nationalityPur');
var gender = document.querySelector('#genderPur');
var email = document.querySelector('#emailPur');

function disabledOtherInputs() {
  http.open("GET", "/getCustomer/".concat(identityC.value), true);

  http.onload = function () {
    if (http.status === 200) {
      var customerData = JSON.parse(http.responseText)[0]; // Llenamos los campos

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
      document.querySelectorAll('#fre').forEach(function (entry) {
        entry.classList.add('active');
      });
    } else {
      console.log("Error: " + http.status);
    }
  };

  http.send();
}

function setSelectBoxByText(eid, etxt) {
  var eid = document.getElementById(eid);

  for (var i = 0; i < eid.options.length; ++i) {
    if (eid.options[i].text === etxt) eid.options[i].selected = true;
  }
}

document.querySelector('#cleanButton').addEventListener('click', function (e) {
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
  document.querySelectorAll('#fre').forEach(function (entry) {
    entry.classList.remove('active');
  });
}); // Validation of the confirm password on Register

var confirmPassRegister = document.getElementById('confirmpasswordRegister');
var passRegister = document.getElementById('passwordRegister');

if (confirmPassRegister !== null && passRegister !== null) {
  confirmPassRegister.addEventListener('keyup', function () {
    if (passRegister.value === confirmPassRegister.value) {
      confirmPassRegister.setCustomValidity('');
    } else {
      confirmPassRegister.setCustomValidity('Passwords must match');
    }
  });
  var cont = 0;
  passRegister.addEventListener('keyup', function () {
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

/***/ }),

/***/ "./public/sass/styles.scss":
/*!*********************************!*\
  !*** ./public/sass/styles.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map