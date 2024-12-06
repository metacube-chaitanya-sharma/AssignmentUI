var nextStep = function (nextFieldId, inputId) {
    var currentField = document.querySelector('.field.active');
    var nextField = document.getElementById(nextFieldId);
    if (!currentField || !nextField)
        return;
    if (!isFieldValid(currentField)) {
        var input = currentField.querySelector('input');
        if (input)
            input.classList.add('myClass');
        return;
    }
    if (inputId === 'name') {
        var nameDisplay = document.getElementById('nameDisplay');
        var inputElement = document.getElementById(inputId);
        if (nameDisplay && inputElement) {
            nameDisplay.innerText = inputElement.value;
        }
    }
    currentField.classList.remove('active');
    nextField.classList.add('active');
};
var nextStep1 = function (nextFieldId, inputId) {
    var currentField = document.getElementById(inputId);
    var nextField = document.getElementById(nextFieldId);
    if (!isFieldValid(currentField)) {
        currentField.querySelector('input').classList.add('myClass');
        return;
    }
    currentField.classList.remove('active');
    nextField.classList.add('active');
};
var checkPasswordStrength = function () {
    var _a;
    var password = ((_a = document.getElementById('password')) === null || _a === void 0 ? void 0 : _a.value) || '';
    var strength = document.getElementById('passwordStrength');
    var passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strength) {
        strength.style.width = '100%';
        strength.style.backgroundColor = passwordStrength.test(password) ? 'green' : 'red';
    }
};
var showInfo = function (event) {
    var _a, _b, _c, _d;
    event.preventDefault();
    var name = ((_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value) || '';
    var gender = ((_b = document.getElementById('gender')) === null || _b === void 0 ? void 0 : _b.value) || '';
    var email = ((_c = document.getElementById('email')) === null || _c === void 0 ? void 0 : _c.value) || '';
    var phone = ((_d = document.getElementById('phone')) === null || _d === void 0 ? void 0 : _d.value) || '';
    if (!validatePhone(phone)) {
        var phoneInput = document.getElementById('phone');
        if (phoneInput)
            phoneInput.classList.add('myClass');
        return;
    }
    if (!name || !gender || !email || !phone) {
        alert('Enter valid input');
        return;
    }
    var employeeInfo = "\n    Name: ".concat(name, "\n    Gender: ").concat(gender, "\n    Email: ").concat(email, "\n    Phone: ").concat(phone, "\n    RegistrationId: ").concat(Math.random(), "\n    ");
    alert("Employee Information:\n".concat(employeeInfo));
    location.reload();
};
var showPricing = function () {
    var _a;
    var type = ((_a = document.getElementById('vehicleType')) === null || _a === void 0 ? void 0 : _a.value) || '';
    var pricing = {
        Cycle: { daily: '$5', monthly: '$100', yearly: '$500' },
        MotorCycle: { daily: '$10', monthly: '$200', yearly: '$1000' },
        FourWheeler: { daily: '$20', monthly: '$500', yearly: '$3500' },
    };
    return pricing[type] || { daily: '', monthly: '', yearly: '' };
};
var modal = document.getElementById('currencyModal');
var openModalBtn = document.getElementById('openModalBtn');
var openModalBtn2 = document.getElementById('openModalBtn2');
var openModalBtn3 = document.getElementById('openModalBtn3');
var closeModalBtn = document.getElementById('closeModalBtn');
var currencySelect = document.getElementById('currencySelect');
openModalBtn.addEventListener('click', function () { return modal.style.display = 'block'; });
openModalBtn2.addEventListener('click', function () { return modal.style.display = 'block'; });
openModalBtn3.addEventListener('click', function () { return modal.style.display = 'block'; });
closeModalBtn.addEventListener('click', function () { return modal.style.display = 'none'; });
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
var calculateAmount = function (event) {
    event.preventDefault();
    var currency = document.getElementById('currencySelect');
    var vehicleType = document.getElementById('vehiclePriceSelect');
    var conversionRate;
    switch (currency.value) {
        case 'INR':
            conversionRate = {
                Cycle: { daily: 5 / 82.5, monthly: 100 / 82.5, yearly: 500 / 82.5 },
                MotorCycle: { daily: 10 / 82.5, monthly: 200 / 82.5, yearly: 1000 / 82.5 },
                FourWheeler: { daily: 20 / 82.5, monthly: 500 / 82.5, yearly: 3500 / 82.5 },
            };
            break;
        case 'USD':
            conversionRate = {
                Cycle: { daily: 5, monthly: 100, yearly: 500 },
                MotorCycle: { daily: 10, monthly: 200, yearly: 1000 },
                FourWheeler: { daily: 20, monthly: 500, yearly: 3500 },
            };
            break;
        case 'YEN':
            conversionRate = {
                Cycle: { daily: 5 / 150, monthly: 100 / 150, yearly: 500 / 150 },
                MotorCycle: { daily: 10 / 150, monthly: 200 / 150, yearly: 1000 / 150 },
                FourWheeler: { daily: 20 / 150, monthly: 500 / 150, yearly: 3500 / 150 },
            };
            break;
    }
    if (conversionRate) {
        var rates = conversionRate[vehicleType.value];
        alert("\n        Currency Selected: ".concat(currency.value, "\n        Vehicle: ").concat(vehicleType.value, "\n        Daily: ").concat(rates.daily, "\n        Monthly: ").concat(rates.monthly, "\n        Yearly: ").concat(rates.yearly, "\n        "));
    }
    location.reload();
};
var isFieldValid = function (field) {
    var inputElement = field.querySelector('input, select, textarea');
    if (!inputElement)
        return false;
    if (inputElement.required && inputElement.value.trim().length < 3 && !validateName(inputElement.value)) {
        console.log("1");
        return false;
    }
    if (inputElement.type === 'email' && !validateEmail(inputElement.value)) {
        return false;
    }
    if (inputElement.type === 'tel' && !validatePhone(inputElement.value)) {
        return false;
    }
    if (inputElement.type === 'password' && !validatePassword(inputElement.value)) {
        return false;
    }
    return true;
};
var validateName = function (name) { return /^[a-zA-Z\s'-]+$/.test(name); };
var validateEmail = function (email) { return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); };
var validatePhone = function (phone) { return /^[0-9]{10}$/.test(phone); };
var addcolour = function () {
    var currentField = document.querySelector('.field.active');
    var inputElement = currentField.querySelector('input');
    inputElement.classList.remove('myclass');
};
var validatePassword = function (password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
