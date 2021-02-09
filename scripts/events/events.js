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
  timeOfEnd,
  color
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
    `top: ${startMinutes}px; height: ${differenceOfTimes}px; background-color: ${color};`
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

  const MINUTES_OF_MILISECONDS = 1000 * 60;
  const eventsList = getItem("events");
  const eventsListOnThisWeek = eventsList.filter((elem) => {
    const startTime = new Date(elem.start);
    const timeNow = new Date(getItem("displayedWeekStart"));
    return (
      startTime.getTime() > timeNow.getTime() &&
      startTime.getTime() < shmoment(timeNow).add("days", 7).result().getTime()
    );
  });

  eventsListOnThisWeek.forEach((element) => {
    const eventId = element.id;
    const startTime = new Date(element.start);
    const endTime = new Date(element.end);
    const eventStartMinutes = startTime.getMinutes();
    const differenceOfTimes = Math.floor(
      (endTime.getTime() - startTime.getTime()) / MINUTES_OF_MILISECONDS
    );
    const titleOfEvent = element.title;

    const startHours =
      startTime.getHours() < 10
        ? 0 + String(startTime.getHours())
        : startTime.getHours();
    const startMinutes =
      startTime.getMinutes() < 10
        ? 0 + String(startTime.getMinutes())
        : startTime.getMinutes();

    const timeOfStart = `${startHours}:${startMinutes}`;

    const endHours =
      endTime.getHours() < 10
        ? 0 + String(endTime.getHours())
        : endTime.getHours();
    const endMinutes =
      endTime.getMinutes() < 10
        ? 0 + String(endTime.getMinutes())
        : endTime.getMinutes();

    const timeOfEnd = `${endHours}:${endMinutes}`;
    const color = element.color;

    const eventElement = createEventElement(
      eventId,
      eventStartMinutes,
      differenceOfTimes,
      titleOfEvent,
      timeOfStart,
      timeOfEnd,
      color
    );

    const timeSlot = document
      .querySelector(`.calendar__day[data-time = '${startTime.getDate()}']`)
      .querySelector(
        `.calendar__time-slot[data-time = '${startTime.getHours()}']`
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
  ).closest('.calendar__time-slot').innerHTML = "";

  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener("click", onDeleteEvent);

weekElem.addEventListener("click", handleEventClick);
