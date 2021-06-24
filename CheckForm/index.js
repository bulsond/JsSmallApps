const $form = document.getElementById('form');
const $username = document.getElementById('username');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $password2 = document.getElementById('password2');

function showError($input, message) {
    const $formControl = $input.parentElement;
    $formControl.className = 'form-control error';
    const $small = $formControl.querySelector('small');
    $small.innerText = message;
}

function showSuccess($input) {
    const $formControl = $input.parentElement;
    $formControl.className = 'form-control success';
    const $small = $formControl.querySelector('small');
    $small.innerText = '';
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Event listeners
$form.addEventListener('submit', function (event) {
    event.preventDefault();

    if ($username.value === '') {
        showError($username, 'Требуется имя пользователя');
    } else {
        showSuccess($username);
    }

    if ($email.value === '') {
        showError($email, 'Требуется email');
    } else if (isValidEmail($email.value) === false) {
        showError($email, 'Требуется корректный email');
    }
     else {
        showSuccess($email);
    }

    if ($password.value === '') {
        showError($password, 'Требуется пароль');
    } else {
        showSuccess($password);
    }

    if ($password2.value === '') {
        showError($password2, 'Требуется повторный пароль');
    } else {
        showSuccess($password2);
    }
});