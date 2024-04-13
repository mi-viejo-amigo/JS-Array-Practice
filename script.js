
// Получаем Тэмплэйт
const template = document.querySelector('#list-item_template').content;
// Heading
const heading = document.getElementById('heading');
// input
const input = document.querySelector('#title');
// create Task Btn
const createTaskBtn = document.querySelector('#create');
// Modal window
const dialogWindow = document.querySelector('#dialog-id');

// Узлы
const taskList = document.querySelector('#list');

// CALLBACKS FUNCTIONS START 
// коллбек открытия и закрытия модалки.
const setModalBehavior = (window)=> {
  window.showModal();
  window.addEventListener('click', (event) => {
    if (event.target === window) {
      window.close();
    }
  });
}
const createModalHandler = (window) => {
  return () => {
    setModalBehavior(window);
  };
};

// Колбек удаления Таски
const deleteTask = (itemToDelete) => {
  itemToDelete.style.marginBottom = `-${itemToDelete.offsetHeight}px`; // Устанавливаем отрицательный margin-bottom для элемента, который мы удаляе
  // Добавляем класс анимации к элементу задачи
  itemToDelete.classList.add('animate__hinge');
  setTimeout(() => {
    // Удаляем элемент задачи
    itemToDelete.classList.remove('animate__hinge');
    itemToDelete.remove();
    saveTaskList(); // Вызываем функцию для сохранения списка в local Storage при УДАЛЕНИИ элемента
  }, 2000);
  setScrollBehavior();
}
const deleteTaskHandler = (itemToDelete) => {
  return () => {
    deleteTask(itemToDelete);
  };
};
// CALLBACKS FUNCTIONS END ^
//
// Выводим задачи в список
createTaskBtn.addEventListener('click', () => {
  const taskElement = template.querySelector('.list-group-item').cloneNode(true);
  const taskTitle = taskElement.querySelector('#task-title');
  taskElement.classList.remove('animate__animated', 'animate__bounceInUp'); // на всякий случай убираю классы
  taskTitle.textContent = input.value;
  setScrollBehavior();

  // Open modal Button 
  const greenButton = taskElement.querySelector('.btn-success');
  greenButton.addEventListener('click', createModalHandler(dialogWindow));

// Delete task Btm
  const taskDeleteBtn = taskElement.querySelector('.btn-danger');
  taskDeleteBtn.addEventListener('click', deleteTaskHandler(taskElement));

  if (input.value.length >= 2) {
    taskList.prepend(taskElement)
    saveTaskList(); // Вызываем функцию для сохранения списка при ДОБАВЛЕНИИ элемента (chatGPT)
  } else if (input.value.length === 0) { 
    // 
    // 
    // 
    const answer = confirm('Псс, Хочешь создать заметку? ^^');
    if (answer === true) { 
      input.classList.add('animate__bounce');
      heading.classList.add('animate__bounce');
      setTimeout(() => {
        input.classList.remove('animate__bounce');
        heading.classList.remove('animate__bounce');
        input.classList.add('animate__jello');
        }, 1500); 
        input.classList.remove('animate__jello');
    } else {
      return
    }
    // 
    // 
    // 
  } else {
    alert('Название задачи должно содержать не менее 2 символов.');
  }
  input.value = '';
});


// Ререндер страницы при участии ChatGPT magic <START>
// open modal Button 
// Проверяем, есть ли сохраненный список в localStorage
const savedTaskList = localStorage.getItem('taskList');
// Если есть сохраненный список, загружаем его
if (savedTaskList) {
  taskList.innerHTML = savedTaskList;
  setScrollBehavior();
  // console.log(taskList.innerHTML);
  // console.log(taskList.classList);
  // Восстанавливаем обработчики событий для кнопок Modal Window
  taskList.querySelectorAll('.btn-success').forEach(openModalBtn => {
    openModalBtn.addEventListener('click', createModalHandler(dialogWindow)); // передали коллбек открытия/закрытия модалки
  });
  // Восстанавливаем обработчики событий для кнопок удаления
  taskList.querySelectorAll('.btn-danger').forEach(btn => {
    btn.addEventListener('click', () => {
      const listItemToRemove = btn.parentElement.parentElement;
      listItemToRemove.style.marginBottom = `-${listItemToRemove.offsetHeight}px`; // Устанавливаем отрицательный margin-bottom для элемента, который мы удаляем
      listItemToRemove.classList.add('animate__hinge'); // анимация 
      setTimeout(() => {
        listItemToRemove.remove(); // Удаляем элемент из DOM после анимации
        saveTaskList(); // Сохраняем обновленный список после удаления элемента
      }, 2000); // Время анимации в миллисекундах должно соответствовать времени transition в CSS
    });
  });
    // Добавляем класс анимации к элементу после восстановления списка
    const listItems = taskList.querySelectorAll('.list-group-item');
    listItems.forEach(item => {
      item.classList.add('animate__animated', 'animate__bounceInUp');
      setTimeout(() => {
        item.classList.remove('animate__animated', 'animate__bounceInUp');
        }, 1500); 
    });
}
// Функция для сохранения текущего списка задач в localStorage
function saveTaskList() {
  const currentTaskList = taskList.innerHTML;
  localStorage.setItem('taskList', currentTaskList);
}
// <(ChatGPT magic END)>


// Делаем умный скролл для списка^
function setScrollBehavior() {
  let taskElementsArray;
  let hasClass;
  // Запускаем проверку через 1.6 секунд после загрузки страницы (ЧТО БЫ АНИМАЦИЯ УЖЕ ОТЫГРАЛА)
  setTimeout(() => {
    // Выполняем проверку
    taskElementsArray = Array.from(document.querySelectorAll('.list-group-item'));
    hasClass = taskElementsArray.every(taskItem => taskItem.classList.contains('animate__bounceInUp'));
  
    if (Array.from(taskList.children).length >= 6 && !hasClass) {
      taskList.classList.add('smart-scroll');
    } else {
      taskList.classList.remove('smart-scroll');
    }
  }, 1600);
}
setScrollBehavior();



// array + object PRACTICE
// heading to random word of array

// Array
let array = [
    {title: 'Заметки',   ranking: 5},
    {title: 'Описание',  ranking: 3},
    {title: 'Приложуха', ranking: 5},
    {title: 'Задачи',    ranking: 2},
    {title: 'Списочек',  ranking: 5}
];

// filter NEW ARRAY-(best rank title) of dirty array^
const bestTitles = array.filter( exemple => exemple.ranking > 4);
// console.log(bestTitles);

// getting random index of new array
const randomIndexOfArray = Math.floor(Math.random() * bestTitles.length)
// console.log(randomIndexOfArray);

// put random heading (of new array with filtered ranking titles 8-])
heading.textContent = bestTitles[randomIndexOfArray].title + ' ^^';
// console.log(heading.textContent);


console.log('first massage');

setTimeout(()=> {
  console.log('second massage');
},3000);

let some = 'someValue';

const promise = new Promise((resolve, reject)=> {
  if (some) {
    resolve('third massage')
  }
});

promise.then(function (value) {
  console.log(value);
})
  


for (let i = 0; i <= 99; i += 1) {
  console.log('Это сообщение нужно показать в консоли миллион раз');
} 

console.log('last massage');


// localStorage.clear();

