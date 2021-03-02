const addRedLine = minutesNow => {
  const dateNow = new Date().getDate();
  const hoursNow = new Date().getHours();
  const timeSlot = document
    .querySelector(`.calendar__day[data-time = '${dateNow}']`)
    .querySelector(`.calendar__time-slot[data-time = '${hoursNow}']`);

  const redLine = document.createElement('div');
  redLine.classList.add('decorate-red-line');
  redLine.style.top = `${minutesNow}px`;
  timeSlot.append(redLine);
};

export const renderRedLine = () => {
  let minutesNow = new Date().getMinutes();

  addRedLine(minutesNow);

  const updateLinePosition = () => {
    if (minutesNow !== new Date().getMinutes()) {
      const redLineElem = document.querySelector('.decorate-red-line');

      minutesNow = new Date().getMinutes();

      redLineElem.remove();
      addRedLine(minutesNow);
    }
  };

  setInterval(updateLinePosition, 1000);
};
