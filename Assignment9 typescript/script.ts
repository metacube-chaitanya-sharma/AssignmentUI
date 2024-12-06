type Pricing = {
    daily: string;
    monthly: string;
    yearly: string;
};

type ConversionRates = Record<string, Pricing>;

const nextStep = (nextFieldId: string, inputId: string): void => {
    const currentField = document.querySelector('.field.active') as HTMLElement | null;
    const nextField = document.getElementById(nextFieldId) as HTMLElement | null;

    if (!currentField || !nextField) return;

    if (!isFieldValid(currentField)) {
        const input = currentField.querySelector('input');
        if (input) input.classList.add('myClass');
        return;
    }

    if (inputId === 'name') {
        const nameDisplay = document.getElementById('nameDisplay') as HTMLElement | null;
        const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
        if (nameDisplay && inputElement) {
            nameDisplay.innerText = inputElement.value;
        }
    }

    currentField.classList.remove('active');
    nextField.classList.add('active');
};

const nextStep1 = (nextFieldId: string, inputId: string): void => {
    const currentField = document.getElementById(inputId) as HTMLElement; 
    const nextField = document.getElementById(nextFieldId) as HTMLElement;

    if (!isFieldValid(currentField)) {
        (currentField.querySelector('input') as HTMLInputElement).classList.add('myClass');
        return;
    }

    currentField.classList.remove('active');
    nextField.classList.add('active');
};

const checkPasswordStrength = (): void => {
    const password = (document.getElementById('password') as HTMLInputElement | null)?.value || '';
    const strength = document.getElementById('passwordStrength') as HTMLElement | null;

    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (strength) {
        strength.style.width = '100%';
        strength.style.backgroundColor = passwordStrength.test(password) ? 'green' : 'red';
    }
};

const showInfo = (event: Event): void => {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement | null)?.value || '';
    const gender = (document.getElementById('gender') as HTMLSelectElement | null)?.value || '';
    const email = (document.getElementById('email') as HTMLInputElement | null)?.value || '';
    const phone = (document.getElementById('phone') as HTMLInputElement | null)?.value || '';

    if (!validatePhone(phone)) {
        const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
        if (phoneInput) phoneInput.classList.add('myClass');
        return;
    }

    if (!name || !gender || !email || !phone) {
        alert('Enter valid input');
        return;
    }

    const employeeInfo = `
    Name: ${name}
    Gender: ${gender}
    Email: ${email}
    Phone: ${phone}
    RegistrationId: ${Math.random()}
    `;
    alert(`Employee Information:\n${employeeInfo}`);
    location.reload();
};

const showPricing = (): Pricing => {
    const type = (document.getElementById('vehicleType') as HTMLSelectElement | null)?.value || '';
    const pricing: Record<string, Pricing> = {
        Cycle: { daily: '$5', monthly: '$100', yearly: '$500' },
        MotorCycle: { daily: '$10', monthly: '$200', yearly: '$1000' },
        FourWheeler: { daily: '$20', monthly: '$500', yearly: '$3500' },
    };
    return pricing[type] || { daily: '', monthly: '', yearly: '' };
};

const modal = document.getElementById('currencyModal') as HTMLElement;
const openModalBtn = document.getElementById('openModalBtn') as HTMLElement;
const openModalBtn2 = document.getElementById('openModalBtn2') as HTMLElement;
const openModalBtn3 = document.getElementById('openModalBtn3') as HTMLElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLElement;
const currencySelect = document.getElementById('currencySelect') as HTMLSelectElement;

openModalBtn.addEventListener('click', () => modal.style.display = 'block');
openModalBtn2.addEventListener('click', () => modal.style.display = 'block');
openModalBtn3.addEventListener('click', () => modal.style.display = 'block');

closeModalBtn.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click', (event: MouseEvent) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const calculateAmount = (event: Event): void => {
    event.preventDefault();
    const currency = document.getElementById('currencySelect') as HTMLSelectElement;
    const vehicleType = document.getElementById('vehiclePriceSelect') as HTMLSelectElement;
    let conversionRate: { [key: string]: { daily: number; monthly: number; yearly: number } } | undefined;

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
        const rates = conversionRate[vehicleType.value];
        alert(`
        Currency Selected: ${currency.value}
        Vehicle: ${vehicleType.value}
        Daily: ${rates.daily}
        Monthly: ${rates.monthly}
        Yearly: ${rates.yearly}
        `);
    }

    location.reload();
};

const isFieldValid = (field: HTMLElement): boolean => {
    const inputElement = field.querySelector('input, select, textarea') as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    if (!inputElement) return false;

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

const validateName = (name: string): boolean => /^[a-zA-Z\s'-]+$/.test(name);

const validateEmail = (email: string): boolean => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const validatePhone = (phone: string): boolean => /^[0-9]{10}$/.test(phone);

const addcolour = (): void => {
    const currentField = document.querySelector('.field.active') as HTMLElement;
    const inputElement = currentField.querySelector('input') as HTMLInputElement;
    inputElement.classList.remove('myclass');};


const validatePassword = (password: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
    