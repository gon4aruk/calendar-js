import { createNumbersArray } from '../common/time.utils.js'

export const renderTimescale = () => {
    // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
    // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale

    const hoursArray = createNumbersArray(0, 23)
    hoursArray.forEach((elem) => {
        if (elem < 10) {
            const divElem = `<div class="time-slot"><span class="time-slot__time">0${elem}:00</span></div>`
            document.querySelector('.calendar__time-scale').innerHTML += divElem
        } else {
            const divElem = `<div class="time-slot"><span class="time-slot__time">${elem}:00</span></div>`
            document.querySelector('.calendar__time-scale').innerHTML += divElem
        }
    })
}
