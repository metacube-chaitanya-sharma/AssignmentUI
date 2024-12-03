// JS for collapsing.
const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach((collapsible) => {
    const header = collapsible.querySelector('.collapsible-header');
    const content = collapsible.querySelector('.collapsible-content');

    header.addEventListener('click', () => {
        collapsible.classList.toggle('collapsed');

        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });
});

// JS for employee dynamic form.
let employeeData = {};

document.addEventListener('DOMContentLoaded', () => {
    const dynamicForm = document.getElementById('emp-dynamic-form');
    const registrationId = document.getElementById('emp-registration-id');
    const regIdSpan = document.getElementById('emp-reg-id');
    let currentStep = 0;

    const steps = [
        { type: 'text', label: 'Enter Name:', id: 'employee-full-name' },
        { type: 'radio', label: '{name}, tell us your gender.', id: 'employee-gender', options: ['Male', 'Female', 'Other'] },
        { type: 'email', label: '{name}, tell us your email.', id: 'employee-email' },
        { type: 'password', label: '{name}, tell us your password.', id: 'employee-password' },
        { type: 'password', label: '{name}, please confirm your password.', id: 'employee-confirm-password' },
        { type: 'tel', label: '{name}, give your mobile number.', id: 'employee-contact-number', pattern: '[0-9]{10}' }
    ];

    function updateForm(step) {
        dynamicForm.innerHTML = '';
        const label = document.createElement('label');
        label.textContent = step.label.replace('{name}', employeeData.fullName || '');
        dynamicForm.appendChild(label);

        if (step.type === 'radio') {
            step.options.forEach(option => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = step.id;
                radio.value = option.toLowerCase();
                radio.id = option.toLowerCase();
                dynamicForm.appendChild(radio);

                const radioLabel = document.createElement('label');
                radioLabel.textContent = option;
                radioLabel.htmlFor = option.toLowerCase();
                dynamicForm.appendChild(radioLabel);
            });
        } else {
            const input = document.createElement('input');
            input.type = step.type;
            input.id = step.id;
            input.name = step.id;
            if (step.pattern) input.pattern = step.pattern;
            input.required = true;
            dynamicForm.appendChild(input);

            if (step.type === 'password') {
                input.addEventListener('input', () => {
                    const strength = getPasswordStrength(input.value);
                    input.className = strength;
                });
            }

            input.addEventListener('blur', () => {
                let errorMessage = '';
                if (step.id === 'employee-full-name') {
                    if (input.value.length < 2 || /\d/.test(input.value)) {
                        errorMessage = 'Full Name must be at least 2 characters long and should not be numeric.';
                    }
                } else if (step.id === 'employee-email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        errorMessage = 'Please enter a valid email address.';
                    }
                } else if (step.id === 'employee-password') {
                    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                    if (!strongRegex.test(input.value)) {
                        errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.';
                    }
                } else if (step.id === 'employee-confirm-password') {
                    if (input.value !== employeeData['employee-password']) {
                        errorMessage = 'Passwords do not match.';
                    }
                } else if (step.id === 'employee-contact-number') {
                    if (input.value.length !== 10 || !/^\d+$/.test(input.value)) {
                        errorMessage = 'Contact Number must be 10 digits long and contain only numbers.';
                    }
                }

                const errorElement = document.getElementById(`${step.id}-error`);
                if (errorMessage) {
                    if (!errorElement) {
                        const errorDiv = document.createElement('div');
                        errorDiv.id = `${step.id}-error`;
                        errorDiv.style.color = 'red';
                        errorDiv.textContent = errorMessage;
                        dynamicForm.appendChild(errorDiv);
                    } else {
                        errorElement.textContent = errorMessage;
                    }
                } else {
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            });
        }

        const br = document.createElement('br');
        dynamicForm.appendChild(br);

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.id = 'next-button';
        nextButton.textContent = 'Next';
        dynamicForm.appendChild(nextButton);

        nextButton.addEventListener('click', handleNext);
    }

    function getPasswordStrength(password) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const normalRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})");
        if (strongRegex.test(password)) return 'strong';
        if (normalRegex.test(password)) return 'normal';
        return 'weak';
    }

    function handleNext() {
        let isValid = true;
        const input = dynamicForm.querySelector('input');
        if (input) {
            employeeData[steps[currentStep].id] = input.value;
            if (steps[currentStep].id === 'employee-full-name') {
                employeeData.fullName = input.value;
            }

            if (steps[currentStep].id === 'employee-full-name') {
                if (input.value.length < 2 || /\d/.test(input.value)) {
                    isValid = false;
                    displayError('employee-full-name', 'Full Name must be at least 2 characters long and should not be numeric.');
                }
            } else if (steps[currentStep].id === 'employee-email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    displayError('employee-email', 'Please enter a valid email address.');
                }

                if (input.value.length > 100 || input.value.length < 10) {
                    isValid = false;
                    displayError('employee-email', 'Please enter a valid email address.');
                }
            } else if (steps[currentStep].id === 'employee-password') {
                const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                if (!strongRegex.test(input.value)) {
                    isValid = false;
                    displayError('employee-password', 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
                }
            } else if (steps[currentStep].id === 'employee-confirm-password') {
                if (input.value !== employeeData['employee-password']) {
                    isValid = false;
                    displayError('employee-confirm-password', 'Passwords do not match.');
                }
            } else if (steps[currentStep].id === 'employee-contact-number') {
                if (input.value.length !== 10 || !/^\d+$/.test(input.value)) {
                    isValid = false;
                    displayError('employee-contact-number', 'Contact Number must be 10 digits long and contain only numbers.');
                }
            } else if (steps[currentStep].type === 'radio') {
                const selectedGender = document.querySelector(`input[name="${steps[currentStep].id}"]:checked`);
                if (!selectedGender) {
                    isValid = false;
                    displayError('employee-gender', 'Please select your gender.');
                } else {
                    employeeData[steps[currentStep].id] = selectedGender.value;
                }
            }
        }


        if (isValid) {
            if (currentStep === steps.length - 1) {
                const regId = 'EMP' + Math.floor(1000 + Math.random() * 9000);
                regIdSpan.textContent = regId;
                registrationId.style.display = 'block';
                dynamicForm.style.display = 'none';
                updateSectionDisplay('employee-section', 'vehicle-section');
            } else {
                currentStep++;
                if (steps[currentStep].label.includes('{name}')) {
                    steps[currentStep].label = steps[currentStep].label.replace('{name}', employeeData.fullName || 'User');
                }
                updateForm(steps[currentStep]);
            }
        }
    }

    function displayError(id, message) {
        const errorElement = document.getElementById(`${id}-error`);
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.id = `${id}-error`;
            errorDiv.style.color = 'red';
            errorDiv.textContent = message;
            dynamicForm.appendChild(errorDiv);
        } else {
            errorElement.textContent = message;
        }
    }

    updateForm(steps[currentStep]);
});

