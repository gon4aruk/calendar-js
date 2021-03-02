const baseUrl = 'https://60322069081a010017547728.mockapi.io/api/v1/events'

export const getEventsList = () => {
    return fetch(baseUrl)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }

            throw new Error('Internal server error')
        })
        .catch((error) => alert(error.message))
}

export const createEvent = (eventData) => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(eventData),
    })
        .then((response) => {
            if (response.ok) {
                return
            }

            throw new Error('Internal server error')
        })
        .catch((error) => alert(error.message))
}

export const deleteEvent = (eventId) => {
    return fetch(`${baseUrl}/${eventId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                return
            }

            throw new Error('Internal server error')
        })
        .catch((error) => alert(error.message))
}
