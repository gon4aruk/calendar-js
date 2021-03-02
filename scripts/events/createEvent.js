import { renderEvents } from './events.js'
import { closeModal } from '../common/modal.js'
import { createEvent } from '../common/eventsGateway.js'

const eventFormElem = document.querySelector('.event-form')
const closeEventFormBtn = document.querySelector('.create-event__close-btn')
const eventFormSubmitBtn = document.querySelector('.event-form__submit-btn')
const eventFormColorElem = document.querySelector('.event-form__color')

function onCloseEventForm() {
    closeModal()
    eventFormElem.reset()
}

function onCreateEvent(event) {
    // задача этой ф-ции только добавить новое событие на сервер и отрисовать неделю с учётом изменений

    event.preventDefault()

    const formData = new FormData(eventFormElem)

    const eventData = Object.fromEntries(formData)
    eventData.color = eventFormColorElem.value

    createEvent(eventData).then(() => {
        closeModal()
        eventFormElem.reset()
        renderEvents()
    })
}

export function initEventForm() {
    // подпишитесь на сабмит формы и на закрытие формы

    closeEventFormBtn.addEventListener('click', onCloseEventForm)
    eventFormSubmitBtn.addEventListener('click', onCreateEvent)
}
