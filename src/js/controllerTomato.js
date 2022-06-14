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
      this.tomato.operation(taskTitle, taskImportance);
      this.page.renderTaskRow(taskTitle, taskImportance);
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
}
