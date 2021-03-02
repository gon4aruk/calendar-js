import { generateWeekRange } from '../common/time.utils.js'
import { renderEvents } from '../events/events.js'
import { createNumbersArray } from '../common/time.utils.js'
import { getItem } from '../common/storage.js'

const generateDay = () => {
    const hoursArray = createNumbersArray(0, 23)

    const hoursArrayElems = hoursArray.map(
        (elem) => `<div class="calendar__time-slot" data-time="${elem}"></div>`
    )
    return hoursArrayElems
}

export const renderWeek = () => {
    const dateOfMonday = getItem('displayedWeekStart')
    const daysOfWeekArray = generateWeekRange(dateOfMonday)

    daysOfWeekArray.forEach((elem) => {
        const dayElem = `<div class="calendar__day" data-time="${elem.getDate()}">${generateDay().join(
            ''
        )}</div>`
        document.querySelector('.calendar__week').innerHTML += dayElem
    })

    renderEvents()
}
