import { Food, sundaeSoop, SoopForHangingOver } from "./food.js";

/**
 * OrderManger는 1:1, 1:N 모두가 될 수 있음. 1:1은 자기자신, 1:N인 경우는 메인-워커쓰레드처럼 자기 자신이 로드밸런서 역할을 하는 것으로 설계했음.
 */
class OrderManager {
  #orderList = [];
  #waitingCookers = [];
  #waitingWaiters = [];

  constructor(waitingCookers, waitingWaiters) {
    if (waitingCookers.length == 0 || waitingWaiters.length == 0)
      throw new Error("각각의 요리사나 웨이터는 한명 이상이어야합니다.");

    this.#waitingCookers = waitingCookers;
    this.#waitingWaiters = waitingWaiters;
  }

  #update(uuid, progressStatusName) {
    const idx = this.#orderList.findIndex((item) => item.orderNumber === uuid);

    if (idx === -1) return;
    this.#orderList[idx].statusName = progressStatusName;
    console.log(uuid, this.#orderList[idx]);
  }

  /**
   *
   * @param {int} orderUniqueNumber
   */
  /*virtual */ pop(orderUniqueNumber) {
    let removedItemIdx = this.#orderList.findIndex(
      (item) => item.orderNumber === orderUniqueNumber
    );

    if (removedItemIdx === -1) return null;

    let removedItem = this.#orderList[removedItemIdx];

    console.log("aa", this.#orderList);
    this.#orderList.slice(removedItemIdx, 1);
    console.log("bb", this.#orderList);

    // Dom 트리에서 제거

    return removedItem;
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
    };
    this.#orderList.push(orderInfo);
    this.#update(uuid, "대기");

    const waitingCooker = async function (staff) {
      let result = null;
      const maxWatchTime = 1000 * 3600; // 1hour
      let watchTime = 0;
      let interval = 100;

      await new Promise((resolve, reject) => {
        const checker = window.setInterval(() => {
          watchTime += interval;
          if (interval >= maxWatchTime) clearInterval(checker);

          if (staff.length > 0) {
            clearInterval(checker);
            resolve(staff.shift());
          }
        }, interval);
      }).then((_staff) => {
        result = _staff;
      });

      return result;
    };

    new Promise(async (resolve, reject) => {
      let cooker = await waitingCooker(this.#waitingCookers);

      cooker.setProgressWaitingTime(
        cooker.getProgressLevel("요리중"),
        food.getRequiredCookTime()
      );

      if (cooker.getCurrentProgressLevel() > 0) cooker.resetProgress();

      /// 데이터 변경 + Dom트리에 요리중으로 수정
      this.#update(uuid, "요리중");

      // 요리사 queue에서 꺼내와서 일시켜 + 동기화 진행
      for (
        let progressLevel = 1;
        progressLevel <= cooker.getMaxProgressLevel();
        progressLevel++
      ) {
        await cooker.doCurrentProgress();
      }

      /// Dom트리에 요리중으로 수정
      this.#update(uuid, "요리완료");

      // 일끝났으면 다시 queue에 집어넣어
      this.#waitingCookers.push(cooker);

      resolve();
    }).then(async () => {
      let waiter = await waitingCooker(this.#waitingWaiters);

      if (waiter.getCurrentProgressLevel() > 0) waiter.resetProgress();

      /// 데이터 변경 + Dom트리에 요리중으로 수정
      this.#update(uuid, "서빙중");

      for (
        let progressLevel = 1;
        progressLevel <= waiter.getMaxProgressLevel();
        progressLevel++
      ) {
        await waiter.doCurrentProgress();
      }

      // 일끝났으면 다시 queue에 집어넣어
      this.#waitingWaiters.push(waiter);

      this.pop(uuid);
      this.#update(uuid, "서빙완료");
      console.log(this.#orderList);
    });

    return uuid;
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
    this.#orderManager = orderManager;
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
