import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");
const eventFormSubmitBtn = document.querySelector(".event-form__submit-btn");
const eventFormColorElem = document.querySelector(".event-form__color");

function onCloseEventForm() {
  closeModal();
  eventFormElem.reset();
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

  const formData = new FormData(eventFormElem);

  const newEvent = {
    id: Math.floor(Math.random() * 1000), // id понадобится для работы с событиями
    title: formData.get("title"),
    description: formData.get("description"),
    start: getDateTime(formData.get("date"), formData.get("startTime")),
    end: getDateTime(formData.get("date"), formData.get("endTime")),
    color: eventFormColorElem.value,
  };

  const eventsList = getItem("events");
  eventsList.push(newEvent);
  setItem("events", eventsList);

  closeModal();
  eventFormElem.reset();
  renderEvents();
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы

  closeEventFormBtn.addEventListener("click", onCloseEventForm);
  eventFormSubmitBtn.addEventListener("click", onCreateEvent);
}
