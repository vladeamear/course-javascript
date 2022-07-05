/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function generateTr(name, value) {
  const tr = document.createElement('TR');
  tr.id = name;
  const td1 = document.createElement('TD');
  td1.innerText = name;
  const td2 = document.createElement('TD');
  td2.innerText = value;
  const td3 = document.createElement('TD');
  const deleteBtn = document.createElement('BUTTON');
  deleteBtn.innerText = 'Удалить';
  td3.appendChild(deleteBtn);
  tr.append(td1, td2, td3);
  return tr;
}

function generateTBody(cookies) {
  // console.log(document.cookie);
  if (cookies) {
    for (const cooka of cookies) {
      const [name, value] = cooka.split('=');
      listTable.appendChild(generateTr(name, value));
    }
  }
}

const cookies = document.cookie ? document.cookie.split('; ') : undefined;

generateTBody(cookies);

filterNameInput.addEventListener('input', function () {
  const filter = filterNameInput.value.toLowerCase();
  const filteredCookies = [];
  document.cookie.split('; ').forEach((str) => {
    if (
      str.split('=')[1].toLowerCase().includes(filter) ||
      str.split('=')[0].toLowerCase().includes(filter)
    )
      filteredCookies.push(str);
  });
  listTable.innerHTML = '';
  generateTBody(filteredCookies);
});

addButton.addEventListener('click', () => {
  const name = addNameInput.value;
  const value = addValueInput.value;
  const filter = filterNameInput.value.toLowerCase();

  const targetTr = listTable.querySelector(`#${name}`);

  if (targetTr) {
    if (
      !filter ||
      value.toLowerCase().includes(filter) ||
      name.toLowerCase().includes(filter)
    ) {
      targetTr.querySelectorAll('TD')[1].textContent = value;
    } else {
      targetTr.remove();
    }
  } else {
    if (
      !filter ||
      value.toLowerCase().includes(filter) ||
      name.toLowerCase().includes(filter)
    ) {
      listTable.appendChild(generateTr(name, value));
    }
  }
  document.cookie = `${name}=${value}`;
});

listTable.addEventListener('click', (e) => {
  const tr = e.target.tagName === 'BUTTON' ? e.target.parentNode.parentNode : null;
  if (tr) {
    document.cookie = `${tr.id}=; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
    tr.remove();
  }
});
