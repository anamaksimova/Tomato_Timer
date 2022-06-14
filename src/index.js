import './js/main.js';
import {Task} from './js/task.js';
import {Tomato} from './js/tomato.js';
import './scss/index.scss';

// const task = new Task('first');
// console.log('task: ', task.title, task.counter);
// task.changeTitle('task2').countUp();
// console.log('task: ', task.title, task.counter);
const tomato = new Tomato({}, '.app');
  tomato.init();

