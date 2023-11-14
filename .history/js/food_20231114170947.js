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

  getRequiredCookTime() {
    return this.#cookTime;
  }
}

class sundaeSoop extends Food {
  constructor() {
    super("순대국", 1);
  }
}

class SoopForHangingOver extends Food {
  constructor() {
    super("해장국", 2);
  }
}

export { Food, sundaeSoop, SoopForHangingOver };
