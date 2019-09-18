import { enableLayoutChangeEvents } from '../../../main';

enableLayoutChangeEvents();

window.addEventListener('o-grid.layoutChange', ({ detail }) => console.log(detail));
