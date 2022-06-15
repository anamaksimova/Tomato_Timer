export class ControllerTomato {
  constructor(tomato, page) {
    this.tomato = tomato;
    this.page = page;
    this.init();
  }

  init() {
    const newTask = document.querySelector('.task-form');
    newTask.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = document.querySelector('#task-name').value;
      const taskImportance = document.querySelector('.button-importance').
          classList.contains('important') ? 'important' :
   document.querySelector('.button-importance').
       classList.contains('default') ? 'default' : 'so-so';
      const task = this.tomato.operation(taskTitle, taskImportance);
      const taskId = task.id;
      this.page.renderTaskRow(taskId, taskTitle, taskImportance);
    });

    const ul = document.querySelector('.pomodoro-tasks__quest-tasks');
    ul.addEventListener('click', (e) => {
      if (e.target.classList.contains('pomodoro-tasks__task-text')) {
        document.querySelectorAll('.pomodoro-tasks__task-text_active').
            forEach(element => {
              element.classList.remove('pomodoro-tasks__task-text_active');
            });
        e.target.classList.add('pomodoro-tasks__task-text_active');
        const id = e.target.previousElementSibling.textContent / 1;
        this.tomato.activateTask(id);
        document.querySelector('.window__panel-title').textContent = e.target.textContent;
      }
    });

    document.querySelector('.button-primary').addEventListener('click', () => {
      if (this.timerTaskId) {
        clearInterval(this.timerTaskId);
      }
      clearInterval(this.timerPauseId);
      this.timerTaskId = this.tomato.runActiveTask();
    });
    document.querySelector('.button-secondary').addEventListener('click', () => {
      clearInterval(this.timerTaskId);
    });
  }
}
