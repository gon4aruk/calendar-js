import { getItem, setItem } from "../common/storage.js";
import shmoment from "../common/shmoment.js";
import { openPopup, closePopup } from "../common/popup.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage

  if (
    !event.target.classList.contains("event") &&
    !event.target.classList.contains("event__title") &&
    !event.target.classList.contains("event__time")
  ) {
    return;
  }

  const y = event.pageY;
  const x = event.pageX;
  openPopup(x, y);
  setItem("eventIdToDelete", event.target.dataset.eventId);
  console.log(event.target.closest(".event"));
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря

  setItem("events", []);
}

const createEventElement = (
  id,
  startMinutes,
  differenceOfTimes,
  titleOfEvent,
  timeOfStart,
  timeOfEnd
) => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement

  const eventElement = document.createElement("div");
  eventElement.classList.add("event");
  eventElement.dataset.eventId = id;
  eventElement.setAttribute(
    "style",
    `top: ${startMinutes}px; height: ${differenceOfTimes}px`
  );

  eventElement.innerHTML = `<div class="event__title">${titleOfEvent}</div>
  <div class="event__time">${timeOfStart} - ${timeOfEnd}</div>`;

  return eventElement;
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых

  const eventsList = getItem("events");
  const eventsListOnThisWeek = eventsList.filter(
    (elem) =>
      elem.start.getTime() > getItem("displayedWeekStart").getTime() &&
      elem.start.getTime() <
        shmoment(getItem("displayedWeekStart"))
          .add("days", 7)
          .result()
          .getTime()
  );

  eventsListOnThisWeek.forEach((element) => {
    const eventId = element.id;
    const eventStartMinutes = element.start.getMinutes();
    const differenceOfTimes = Math.floor(
      (element.end.getTime() - element.start.getTime()) / 1000 / 60
    );
    const titleOfEvent = element.title;

    const startHours =
      element.start.getHours() < 10
        ? 0 + String(element.start.getHours())
        : element.start.getHours();
    const startMinutes =
      element.start.getMinutes() < 10
        ? 0 + String(element.start.getMinutes())
        : element.start.getMinutes();

    const timeOfStart = `${startHours}:${startMinutes}`;

    // if (+element.start.getHours() < 10) {
    //   timeOfStart = `0${element.start.getHours()}:${element.start.getMinutes()}`;
    // } else if (+element.start.getMinutes() < 10) {
    //   timeOfStart = `${element.start.getHours()}:0${element.start.getMinutes()}`;
    // } else if (
    //   +element.start.getHours() < 10 &&
    //   +element.start.getMinutes() < 10
    // ) {
    //   timeOfStart = `0${element.start.getHours()}:0${element.start.getMinutes()}`;
    // } else {
    //   timeOfStart = `${element.start.getHours()}:${element.start.getMinutes()}`;
    // }

    const endHours =
      element.end.getHours() < 10
        ? 0 + String(element.end.getHours())
        : element.end.getHours();
    const endMinutes =
      element.end.getMinutes() < 10
        ? 0 + String(element.end.getMinutes())
        : element.end.getMinutes();

    const timeOfEnd = `${endHours}:${endMinutes}`;

    // if (+element.start.getHours() < 10) {
    //   timeOfEnd = `0${element.end.getHours()}:${element.end.getMinutes()}`;
    // } else if (+element.start.getMinutes() < 10) {
    //   timeOfEnd = `${element.end.getHours()}:0${element.end.getMinutes()}`;
    // } else if (
    //   +element.start.getHours() < 10 &&
    //   +element.start.getMinutes() < 10
    // ) {
    //   timeOfEnd = `0${element.end.getHours()}:0${element.end.getMinutes()}`;
    // } else {
    //   timeOfEnd = `${element.end.getHours()}:${element.end.getMinutes()}`;
    // }

    const eventElement = createEventElement(
      eventId,
      eventStartMinutes,
      differenceOfTimes,
      titleOfEvent,
      timeOfStart,
      timeOfEnd
    );

    const timeSlot = document
      .querySelector(
        `.calendar__day[data-time = '${element.start.getDate()}']`
      )
      .querySelector(
        `.calendar__time-slot[data-time = '${element.start.getHours()}']`
      );

    timeSlot.append(eventElement);
  });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)

  const eventsList = getItem("events");
  const eventIdToDelete = getItem("eventIdToDelete");

  const newEventsList = eventsList.filter(({ id }) => +id !== +eventIdToDelete);
  setItem("events", newEventsList);

  document.querySelector(
    `.event[data-event-id = '${eventIdToDelete}']`
  ).parentElement.innerHTML = "";

  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener("click", onDeleteEvent);

weekElem.addEventListener("click", handleEventClick);
