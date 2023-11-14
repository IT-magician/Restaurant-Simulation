// import { Food, sundaeSoop, SoopForHangingOver } from "./food.js";

/**
 * OrderManger는 1:1, 1:N 모두가 될 수 있음. 1:1은 자기자신, 1:N인 경우는 메인-워커쓰레드처럼 자기 자신이 로드밸런서 역할을 하는 것으로 설계했음.
 */
class OrderManager {
  #orderList = [];

  /**
   *
   * @param {Food} food
   * @returns 주문번호
   */
  /*virtual */ append(food) {
    const uuid = this.#generateUUID();

    this.#orderList.append({
      food,
      orderNumber: uuid,
      statusName: "대기",
    });

    return uuid;
  }

  /**
   *
   * @param {int} orderUniqueNumber
   */
  /*virtual */ pop(orderUniqueNumber) {
    const removedItemIdx = this.#orderList.findIndex(
      (item) => item.orderNumber === orderUniqueNumber
    );

    if (removedItemIdx === -1) return null;

    const removedItem = this.#orderList[removedItem];

    this.#orderList.remove(removedItemIdx);

    return removedItem;
  }

  /**
   *
   * @param {int} orderUniqueNumber
   * @param {string} statusName
   */
  setProgressStatus(orderUniqueNumber, statusName) {
    this.#orderList.find(
      (item) => item.orderNumber === orderUniqueNumber
    ).statusName = statusName;
  }

  /*virtual*/ #generateUUID() {
    let uuid = 1;

    return uuid++;
  }
}

class GeneralModelOfOrderManager extends OrderManager {}
class MainThreadOfOrderManagerModel extends OrderManager {} // cooming soon!
class WorkerThreadOfOrderManagerModel extends OrderManager {} // cooming soon!

class Kiosk {
  #orderManager;

  /**
   *
   * @param {OrderManager} orderManager
   */
  constructor(orderManager) {
    this.orderManager = orderManager;
  }

  orderSundaeSoop() {
    return this.#order(new sundaeSoop());
  }

  orderSundaeSoop() {
    return this.#order(new SoopForHangingOver());
  }

  /**
   *
   * @param {Food} food
   * @returns
   */
  #order(food) {
    return this.#orderManager.append(food);
  }

  /**
   *
   * @param {int} orderUniqueNumber
   * @returns
   */
  cancel(orderUniqueNumber) {
    return this.#orderManager.pop(orderUniqueNumber);
  }
}

export { GeneralModelOfOrderManager, Kiosk };