// JS for vehicle dynamic form.
let vehicleData = {};

document.addEventListener('DOMContentLoaded', () => {
    const dynamicForm = document.getElementById('vehicle-dynamic-form');
    const registrationId = document.getElementById('vehicle-registration-id');
    const regIdSpan = document.getElementById('vehicle-reg-id');
    let currentStep = 0;

    const steps = [
        { type: 'text', label: 'Enter vehicle brand:', id: 'vehicle-brand' },
        { type: 'text', label: 'What is the vehicle model?', id: 'vehicle-model' },
        { type: 'select', label: 'Select the Vehicle Type:', id: 'vehicle-type', options: ['Car', 'Cycle', 'Bike', 'Other'] },
        { type: 'text', label: 'Enter the Vehicle Number:', id: 'vehicle-number', pattern: '[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}' },
    ];

    function updateForm(step) {
        dynamicForm.innerHTML = '';
        const label = document.createElement('label');
        label.textContent = step.label.replace('{make}', vehicleData.vehicleMake || '');
        dynamicForm.appendChild(label);

        if (step.type === 'select') {
            const select = document.createElement('select');
            select.id = step.id;
            select.name = step.id;
            select.required = true;
            step.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.toLowerCase();
                opt.textContent = option;
                select.appendChild(opt);
            });
            dynamicForm.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = step.type;
            input.id = step.id;
            input.name = step.id;
            if (step.pattern) input.pattern = step.pattern;
            input.required = true;
            dynamicForm.appendChild(input);

            input.addEventListener('blur', () => {
                let errorMessage = '';
                if (step.id === 'vehicle-brand') {
                    if (input.value.length < 2 || /\d/.test(input.value)) {
                        errorMessage = 'Vehicle brand must be at least 2 characters long and should not be numeric.';
                    }
                } else if (step.id === 'vehicle-model') {
                    if (input.value.length < 2 || /\d/.test(input.value)) {
                        errorMessage = 'Vehicle model must be at least 2 characters long and should not be numeric.';
                    }
                } else if (step.id === 'vehicle-number') {
                    const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
                    if (!vehicleNumberRegex.test(input.value)) {
                        errorMessage = 'Please enter a valid vehicle number.';
                    }
                }

                const errorElement = document.getElementById(`${step.id}-error`);
                if (errorMessage) {
                    if (!errorElement) {
                        const errorDiv = document.createElement('div');
                        errorDiv.id = `${step.id}-error`;
                        errorDiv.style.color = 'red';
                        errorDiv.textContent = errorMessage;
                        dynamicForm.appendChild(errorDiv);
                    } else {
                        errorElement.textContent = errorMessage;
                    }
                } else {
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            });
        }

        const br = document.createElement('br');
        dynamicForm.appendChild(br);

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.id = 'next-button';
        nextButton.textContent = 'Next';
        dynamicForm.appendChild(nextButton);

        nextButton.addEventListener('click', handleNext);
    }

    function handleNext() {
        let isValid = true;
        const input = dynamicForm.querySelector('input, select');
        if (input) {
            vehicleData[steps[currentStep].id] = input.value;

            if (steps[currentStep].id === 'vehicle-brand') {
                if (input.value.length < 2 || /\d/.test(input.value)) {
                    isValid = false;
                    displayError('vehicle-brand', 'Vehicle brand must be at least 2 characters long and should not be numeric.');
                }
            } else if (steps[currentStep].id === 'vehicle-model') {
                if (input.value.length < 2 || /\d/.test(input.value)) {
                    isValid = false;
                    displayError('vehicle-model', 'Vehicle model must be at least 2 characters long and should not be numeric.');
                }
            } else if (steps[currentStep].id === 'vehicle-number') {
                const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
                if (!vehicleNumberRegex.test(input.value)) {
                    isValid = false;    
                    displayError('vehicle-number', 'Please enter a valid vehicle number.');
                }
            }
        }

        if (isValid) {
            if (currentStep === steps.length - 1) {
                const regId = 'VEH' + Math.floor(1000 + Math.random() * 9000);
                regIdSpan.textContent = regId;
                registrationId.style.display = 'block';
                dynamicForm.style.display = 'none';

                updateSectionDisplay('vehicle-section', 'pricing');

                const vehicleType = vehicleData['vehicle-type'].toLowerCase();
                document.getElementById('cycle-pricing').classList.toggle('disabled', vehicleType !== 'cycle');
                document.getElementById('bike-pricing').classList.toggle('disabled', vehicleType !== 'bike');
                document.getElementById('car-pricing').classList.toggle('disabled', vehicleType !== 'car');
            } else {
                currentStep++;
                if (steps[currentStep].label.includes('{make}')) {
                    steps[currentStep].label = steps[currentStep].label.replace('{make}', vehicleData.vehicleMake || 'Vehicle');
                }
                updateForm(steps[currentStep]);
            }
        }
    }

    function displayError(id, message) {
        const errorElement = document.getElementById(`${id}-error`);
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.id = `${id}-error`;
            errorDiv.style.color = 'red';
            errorDiv.textContent = message;
            dynamicForm.appendChild(errorDiv);
        } else {
            errorElement.textContent = message;
        }
    }

    updateForm(steps[currentStep]);
});

