import { Food, sundaeSoop, SoopForHangingOver } from "./food.js";

/**
 * OrderManger는 1:1, 1:N 모두가 될 수 있음. 1:1은 자기자신, 1:N인 경우는 메인-워커쓰레드처럼 자기 자신이 로드밸런서 역할을 하는 것으로 설계했음.
 */
class OrderManager {
  #orderList = [];
  #waitingCookers = [];
  #waitingWaiters = [];

  constructor(waitingCookers, waitingWaiters) {
    this.#waitingCookers = waitingCookers;
    this.#waitingWaiters = waitingWaiters;
  }

  #update(uuid, progressStatusName) {
    const idx = this.#orderList.findIndex((item) => item.orderNumber === uuid);

    if (idx === -1) return;
    this.#orderList[idx].statusName = progressStatusName;
  }

  /**
   *
   * @param {Food} food
   * @returns 주문번호
   */
  /*virtual */ append(food) {
    const uuid = this.#generateUUID();

    let orderInfo = {
      food,
      orderNumber: uuid,
      statusName: "대기",
    };
    this.#orderList.append(orderInfo);

    new Promise(async function (resolve, reject) {
      /// race condition 문제 어케 해결하징..? => 일단 패스
      while (this.#waitingCookers.length === 0);
      cooker = this.#waitingCookers.shift();

      if (cooker.getCurrentProgressLevel() > 0) cooker.resetProgress();

      // 요리사 queue에서 꺼내와서 일시켜 + 동기화 진행
      for (
        let progressLevel = 1;
        progressLevel <= cooker.getMaxProgressLevel();
        progressLevel++
      ) {
        await cooker.doCurrentProgress();
      }

      // 일끝났으면 다시 queue에 집어넣어
      this.#waitingCookers.append(cooker);
    }).then(async () => {
      /// race condition 문제 어케 해결하징..? => 일단 패스
      while (this.#waitingWaiters.length === 0);
      waiter = this.#waitingWaiters.shift();

      if (waiter.getCurrentProgressLevel() > 0) waiter.resetProgress();

      // 웨이터 queue에서 꺼내와서 일시켜 + 동기화 진행
      for (
        let progressLevel = 1;
        progressLevel <= waiter.getMaxProgressLevel();
        progressLevel++
      ) {
        await waiter.doCurrentProgress();
      }

      // 일끝났으면 다시 queue에 집어넣어
      this.#waitingWaiters.append(waiter);
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

  orderSoopForHangingOver() {
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
