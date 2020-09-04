import { enableLayoutChangeEvents } from '../../../main.js';

enableLayoutChangeEvents();

window.addEventListener('o-grid.layoutChange', ({ detail }) => console.log(detail));
