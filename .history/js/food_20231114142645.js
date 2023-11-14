class Food {
  #name;
  #orderUniqueNumber = generateUUID();
  #progressName = "대기";

  static #uniqueNumber = 1;
  static #generateUUID() {
    return this.#uniqueNumber++;
  }

  constructor(name) {
    this.#name = name;
  }

  setProgressName(name) {
    this.#progressName = name;
  }
}
