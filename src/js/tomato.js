import {Task, ImportantTask,
  StandartTask,
  LittleTask} from './task.js';

export class Tomato {
  activeTask = null; importantTask;

  constructor({timeForTask = 25, timePause = 5,
    timeBigPause = 15, tasks = []}, renderApp = null) {
    if (Tomato._instance) {
      return Tomato._instance;
    }
    this.timeForTask = timeForTask;
    this.timePause = timePause;
    this.timeBigPause = timeBigPause;
    this.tasks = tasks;
    this.renderApp = renderApp;
    this.renderTomato = null;
    this.controllerTomato = null;
    Tomato._instance = this;
  }

  addTask(task) {
    const {id, title, counter} = task;
    this.tasks.push(task);
    console.log('tasks: ', this.tasks, id, title, counter);
    return id;
  }

  operation(title, importance, counter = 0) {
    const Task = importance === 'important' ? ImportantTask :
    importance === 'default' ? StandartTask : LittleTask;
    const task = new Task(title, counter);
    this.addTask(task);
    return task;
  }

  showOperations() {
    const output = [];
    for (const item of this.tasks) {
      output.push({
        operation: item.constructor.name,
        title: item.title,
        counter: item.counter,
      });
    }
    console.table(output);
  }

  activateTask(taskId) {
    this.activeTask = this.tasks.find(x => x.id === taskId);
  }
   plusZero = (num) => {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  };
  runPause() {
    let time = this.timePause * 60;
    const timer = setInterval(() => {
      const seconds = time % 60;
      console.log('seconds: ', seconds);
      const minutes = Math.floor(time / 60);
      console.log('minutes: ', minutes);
      document.querySelector('.window__timer-text').textContent = `
      ${this.plusZero(minutes)}:${this.plusZero(seconds)} `;

      if (time <= 0) {
        clearInterval(timer);
        console.log('Время паузы закончилось');
        document.querySelector('.window__timer-text').textContent = `
          00:00 `;
      } else {
        time--;
        this.timePause = time / 60;
      }
    }, 1000);
    return timer;
  }
  runActiveTask() {
    if (this.activeTask) {
      const task = this.activeTask;
      const {id, title, counter} = this.activeTask;
      console.log('id: ', id);
      let taskCounter = task.counter;
      if (counter === 0){
          taskCounter = this.timeForTask; 
      }
      let time = taskCounter * 60;
      const timer = setInterval(() => {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60);
       document.querySelector('.window__timer-text').textContent = `
       ${this.plusZero(minutes)}:${this.plusZero(seconds)} `;
        if (time <= 0) {
          clearInterval(timer);
          this.activeTask = null;
          console.log('Время закончилось');
          document.querySelector('.window__timer-text').textContent = `
          00:00 `;
          this.runPause();
        } else {
          time--;
          task.counter = time / 60;
        }
      }, 1000);
      return timer;
    } else {
      console.error(`Нет активной задачи`);
    }

  
  }

  increaseTimerForTask(taskId) {
    const conter = this.tasks.find(x => x.id === taskId);
    conter.countUp();
  }
}

const task = new Task('taskk', 1);
console.log('task: ', task.title, task.counter);

// const tomato = new Tomato({});
// const id = tomato.addTask(task);
// console.log('task.addTask(): ', id);
// tomato.activateTask(id);
// tomato.increaseTimerForTask(id);
// tomato.runActiveTask();
// tomato.operation('one', 1, 'little');
// tomato.operation('two', 2, 'important');
// tomato.operation('three', 3, 'standart');
// console.log(tomato.tasks);
// tomato.showOperations();
