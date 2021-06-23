const $text = document.querySelector('.content h2');
const $popup = document.querySelector('.popup');

// когда анимация отображения заканчивается удаляем класс ее запустивший
$popup.addEventListener('animationend', () => {
    $popup.classList.remove('active');
    copyToClipboard();
});

// клик по надписи
$text.addEventListener('click', (e) => {
    $popup.classList.add('active');
});

function copyToClipboard() {
    // готовим текстовой элемент из которого будем копировать
    const $textArea = document.createElement('textarea');
    $textArea.setAttribute('readonly', '');
    // удаляем его из потока
    $textArea.style.position = 'absolute';
    // копируем текст из целевого элемента
    $textArea.value = $text.innerText;
    // вставляем текстовой элемент в документ
    document.body.appendChild($textArea);

    // выделяем весь текст в текстовом элементе
    $textArea.select();
    // копируем в Буфер
    document.execCommand('copy');

    // удаляем текстовой элемент из документа
    document.body.removeChild($textArea);
}
