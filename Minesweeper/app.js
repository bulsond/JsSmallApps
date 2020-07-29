//
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10; // количество клеток в строке
  let bombAmount = 20; // количество бомб
  let flagAmount = 0; // количество установленных флажков
  let squares = []; // игровые клетки поля
  let isGameOver = false; // флаг окончания игры

  // создание поля игры
  function createBoard() {
    // создаем массив с бомбами и без расположенных в случ.порядке
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    // построение поля игры с клетками на основе случайного массива
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div'); // создаем клетку
      square.setAttribute('id', i); // назначаем номер
      square.classList.add(shuffledArray[i]); // берем класс из случайного массива
      grid.appendChild(square); // отображем клетку
      squares.push(square); // вносим клетку в массив игровых клеток

      // событие обычного левого клика
      square.addEventListener('click', function (e) {
        click(square);
      });

      // событие левого клика с клавищей CTRL (правый клик)
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    // вычисление значений бомб в соседних клетках
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      // определение является ли клетка граничной справа или слева
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      // далее вычисление количество бомб в соседних клетках
      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) {
          total++;
        }
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        ) {
          total++;
        }
        if (i > 10 && squares[i - width].classList.contains('bomb')) {
          total++;
        }
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains('bomb')
        ) {
          total++;
        }
        if (
          i < 98 &&
          !isRightEdge &&
          squares[i + 1].classList.contains('bomb')
        ) {
          total++;
        }
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains('bomb')
        ) {
          total++;
        }
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains('bomb')
        ) {
          total++;
        }
        if (i < 89 && squares[i + width].classList.contains('bomb')) {
          total++;
        }
        // запоминаем в аттрибуте значение количества бомб в соседних клетках
        squares[i].setAttribute('data', total);
      }
    }
  }

  // Вызов создания игрового поля
  createBoard();

  // левый клика с клавищей CTRL (правый клик) по клетке установка флажка
  function addFlag(square) {
    if (isGameOver) {
      return;
    }
    if (!square.classList.contains('checked') && flagAmount < bombAmount) {
      if (!square.classList.contains('flag')) {
        // ставим флаг
        square.classList.add('flag');
        square.innerHTML = 'f';
        flagAmount++;
        checkForWin(); // проверяем на Выйгрыш
      } else {
        // убираем флаг
        square.classList.remove('flag');
        square.innerHTML = '';
        flagAmount--;
      }
    }
  }

  // левый клик по клетке проверка на бомбу
  function click(square) {
    let currentId = square.id;
    if (
      isGameOver ||
      square.classList.contains('checked') ||
      square.classList.contains('flag')
    ) {
      return;
    }
    if (square.classList.contains('bomb')) {
      gameOver(square); // Пройгрыш!
    } else {
      let total = square.getAttribute('data');
      // если клетка содержит количество у соседей бомб
      // то открываем клетку и отображем это количество
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return; // и выходим
      }
      // если эта клетка не содержит соседей с бомбами
      // пытаемся открыть соседние клетки тоже
      checkSquare(square, currentId);
    }
    // открываем клетку
    square.classList.add('checked');
  }

  // проверка соседних клеток при клике на клетку
  // автооткрытие соседних клеток не содержащих бомбы
  function checkSquare(square, currentId) {
    // определяем граничность клетки
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;
    // с задержкой по номеру клетки и условий ее граничности
    // рекурсивно вызываем открывание клетки
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[Number(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[Number(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[Number(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[Number(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[Number(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[Number(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[Number(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[Number(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  // окончание игры (проигрыш)
  function gameOver(square) {
    alert('Бум! Игра закончена!');
    isGameOver = true;

    //показ всех оставшихся бомб
    squares.forEach((square) => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = 'b';
      }
    });
  }

  // проверка окончания игры с победой
  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains('flag') &&
        squares[i].classList.contains('bomb')
      ) {
        matches++;
      }
    }
    if (matches === bombAmount) {
      alert('Вы выйграли!');
      isGameOver = true;
    }
  }
});
