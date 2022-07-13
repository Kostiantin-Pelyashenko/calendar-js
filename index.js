'use strict';
const el = document.querySelector('#calendar');
const currentMonth = new Date();
const dayOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const curMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const tooltipLeft = document.querySelector('.tooltipLeft');
const tooltipRight = document.querySelector('.tooltipRight');

//create calendar
function calender(elem, year, month) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const d = new Date(year, month);
  const days = [];
  const block = document.createElement('div');
  block.className = 'flex-container';
  const currentDate = document.createElement('div'); //title for current date
  currentDate.innerHTML = `${curMonth[month]} ${year}`;
  currentDate.style.textAlign = 'center';
  currentDate.className = 'mb-2';

  //create name for day of Week
  for (let i of dayOfWeek) {
    const div = document.createElement('div');
    div.innerHTML = i;
    div.className = 'fs-5';
    days.push(div);
  }

  //create blank div before first day of month
  for (let i = 0; i < d.getDay(); i++) {
    const div = document.createElement('div');
    days.push(div);
  }

  //create div with date
  for (let i = d.getDate(); i <= lastDayOfMonth.getDate(); i++) {
    const div = document.createElement('div');
    div.innerHTML = d.getDate();
    div.className = 'fs-6 mb-2';
    if (d.getDay() == 0 || d.getDay() == 6) {
      div.style = 'color: red';
    }
    d.setDate(d.getDate() + 1);
    days.push(div);
  }

  //fill calendnar
  for (let i of days) {
    block.append(i);
  }
  elem.innerHTML = '';
  elem.append(currentDate);
  elem.append(block);
}
//Arrows
let count = 0; //counter for arrows
btnLeft.addEventListener('click', () => changeDate('-'));
btnRight.addEventListener('click', () => changeDate('+'));

function changeDate(x) {
  if (x == '-') {
    count--;
  }
  if (x == '+') {
    count++;
  }
  const date = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + count
  );
  const dateLeft = new Date(date.getFullYear(), date.getMonth() - 1); //date for tooltipLeft
  const dateRight = new Date(date.getFullYear(), date.getMonth() + 1); //date for tooltipRight

  calender(el, date.getFullYear(), date.getMonth());
  calender(tooltipLeft, dateLeft.getFullYear(), dateLeft.getMonth());
  calender(tooltipRight, dateRight.getFullYear(), dateRight.getMonth());
}

calender(el, currentMonth.getFullYear(), currentMonth.getMonth());
calender(tooltipLeft, currentMonth.getFullYear(), currentMonth.getMonth() - 1);
calender(tooltipRight, currentMonth.getFullYear(), currentMonth.getMonth() + 1);
