import {Task} from './task.js';
export class Tomato {
  activeTask = null;

  constructor({timeForTask = 25, timePause = 5,
    timeBigPause = 15, tasks = []}) {
    this.timeForTask = timeForTask;
    this.timePause = timePause;
    this.timeBigPause = timeBigPause;
    this.tasks = tasks;
  }

  addTask(task) {
    const {id, title, counter} = task;
    this.tasks.push(task);
    console.log('tasks: ', this.tasks, id, title, counter);
    return id;
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
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
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

const tomato = new Tomato({});
const id = tomato.addTask(task);
console.log('task.addTask(): ', id);
tomato.activateTask(id);
tomato.increaseTimerForTask(id);
tomato.runActiveTask();
