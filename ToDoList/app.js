//список задач
const todos = [];

//---Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//---Event Listeners

//событие загрузки страницы целиком
document.addEventListener('DOMContentLoaded', getTodos);
//события кликов
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', controlTodo);
filterOption.addEventListener('click', filterTodo);

//---Functions

//загрузка задач из лок.хранилища
function getTodos() {
  //пытаемся прочитать сохраненные задачи
  const storages = localStorage.getItem('todos');
  if (storages === null) {
    return;
  }
  //если в локальном хранилище что-то есть, то парсим
  const records = JSON.parse(storages);
  //и заполняем список задач
  records.forEach((r) => {
    todos.push(r);
  });
  //пробегаем по всем и отображаем
  todos.forEach((todo) => {
    showTodo(todo);
  });
}

//отображение задачи
function showTodo(todo) {
  //Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todo; //значение todo
  newTodo.classList.add('todo-item');
  //CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  //CHECK DELETE BUTTON
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  //Insert all child elements
  todoDiv.appendChild(newTodo);
  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
}

//добавление
function addTodo(event) {
  //предотвращаяем автоматическую перерисовку браузером
  //Prevent form from submitting
  event.preventDefault();
  //отображаем задачу
  showTodo(todoInput.value);
  //вставляем в список задач
  todos.push(todoInput.value);
  //сохраняем список задач
  saveTodos();
  //очищаем поле ввода
  todoInput.value = '';
}

//сохраниение задач в лок.хранилище
function saveTodos() {
  if (todos.length === 0) {
    localStorage.clear();
    return;
  }

  let records = JSON.stringify(todos);
  localStorage.setItem('todos', records);
}

//удаление и отметка
function controlTodo(event) {
  //получаем элемент по которому кликнули (кнопка)
  const itemTodo = event.target;
  //получаем его родительский элемент
  const todoElement = itemTodo.parentElement;

  //Удаление задачи
  if (itemTodo.classList[0] === 'trash-btn') {
    //получаем значение задачи
    const todoValue = todoElement.innerText;
    //индекс в списке задач
    const index = todos.indexOf(todoValue);
    //удаляем из списка задач
    todos.splice(index, 1);
    console.table(todos);
    //сохраняем список задач
    saveTodos();

    //Анимация удаления
    todoElement.classList.add('fall');
    //Когда анимация закончится
    todoElement.addEventListener('transitionend', function () {
      //удаляем отображение задачи
      todoElement.remove();
    });
  }

  //Отметка об выполнении задачи
  if (itemTodo.classList[0] === 'complete-btn') {
    todoElement.classList.toggle('completed');
  }
}

//фильтрация
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        todo.style.display = 'flex';
        break;
    }
  });
}
