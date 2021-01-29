export const renderRedLine = () => {
  const timeSlot = document
    .querySelector(`.calendar__day[data-time = '${new Date().getDate()}']`)
    .querySelector(
      `.calendar__time-slot[data-time = '${new Date().getHours()}']`
    );

  let minutes = new Date().getMinutes();
  timeSlot.innerHTML = `<div class="decorate-red-line" style="top: ${minutes}px"></div>`;

  const updateLinePosition = () => {
    if (minutes !== new Date().getMinutes()) {
      minutes = new Date().getMinutes();

      timeSlot.innerHTML = `<div class="decorate-red-line" style="top: ${minutes}px"></div>`;
    }
  };
  setInterval(updateLinePosition, 1000);
};
