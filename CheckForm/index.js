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

function checkLength({value, parent, small, minLength, maxLength, errorMessages}) {
    const text = value();
    const length = text.length;

    if (length < minLength) {
        parent.className = 'form-control error';
        if (small.innerText === '') {
            small.innerText = errorMessages[1];
        }
    } else if (length > maxLength) {
        parent.className = 'form-control error';
        small.innerText = errorMessages[2];
    }
     else {
        parent.className = 'form-control success';
        small.innerText = '';
    }
}

function checkMatching({value, matchValue, parent, small, errorMessages}) {
    const text = value();
    const otherText = matchValue();
    if (text !== otherText) {
        parent.className = 'form-control error';
        small.innerText = errorMessages[3];
    } else {
        if (small.innerText === '') {
            parent.className = 'form-control success';
        }
    }
}

const formInputs = {
    username: {
        value: _ => $username.value,
        parent: $username.parentElement,
        small: $username.parentElement.querySelector('small'),
        minLength: 3,
        maxLength: 15,
        errorMessages: [
            'Требуется имя пользователя',
            'Имя не должно быть короче 3 символов',
            'Имя не должно быть длиннее 15 символов'
        ],
        checkRules: [checkEmpty, checkLength]
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
        minLength: 6,
        maxLength: 25,
        errorMessages: [
            'Требуется пароль',
            'Пароль не должен быть короче 6 символов',
            'Пароль не должен быть длиннее 25 символов'
        ],
        checkRules: [checkEmpty, checkLength]
    },
    password2: {
        value: _ => $password2.value,
        matchValue: _ => $password.value,
        parent: $password2.parentElement,
        small: $password2.parentElement.querySelector('small'),
        minLength: 6,
        maxLength: 25,
        errorMessages: [
            'Требуется повторный пароль',
            'Пароль не должен быть короче 6 символов',
            'Пароль не должен быть длиннее 25 символов',
            'Пароли не совпадают!'
        ],
        checkRules: [checkEmpty, checkLength, checkMatching]
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