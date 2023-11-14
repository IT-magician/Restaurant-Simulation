class Food {
  #name;
  #origin;

  constructor(name) {
    this.#name = name;
  }

  getFoodName() {
    return this.#name;
  }
}

class sundaeSoop extends Food {
  constructor() {
    super("순대국");
  }
}

class SoopForHangingOver extends Food {
  constructor() {
    super("해장국");
  }
}

export { Food, sundaeSoop, SoopForHangingOver };
