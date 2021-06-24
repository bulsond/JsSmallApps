const $form = document.getElementById('form');
const $username = document.getElementById('username');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $password2 = document.getElementById('password2');

function checkEmpty({value, parent, small, errorMessages}) {
    if (value() === '') {
        parent.className = 'form-control error';
        small.innerText = errorMessages[0];
    } else {
        parent.className = 'form-control success';
        small.innerText = '';
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkEmail({value, parent, small, errorMessages}) {
    if (isValidEmail(value()) === false) {
        parent.className = 'form-control error';
        if (small.innerText === '') {
            small.innerText = errorMessages[1];
        }
    } else {
        parent.className = 'form-control success';
        small.innerText = '';
    }
}

const formInputs = {
    username: {
        value: _ => $username.value,
        parent: $username.parentElement,
        small: $username.parentElement.querySelector('small'),
        errorMessages: ['Требуется имя пользователя'],
        checkRules: [checkEmpty]
    },
    email: {
        value: _ => $email.value,
        parent: $email.parentElement,
        small: $email.parentElement.querySelector('small'),
        errorMessages: ['Требуется email', 'Требуется корректный email'],
        checkRules: [checkEmpty, checkEmail]
    },
    password: {
        value: _ => $password.value,
        parent: $password.parentElement,
        small: $password.parentElement.querySelector('small'),
        errorMessages: ['Требуется пароль'],
        checkRules: [checkEmpty]
    },
    password2: {
        value: _ => $password2.value,
        parent: $password2.parentElement,
        small: $password2.parentElement.querySelector('small'),
        errorMessages: ['Требуется повторный пароль'],
        checkRules: [checkEmpty]
    },
};



// Event listeners
$form.addEventListener('submit', function (event) {
    event.preventDefault();

    for (const key in formInputs) {
        const element = formInputs[key];
        for (const rule of element.checkRules) {
            rule({...element});
        }
    }
});