// JS for currency conversion.
document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currency-select');
    const exchangeRates = {
        USD: 1,
        YEN: 110,
        EUR: 0.85
    };

    function updatePrices() {
        const selectedCurrency = currencySelect.value;
        const rate = exchangeRates[selectedCurrency];

        document.querySelectorAll('.price').forEach(priceElement => {
            const usdPrice = parseFloat(priceElement.getAttribute('data-usd'));
            const convertedPrice = (usdPrice * rate).toFixed(2);
            priceElement.textContent = `${selectedCurrency === 'USD' ? '$' : ''}${convertedPrice}`;
        });
    }

    currencySelect.addEventListener('change', updatePrices);

    updatePrices();
});

// JS for hiding and showing forms one after another.
function updateSectionDisplay(currentSection, nextSection) {
    document.getElementById(currentSection).style.display = 'none';
    document.getElementById(nextSection).style.display = 'block';
}

// JS for modal functionality.
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('parkingSlipModal');
    const closeButton = document.getElementsByClassName('close-button')[0];
    const pricingButtons = document.querySelectorAll('.pricing-box button');

    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pricingBox = button.closest('.pricing-box');
            const pricingPlan = pricingBox.querySelector('h3').textContent;
            const totalAmount = pricingBox.querySelector('.price').textContent;

            document.getElementById('modal-employee-name').textContent = employeeData['employee-full-name'];
            document.getElementById('modal-employee-id').textContent = document.getElementById('emp-reg-id').textContent;
            document.getElementById('modal-vehicle-id').textContent = document.getElementById('vehicle-reg-id').textContent;
            document.getElementById('modal-vehicle-brand').textContent = vehicleData['vehicle-brand'];
            document.getElementById('modal-vehicle-model').textContent = vehicleData['vehicle-model'];
            document.getElementById('modal-vehicle-type').textContent = vehicleData['vehicle-type'].toUpperCase();
            document.getElementById('modal-vehicle-number').textContent = vehicleData['vehicle-number'];
            document.getElementById('modal-pricing-plan').textContent = pricingPlan;
            document.getElementById('modal-total-amount').textContent = totalAmount;

            modal.style.display = 'block';
        });
    });

    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

