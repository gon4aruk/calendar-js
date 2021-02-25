const baseUrl = "https://60322069081a010017547728.mockapi.io/api/v1/events";

export const getEventsList = () => {
  return fetch(baseUrl)
    .then((response) => response.json())
    .catch(() => alert("Internal server error"));
};

export const createEvent = (eventData) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(eventData),
  })
  .then(response => response.json())
  .catch(() => alert("Internal server error"));
};

export const deleteEvent = (eventId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: "DELETE",
  });
};
