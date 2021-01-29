import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка

  const dateOfMonday = getItem("displayedWeekStart");
  const daysOfWeekArray = generateWeekRange(dateOfMonday);
  daysOfWeekArray.forEach((elem) => {
    const date = elem.getDate();
    const day = elem.getDay();

    const dayElem = `<div class="calendar__day-label day-label">
    <span class="day-label__day-name">${daysOfWeek[day]}</span>
    <span class="day-label__day-number">${date}</span>
    </div>`;

    const calendarHeaderElem = document.querySelector(".calendar__header");
    calendarHeaderElem.innerHTML += dayElem;
  });
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик

const createEventButton = document.querySelector(".create-event-btn");
createEventButton.addEventListener("click", openModal);
