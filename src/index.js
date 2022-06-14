import './js/main.js';
import {Task} from './js/task.js';
import {Tomato} from './js/tomato.js';
import {ControllerTomato} from './js/controllerTomato.js';
import {RenderTomato} from './js/renderTomato.js';
import './scss/index.scss';

// const task = new Task('first');
// console.log('task: ', task.title, task.counter);
// task.changeTitle('task2').countUp();
// console.log('task: ', task.title, task.counter);

const page = new RenderTomato('.app');
const tomato = new Tomato({}, page);
const controllerTomato = new ControllerTomato(tomato, page);


