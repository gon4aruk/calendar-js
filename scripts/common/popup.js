const popupElem = document.querySelector('.popup')
const popupContentElem = document.querySelector('.popup__content')

// в попап нужно передавать координаты, в которых показать попап
export function openPopup(x, y) {
    popupElem.classList.remove('hidden')
    popupContentElem.style.top = `${y}px`
    popupContentElem.style.left = `${x}px`
}

popupContentElem.addEventListener('click', (event) => event.stopPropagation())
popupElem.addEventListener('click', () => popupElem.classList.add('hidden'))
