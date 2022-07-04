/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  const target = [...e.target.classList].includes('draggable-div') && e.target;
  if (target) {
    target.onmousedown = () => {
      target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
      target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
      target.onmousemove = (evt) => {
        target.style.left = evt.pageX - target.offsetWidth / 2 + 'px';
        target.style.top = evt.pageY - target.offsetHeight / 2 + 'px';
      };
    };
    target.onmouseup = function () {
      target.onmousemove = null;
    };
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function createDiv() {
  const div = document.createElement('DIV');
  div.style.position = 'fixed';
  const width = getRandomInt(100);
  const height = getRandomInt(100);
  div.style.width = `${width > window.innerWidth ? window.innerWidth : width}px`;
  div.style.height = `${height > window.innerHeight ? window.innerHeight : height}px`;
  div.style.top = `${getRandomInt(
    window.innerHeight - (height > window.innerHeight ? window.innerHeight : height)
  )}px`;
  div.style.left = `${getRandomInt(
    window.innerWidth - (width > window.innerWidth ? window.innerWidth : width)
  )}px`;
  div.style.backgroundColor = `rgb(${getRandomInt(255)},${getRandomInt(
    255
  )},${getRandomInt(255)})`;
  div.classList.add('draggable-div');
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
