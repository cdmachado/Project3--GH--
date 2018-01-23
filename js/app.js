
const jobMenu = document.getElementById('title');
const jobRole = document.getElementById('other-title');
const designMenu = document.getElementById('design');
const fieldset = document.getElementsByTagName('fieldset')[0];
const colorMenu = document.getElementById('color');
const activities = document.getElementsByTagName('fieldset')[2];
const frameworks = document.getElementsByName('js-frameworks')[0];
const express = document.getElementsByName('express')[0];
const label = express.parentNode;
const label2 = frameworks.parentNode;
const libs = document.getElementsByName('js-libs')[0];
const node = document.getElementsByName('node')[0];
const label3 = node.parentNode;
const label4 = libs.parentNode;
const mainConference = document.getElementsByName('all')[0];
const buildTools = document.getElementsByName('build-tools')[0];
const npm = document.getElementsByName('npm')[0];
let total = 0;
const totalTag = document.createElement('span');
const referenceDiv2 = document.getElementById('reference-div-2');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const paymentMenu = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const ccNum = document.getElementsByName('user_cc-num')[0];
const ccZip = document.getElementsByName('user_zip')[0];
const cvv = document.getElementsByName('user_cvv')[0];
const register = document.getElementsByTagName('button')[0];
const errorName = document.getElementsByClassName('error2')[0];
const name = document.getElementById('name');
const nameLabel = document.getElementsByTagName('label')[0];
const email = document.getElementById('mail');
const emailLabel = document.getElementsByTagName('label')[1];
const errorEmail = document.getElementsByClassName('error2')[1];
const listActivities = activities.getElementsByTagName('input');
const errorActivities = document.getElementsByClassName('error2')[2];
const labelActivities = errorActivities.previousElementSibling;
let noActivities = 0;
const cardLabel = document.getElementsByClassName('col-6')[0].firstElementChild;
const zipLabel = document.getElementsByClassName('col-3')[0].firstElementChild;
const cvvLabel = document.getElementsByClassName('col-3')[1].firstElementChild;
const errorCard = document.getElementsByClassName('error2')[3];


function removeColorOptions() {
  while (colorMenu.options.length) {
    colorMenu.remove(0);
  }
}

function disableOrEnable(activity, lbl, boolean, color) {
  activity.disabled = boolean;
  lbl.style.color = color;
}

function checkedOrNot(checkbox) {
    let state = checkbox.checked;
    return state;
}

function hidePayment(type, type2) {
  let types = [];
  types.push(type, type2);
  for (let i = 0; i < types.length; i++) {
    types[i].style.display = 'none';
  }
}

function showOrHide(type, display) {
  type.style.display = display;
}

function validateEmail(em) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(em);
}

function errorMessage(errorElm, msg) {
  errorElm.textContent = msg;
  errorElm.className = 'error2'
}

function modifyMessage(label, error, element, msg, msg2, color) {
  label.className = msg;
  error.textContent = msg2;
  error.className = color;
  if (element == email) {
    element.setCustomValidity(msg);
  }
  timeout = window.setTimeout(errorMessage, 1500, error, '');
}

function checkLength(num, elm) {
  let value = num.length;
  let target = elm.id;
  if (target == 'cc-num') {
    return value > 12 && value < 17 ? true : false;
  } else if (target == 'zip') {
    return value === 5 ? true : false;
  } else if (target == 'cvv') {
    return value === 3 ? true: false;
  }
}

