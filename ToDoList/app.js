//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event Listeners
todoButton.addEventListener('click', addTodo);

//Functions
function addTodo(event) {
  //предотвращаяем автоматическую перерисовку браузером
  //Prevent form from submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create LI
  const newTodo = document.createElement('li');
  //TODO
  newTodo.innerText = todoInput.value;
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
  //Clear Todo INPUT Value
  todoInput.value = '';
}
