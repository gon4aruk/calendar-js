import { generateWeekRange } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";
import { createNumbersArray } from "../common/time.utils.js";
import { getItem } from "../common/storage.js";

const generateDay = () => {
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
  const hoursArray = createNumbersArray(0, 23);

  const hoursArrayElems = hoursArray.map(
    (elem) => `<div class="calendar__time-slot" data-time="${elem}"></div>`
  );
  return hoursArrayElems;
};

export const renderWeek = () => {
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

  const dateOfMonday = getItem("displayedWeekStart");
  const daysOfWeekArray = generateWeekRange(dateOfMonday);

  daysOfWeekArray.forEach((elem) => {
    const dayElem = `<div class="calendar__day" data-time="${elem.getDate()}">${generateDay().join('')}</div>`;
    document.querySelector(".calendar__week").innerHTML += dayElem;
  });

  renderEvents();
};
