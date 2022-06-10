export class Task {
  #id;
  #title;
  #counter;
  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get counter() {
    return this.#counter;
  }
  constructor(title, counter = 0) {
    this.#id = Math.round(Math.random() * 1000);
    this.#title = title;
    this.#counter = counter;
  }

  countUp() {
    this.#counter++;
  }

  changeTitle(newTitle) {
    this.#title = newTitle;
    return this;
  }
}
