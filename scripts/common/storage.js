const onDocumnetLoaded = () => {
    if (!localStorage.getItem('storage')) {
        localStorage.setItem(
            'storage',
            JSON.stringify({
                eventIdToDelete: null,
                displayedWeekStart: null,
            })
        )
    }
}

window.addEventListener('DOMContentLoaded', onDocumnetLoaded)

export const setItem = (key, value) => {
    const storage = JSON.parse(localStorage.getItem('storage'))
    storage[key] = value
    localStorage.setItem('storage', JSON.stringify(storage))
}

export const getItem = (key) => {
    const storage = JSON.parse(localStorage.getItem('storage'))
    return storage[key]
}