function validate(evt) {
  let theEvent = evt || window.event;
  let key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  const regex = /[0-9]|\./;
  if(!regex.test(key)) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function chooseActivities(first, second, label, price) {
  if (second == null || label == null) {
    checkedOrNot(first) ? total += price : total -= price;
  } else {
    checkedOrNot(first) ? (disableOrEnable(second, label, true, 'grey'), total += price) : (disableOrEnable(second, label, false, ''), total -= price );
  }
}

function changeStatus(label, error, errorMsg, message, validityElm, event, validityMsg) {
  label.className = errorMsg;
  if (error !== null) {
    error.textContent = message;
  }
  if (validityElm !== null) {
    validityElm.setCustomValidity(validityMsg);
  }
  if (event !== null) {
    event.preventDefault();
  }
}


// Job Role Section
showOrHide(jobRole, 'none');
jobMenu.addEventListener('change', () => {
  const optionIndex = jobMenu.options.selectedIndex;
  if (optionIndex === 5) {
    showOrHide(jobRole, 'block');
  } else if (optionIndex !== 5) {
    showOrHide(jobRole, 'none');
  }
});

// T-Shirt Section
const punsArray = [];
for (let i = 0; i < 3; i++) {
  punsArray.push(colorMenu.options[i].text);
}
const heartArray = [];
for (let i = 3; i < 6; i++) {
  heartArray.push(colorMenu.options[i].text);
}
const tShirts = {};
tShirts['js puns'] = punsArray;
tShirts['heart js'] = heartArray;

const divColors = document.getElementById('colors-js-puns');
showOrHide(divColors, 'none');

designMenu.addEventListener('change', () => {
  let index = designMenu.options.selectedIndex;
  if (index !== 0) {
    removeColorOptions();
    showOrHide(divColors, 'block');
    let optionValue = designMenu.options[designMenu.selectedIndex].value;
    let displayShirts = tShirts[optionValue];
    for (let i = 0; i < displayShirts.length; i++) {
      let shirt = document.createElement('option');
      shirt.textContent = displayShirts[i];
      colorMenu.options.add(shirt, i);
    }
  } else {
    showOrHide(divColors, 'none');
  }
});

// Addition of the TOTAL tag
activities.insertBefore(totalTag, referenceDiv2);
if (total === 0) {
  showOrHide(totalTag, 'none');
}


// Activity Registration
activities.addEventListener('change', (e) => {
  if (e.target == frameworks) {
    chooseActivities(frameworks, express, label, 100);
  } else if (e.target == express) {
    chooseActivities(express, frameworks, label2, 100);
  } else if (e.target == libs) {
    chooseActivities(libs, node, label3, 100);
  } else if (e.target == node) {
    chooseActivities(node, libs, label4, 100);
  } else if (e.target == buildTools) {
    chooseActivities(buildTools, null, null, 100);
  } else if (e.target == npm) {
    chooseActivities(npm, null, null, 100);
  } else if (e.target == mainConference) {
    chooseActivities(mainConference, null, null, 200);
  }
  if (total === 0) {
    showOrHide(totalTag, 'none');
  } else {
    showOrHide(totalTag, 'block');
    totalTag.textContent = 'Total: ' + total;
  }
});


// Hides the other payment options and leave the
// credit card option by default
showOrHide(paypal, 'none');
showOrHide(bitcoin, 'none');
paymentMenu.options.remove(0);


// Payment Info
paymentMenu.addEventListener('change', () => {
  let payChoice = paymentMenu.options.selectedIndex;
  if (payChoice == 1) {
    hidePayment(creditCard, bitcoin);
    showOrHide(paypal, 'block');
  } else if (payChoice == 2) {
    hidePayment(creditCard, paypal);
    showOrHide(bitcoin, 'block');
  } else {
    hidePayment(paypal, bitcoin);
    showOrHide(creditCard, 'block');
  }
});


// Name and email validation
fieldset.addEventListener('input', (e) => {
  let target = e.srcElement.id;
  let userEmail = email.value;
  let userName = name.value;
  if (target == 'name') {
    if (userName !== '') {
      changeStatus(nameLabel, errorName, '', '', name, null, '');
    }
  } else if (target == 'mail') {
    if (validateEmail(userEmail) == false) {
      errorMessage(errorEmail, "Are you sure that's an email?");
    } else if (validateEmail(userEmail)) {
      modifyMessage(emailLabel, errorEmail, email, '', 'Now we are talking!', 'error3')
    }
  }
});


// Activities validation
activities.addEventListener('click', (e) => {
  if (e.target.tagName == 'INPUT') {
    if (e.target.checked && labelActivities.className == 'error') {
      modifyMessage(labelActivities, errorActivities, listActivities, '', 'Attaboy!', 'error3')
    }
  }
});


// Credit Card validation
creditCard.addEventListener('input', (e) => {
  let userCard = ccNum.value;
  let userZip = ccZip.value;
  let userCvv = cvv.value;
  let target = e.srcElement.id;
  if (target == 'cc-num') {
    if (checkLength(userCard, ccNum)) {
      changeStatus(cardLabel, errorCard, '', '', ccNum, null, '');
    }
  }
  if (target == 'zip') {
    if (checkLength(userZip, ccZip)) {
      changeStatus(zipLabel, null, '', null, ccZip, null, '');
    }
  }
  if (target == 'cvv') {
    if (checkLength(userCvv, cvv)) {
      changeStatus(cvvLabel, null, '', null, cvv, null, '');
    }
  }
});



// Submit Handler
register.addEventListener('click', (e) => {
    let userCard = ccNum.value;
    let userZip = ccZip.value;
    let userCvv = cvv.value;
    let userEmail = email.value;
    let noBlanks = /\s/.test(name.value);
    if (name.value == '' || noBlanks) {
      changeStatus(nameLabel, errorName, 'error', 'Dude...come on! Write a name', name, event, false);
    }
    if (email.value == '') {
      changeStatus(emailLabel, errorEmail, 'error', "Don't forget about the email", email, event, false);
    }
    if (!validateEmail(userEmail)) {
      e.preventDefault();
    }
    for (let i = 0; i < listActivities.length; i++) {
      let act = listActivities[i];
      if (act.checked) {
          noActivities += 1;
      }
    }
    if (noActivities == 0) {
      changeStatus(labelActivities, errorActivities, 'error', "They all look so intereting, don'they? Pick one", null, event)
    }
    let userPayment = paymentMenu.options.selectedIndex;
    if (userPayment == 0) {
      if (userCard == '' || !checkLength(userCard, ccNum)) {
        if (userCard == '') {
          errorMessage(errorCard, 'Please enter a credit card number');
        } else if (!checkLength(userCard, ccNum)) {
          errorMessage(errorCard, 'Please enter a number that is between 13 and 16 digits long');
        }
        changeStatus(cardLabel, null, 'error', null, ccNum, event, false);
      }
      if (userZip == '' || !checkLength(userZip, ccZip)) {
        changeStatus(zipLabel, null, 'error', null, ccZip, event, false);
      }
      if (userCvv == '' || !checkLength(userCvv, cvv)) {
        changeStatus(cvvLabel, null, 'error', null, cvv, event, false);
      }
    }
});
