const {
  enableLayoutChangeEvents
} = require('../../../main');

enableLayoutChangeEvents();

window.addEventListener('o-grid.layoutChange', ({ detail }) => console.log(detail));
