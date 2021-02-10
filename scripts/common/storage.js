const onDocumnetLoaded = () => {
  if (!localStorage.getItem("storage")) {
    localStorage.setItem(
      "storage",
      JSON.stringify({
        eventIdToDelete: null,
        displayedWeekStart: null,
        events: [],
      })
    );
  }
};

window.addEventListener("DOMContentLoaded", onDocumnetLoaded);

export const setItem = (key, value) => {
  const storage = JSON.parse(localStorage.getItem("storage"));
  storage[key] = value;
  localStorage.setItem("storage", JSON.stringify(storage));
};

export const getItem = (key) => {
  const storage = JSON.parse(localStorage.getItem("storage"));
  return storage[key];
};

// пример объекта события
// const eventExample = {
//   id: 0.7520027086457333, // id понадобится для работы с событиями
//   title: "Title",
//   description: "Some description",
//   start: new Date("2020-03-17T01:10:00.000Z"),
//   end: new Date("2020-03-17T04:30:00.000Z"),
// };
