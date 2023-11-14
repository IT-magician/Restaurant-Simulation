import { Food, sundaeSoop, SoopForHangingOver } from "./food.js";

/**
 * OrderManger는 1:1, 1:N 모두가 될 수 있음. 1:1은 자기자신, 1:N인 경우는 메인-워커쓰레드처럼 자기 자신이 로드밸런서 역할을 하는 것으로 설계했음.
 */
class OrderManager {
  #orderList = [];
  #waitingCookers = [];
  #displayDrawerFunc;
  #waitingWaiters = [];

  testCount = 0;

  #uuid = 1;

  constructor(waitingCookers, waitingWaiters, displayDrawerFunc) {
    if (waitingCookers.length == 0 || waitingWaiters.length == 0)
      throw new Error("각각의 요리사나 웨이터는 한명 이상이어야합니다.");

    this.#waitingCookers = waitingCookers;
    this.#waitingWaiters = waitingWaiters;
    this.#displayDrawerFunc = displayDrawerFunc;
  }

  update(uuid, orderInfo, progressStatusName) {
    const result = !this.#orderList.find((item) => item.orderNumber === uuid);
    if (result) {
      orderInfo.statusName = progressStatusName + "";
      this.#orderList.push(orderInfo);
    }

    console.log("수정전 : ", this.#orderList);

    console.log("수정후 : ", this.#orderList);
    return;
    // if (targetIndex > -1) {
    //   this.#orderList[targetIndex].statusName = Date.now();
    // }
    // for (let index = 0; index < this.#orderList.length; index++) {
    //   if (this.#orderList[index].orderNumber === uuid) {
    //     console.log(
    //       index,
    //       "----------",
    //       this.#orderList[index].orderNumber === uuid
    //     );
    //     console.log("수정할 대상 : ", this.#orderList);
    //     this.#orderList[index].statusName = progressStatusName;
    //     console.log("수정한 대상 : ", this.#orderList[index]);
    //     console.log("수정한 결과 : ", this.#orderList);
    //     break;
    //   }
    // }
    // this.#displayDrawerFunc(this.#orderList, progressStatusName, idx);
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

    this.#orderList = this.#orderList.filter(
      (item) => item.orderNumber !== orderUniqueNumber
    );

    return removedItem;
  }

  /**
   *
   * @param {Food} food
   * @returns 주문번호
   */
  // /*virtual */ append(food) {
  //   let uuid = this.#generateUUID();

  //   let orderInfo = {
  //     food,
  //     orderNumber: uuid,
  //     statusName: null,
  //   };
  //   this.update(uuid, orderInfo, "대기중");
  //   // console.log(this.testCount);
  //   // this.testCount = 0;
  //   return;
  //   const waitingCooker = async function (staff) {
  //     let result = null;
  //     const maxWatchTime = 1000 * 3600; // 1hour
  //     let watchTime = 0;
  //     let interval = 100;

  //     await new Promise((resolve, reject) => {
  //       const checker = window.setInterval(() => {
  //         watchTime += interval;
  //         if (interval >= maxWatchTime) clearInterval(checker);

  //         if (staff.length > 0) {
  //           clearInterval(checker);
  //           resolve(staff.shift());
  //         }
  //       }, interval);
  //     }).then((_staff) => {
  //       result = _staff;
  //     });

  //     return result;
  //   };

  //   new Promise(async (resolve, reject) => {
  //     let cooker = await waitingCooker(this.#waitingCookers);

  //     cooker.setProgressWaitingTime(
  //       cooker.getProgressLevel("요리중"),
  //       food.getRequiredCookTime()
  //     );

  //     if (cooker.getCurrentProgressLevel() > 0) cooker.resetProgress();

  //     // /// 데이터 변경 + Dom트리에 요리중으로 수정
  //     // await this.update(uuid, "요리중");

  //     // // 요리사 queue에서 꺼내와서 일시켜 + 동기화 진행
  //     // for (
  //     //   let progressLevel = 1;
  //     //   progressLevel <= cooker.getMaxProgressLevel();
  //     //   progressLevel++
  //     // ) {
  //     //   await cooker.doCurrentProgress();
  //     // }

  //     // /// 데이터 변경 + Dom트리에 요리중으로 수정
  //     // this.update(uuid, "대기중");

  //     // // 일끝났으면 다시 queue에 집어넣어
  //     // this.#waitingCookers.push(cooker);

  //     // resolve();
  //   }).then(async () => {
  //     let waiter = await waitingCooker(this.#waitingWaiters);

  //     if (waiter.getCurrentProgressLevel() > 0) waiter.resetProgress();

  //     /// 데이터 변경 + Dom트리에 요리중으로 수정
  //     this.update(uuid, "서빙중");

  //     for (
  //       let progressLevel = 1;
  //       progressLevel <= waiter.getMaxProgressLevel();
  //       progressLevel++
  //     ) {
  //       await waiter.doCurrentProgress();
  //     }

  //     // 일끝났으면 다시 queue에 집어넣어
  //     this.#waitingWaiters.push(waiter);

  //     this.pop(uuid);
  //     this.update(uuid, "서빙완료");
  //   });

  //   return uuid;
  // }

  #search(orderNumber) {
    let idx = 0;
    for (let orderInfo of this.#orderList) {
      if (orderInfo.orderNumber === orderNumber) return idx;
    }

    return -1;
  }

  #update(orderNumber, statusName) {
    console.log(
      "update 함수 = 수정전 : ",
      this.#orderList,
      this.#orderList.length + "개 ",
      orderNumber,
      statusName
    );

    let idx = this.#search(orderNumber);
    if (idx > -1) {
      this.#orderList[idx].statusName = statusName;
    }

    console.log(
      "update 함수 = 수정후 : ",
      this.#orderList,
      this.#orderList.length + "개 ",
      orderNumber,
      statusName
    );
  }

  append(food) {
    // let uuid = this.#generateUUID();
    let uuid = this.#generateUUID();

    this.#orderList.push({
      food,
      orderNumber: uuid,
      statusName: null,
    });
    this.#update(uuid, "대기중");

    console.log("수정전 : ", this.#orderList, this.#orderList.length);

    console.log("수정후 : ", this.#orderList, this.#orderList.length);
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
  /*virtual*/
  #generateUUID() {
    return this.#uuid++;
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
    this.#orderManager.append(food);
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
