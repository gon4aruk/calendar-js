import shmoment from '../common/shmoment.js'
import { openPopup } from '../common/popup.js'
import { renderRedLine } from '../common/redline.js'
import { deleteEvent, getEventsList } from '../common/eventsGateway.js'
import { getDateTime } from '../common/time.utils.js'
import { getItem, setItem } from '../common/storage.js'

const weekElem = document.querySelector('.calendar__week')
const deleteEventBtn = document.querySelector('.delete-event-btn')

function handleEventClick(event) {
    // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
    // установите eventIdToDelete с id события в storage

    if (
        !event.target.classList.contains('event') &&
        !event.target.classList.contains('event__title') &&
        !event.target.classList.contains('event__time')
    ) {
        return
    }

    const y = event.pageY
    const x = event.pageX
    openPopup(x, y)

    if (
        event.target.classList.contains('event__title') ||
        event.target.classList.contains('event__time')
    ) {
        setItem(
            'eventIdToDelete',
            event.target.closest('.event').dataset.eventId
        )
    } else {
        setItem('eventIdToDelete', event.target.dataset.eventId)
    }
}

const createEventElement = (eventItem) => {
    const MINUTES_OF_MILISECONDS = 1000 * 60
    const eventId = eventItem.id
    const startMinutes = getDateTime(
        eventItem.date,
        eventItem.startTime
    ).getMinutes()
    const startTime = getDateTime(eventItem.date, eventItem.startTime)
    const endTime = getDateTime(eventItem.date, eventItem.endTime)
    const differenceOfTimes = Math.floor(
        (endTime.getTime() - startTime.getTime()) / MINUTES_OF_MILISECONDS
    )
    const eventColor = eventItem.color
    const titleOfEvent = eventItem.title
    const timeOfStart = getDateTime(eventItem.date, eventItem.startTime)
        .toString()
        .slice(16, 21)
    const timeOfEnd = getDateTime(eventItem.date, eventItem.endTime)
        .toString()
        .slice(16, 21)

    const eventElement = document.createElement('div')
    eventElement.classList.add('event')
    eventElement.dataset.eventId = eventId
    eventElement.setAttribute(
        'style',
        `top: ${startMinutes}px; height: ${differenceOfTimes}px; background-color: ${eventColor};`
    )

    eventElement.innerHTML = `<div class="event__title">${titleOfEvent}</div>
  <div class="event__time">${timeOfStart} - ${timeOfEnd}</div>`

    return eventElement
}

const filterEventsList = (eventsList) => {
    return eventsList.filter((elem) => {
        const startTime = getDateTime(elem.date, elem.startTime)
        const dateOfMonday = new Date(getItem('displayedWeekStart'))
        return (
            startTime.getTime() > dateOfMonday.getTime() &&
            startTime.getTime() <
                shmoment(dateOfMonday).add('days', 7).result().getTime()
        )
    })
}

const appendEvents = (eventsListOnThisWeek) => {
    eventsListOnThisWeek.forEach((element) => {
        const startTime = getDateTime(element.date, element.startTime)
        const eventElement = createEventElement(element)

        const timeSlot = document
            .querySelector(
                `.calendar__day[data-time = '${startTime.getDate()}']`
            )
            .querySelector(
                `.calendar__time-slot[data-time = '${startTime.getHours()}']`
            )

        timeSlot.append(eventElement)
    })
}

export const renderEvents = () => {
    getEventsList().then((eventsList) => {
        const eventsListOnThisWeek = filterEventsList(eventsList)
        appendEvents(eventsListOnThisWeek)
    })
}

function onDeleteEvent() {
    const popupElem = document.querySelector('.popup')
    const eventIdToDelete = getItem('eventIdToDelete')

    deleteEvent(eventIdToDelete)

    document
        .querySelector(`.event[data-event-id = '${eventIdToDelete}']`)
        .closest('.calendar__time-slot').innerHTML = ''

    renderRedLine()
    popupElem.classList.add('hidden')
}

deleteEventBtn.addEventListener('click', onDeleteEvent)

weekElem.addEventListener('click', handleEventClick)
