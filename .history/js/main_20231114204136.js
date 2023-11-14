import {
  GeneralModelOfOrderManager,
  Kiosk,
} from "./MachinesOfManaingeStore.js";
import { Cooker, Waiter } from "./staff.js";

function displayDrawerFunc(orderInfoList, name = null) {
  console.log("------------------");
  console.log(name, orderInfoList);
  console.log("------------------");
  let orderWaitingTrHTML = "";
  let orderCookingTrHTML = "";
  let orderServingTrHTML = "";
  let cnt = 0;

  // orderInfoList.forEach((orderInfo) => {
  //   const tr = `<div class="order-display-item" style="display: flex;justify-content: space-evenly;">
  //                   <div>${orderInfo.food.getFoodName()}</div>
  //                   <div>${orderInfo.orderNumber}</div>
  //                   <div>${orderInfo.statusName}</div>
  //               </div>`;

  //   switch (orderInfo.statusName) {
  //     case "대기중":
  //       console.log("대기중인 주문 : ", orderInfo);
  //       orderWaitingTrHTML += tr;
  //       cnt++;
  //       break;
  //     case "요리중":
  //       orderCookingTrHTML += tr;
  //       break;
  //     case "서빙중":
  //       orderServingTrHTML += tr;
  //       break;
  //   }
  //   cnt++;
  // });

  console.log(orderInfoList.filter((item) => item.statusName === "대기중"));

  document.querySelector(".order-display > .item #waiting").innerHTML =
    orderWaitingTrHTML;
  document.querySelector(".order-display > .item #cooking").innerHTML =
    orderCookingTrHTML;
  document.querySelector(".order-display > .item #serving").innerHTML =
    orderServingTrHTML;

  console.log(
    "orderWaitingTrHTML",
    orderWaitingTrHTML,
    "\n__________________________\norderCookingTrHTML",
    orderCookingTrHTML,
    "\n__________________________\norderServingTrHTML",
    orderServingTrHTML
  );
  console.log("cnt : ", cnt);
  console.log(" ");
  console.log(" ");
}

const cookers = [new Cooker(), new Cooker()];
const waiters = [new Waiter(1000), new Waiter(2000)];
const orderManager = new GeneralModelOfOrderManager(
  cookers,
  waiters,
  displayDrawerFunc
);
const kiosk = new Kiosk(orderManager);

const kioskElement = document.querySelector(".kiosk");
const orderListBtns = kioskElement.querySelector(".order");

orderListBtns.addEventListener("click", (e) => {
  const element = e.target.parentNode.querySelector("input[type=button]");
  const orderFoodName = element.value;

  switch (orderFoodName) {
    case "순대국":
      kiosk.orderSundaeSoop();
      break;
    case "해장국":
      kiosk.orderSoopForHangingOver();
      break;
  }
});
