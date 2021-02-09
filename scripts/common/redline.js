const createRedLine = (minutesNow) => {
  const redLine = document.createElement("div");
  redLine.classList.add("decorate-red-line");
  redLine.style.top = `${minutesNow}px`;
  return redLine;
};

export const renderRedLine = () => {
  let dateNow = new Date().getDate();
  let hoursNow = new Date().getHours();
  let minutesNow = new Date().getMinutes();
  let timeSlot = document
    .querySelector(`.calendar__day[data-time = '${dateNow}']`)
    .querySelector(`.calendar__time-slot[data-time = '${hoursNow}']`);

  let redLineElem = createRedLine(minutesNow);
  timeSlot.append(redLineElem);

  const updateLinePosition = () => {
    if (dateNow !== new Date().getDate()) {
      dateNow = new Date().getDate();
      timeSlot = document
        .querySelector(`.calendar__day[data-time = '${dateNow}']`)
        .querySelector(`.calendar__time-slot[data-time = '${hoursNow}']`);
      redLineElem.remove();
      timeSlot.append(redLineElem);
    }

    if (hoursNow !== new Date().getHours()) {
      hoursNow = new Date().getHours();
      timeSlot = document
        .querySelector(`.calendar__day[data-time = '${new Date().getDate()}']`)
        .querySelector(`.calendar__time-slot[data-time = '${hoursNow}']`);
      redLineElem.remove();
      timeSlot.append(redLineElem);
    }
    if (minutesNow !== new Date().getMinutes()) {
      minutesNow = new Date().getMinutes();
      redLineElem.remove();
      redLineElem = createRedLine(minutesNow);
      timeSlot.append(redLineElem);
    }
  };
  setInterval(updateLinePosition, 1000);
};
