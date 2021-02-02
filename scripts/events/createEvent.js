import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const closeEventFormBtn = document.querySelector(".create-event__close-btn");
const eventFormSubmitBtn = document.querySelector(".event-form__submit-btn");
const eventFormColorElem = document.querySelector(".event-form__color");

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений

  document.querySelectorAll(".event-form__field").forEach((elem) => {
    elem.value = "";
  });
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму

  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
  event.preventDefault();

  const eventFormFields = document.querySelectorAll(".event-form__field");
  const [
    eventTitle,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventDescription,
  ] = eventFormFields;

  const newEvent = {
    id: Math.floor(Math.random() * 1000), // id понадобится для работы с событиями
    title: eventTitle.value,
    description: eventDescription.value,
    start: getDateTime(eventDate.value, eventStartTime.value),
    end: getDateTime(eventDate.value, eventEndTime.value),
    color: eventFormColorElem.value,
  };

  const eventsList = getItem("events");
  eventsList.push(newEvent);
  setItem("events", eventsList);

  closeModal();
  clearEventForm();
  renderEvents();
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы

  closeEventFormBtn.addEventListener("click", onCloseEventForm);
  eventFormSubmitBtn.addEventListener("click", onCreateEvent);
}
