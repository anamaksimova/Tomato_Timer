export class RenderTomato {
  constructor(app) {
    this.app = app;
    // this.tomato = tomato;
    this.init();
  }

  init() {
    this.list = document.createElement('ul');
    this.list.classList.add('pomodoro-tasks__quest-tasks');
    document.querySelector(this.app).append(this.list);
  }

  renderTaskRow(id, title, importance) {
    const taskRow = document.createElement('li');
    taskRow.classList.add('pomodoro-tasks__list-task', importance);
    const span = document.createElement('span');
    span.classList.add('count-number');
    span.textContent = id;
    const taskBtn = document.createElement('button');
    taskBtn.classList.add('pomodoro-tasks__task-text');
    taskBtn.textContent = title;
    taskRow.append(span, taskBtn);
    this.list.append(taskRow);
  }
}
