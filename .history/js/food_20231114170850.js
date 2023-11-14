class Food {
  #name;
  #cookTime;
  #origin = "대전광역시";

  constructor(name, cookTime) {
    this.#name = name;
    this.#cookTime = cookTime;
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
