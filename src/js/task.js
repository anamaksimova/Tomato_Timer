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
  set counter(value) {
    this.#counter = value;
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

  execute() {
    throw new Error('Not implemented');
  }
}


export class ImportantTask extends Task {
  constructor(title, counter = 0) {
    super(title, counter);
    this.importance = 'important';
  }
  execute() {
    console.log(`Task ${this.title} is very ${this.importance}`);
    return;
  }
}

export class StandartTask extends Task {
  constructor(title, counter = 0) {
    super(title, counter);
    this.importance = 'standart';
  }
  execute() {
    console.log(`Task ${this.title} is very ${this.importance}`);
    return;
  }
}

export class LittleTask extends Task {
  constructor(title, counter = 0) {
    super(title, counter);
    this.importance = 'little';
  }
  execute() {
    console.log(`Task ${this.title} is very ${this.importance}`);
    return;
  }
}
