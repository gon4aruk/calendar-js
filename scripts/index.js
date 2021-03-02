import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { initEventForm } from './events/createEvent.js';
import { renderRedLine } from './common/redline.js';
import { renderEvents } from './events/events.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // инициализация всех элементов
  renderTimescale();
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  renderRedLine();
  renderEvents();
});
