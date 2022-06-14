import {Task, ImportantTask,
  StandartTask,
  LittleTask} from './task.js';
import {RenderTomato} from './renderTomato.js';
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
    Tomato._instance = this;
  }

  init() {
    if (this.renderApp) {
      this.renderTomato = new RenderTomato(this.renderApp, this);
    }
    const newTask = document.querySelector('.task-form');
    newTask.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = document.querySelector('#task-name').value;
      const taskImportance = document.querySelector('.button-importance').
          classList.contains('important') ? 'important' :
   document.querySelector('.button-importance').
       classList.contains('default') ? 'default' : 'so-so';
      this.operation(taskTitle, taskImportance);

      this.renderTomato.renderTaskRow(taskTitle, taskImportance);
    });

    const ul = document.querySelector('.pomodoro-tasks__quest-tasks');
    ul.addEventListener('click', (e) => {
      if (e.target.classList.contains('pomodoro-tasks__task-text')) {
        document.querySelectorAll('.pomodoro-tasks__task-text_active').
            forEach(element => {
              element.classList.remove('pomodoro-tasks__task-text_active');
            });
        e.target.classList.add('pomodoro-tasks__task-text_active');
        document.querySelector('.window__panel-title').textContent = e.target.textContent;
      }
    });
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
  runPause() {
    let time = this.timePause * 60;
    const timer = setInterval(() => {
      const seconds = time % 60;
      console.log('seconds: ', seconds);
      const minutes = Math.floor(time / 60);
      console.log('minutes: ', minutes);

      if (time <= 0) {
        clearInterval(timer);
        console.log('Время паузы закончилось');
      } else {
        time--;
        this.timePause = time / 60;
      }
    }, 1000);
  }
  runActiveTask() {
    if (this.activeTask) {
      const task = this.activeTask;
      const {id, title, counter} = this.activeTask;
      let time = counter * 60;
      const timer = setInterval(() => {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60);
        if (time <= 0) {
          clearInterval(timer);
          this.activeTask = null;
          console.log('Время закончилось');
          this.runPause();
        } else {
          time--;
          task.counter = time / 60;
        }
      }, 1000);
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
