import {
  GeneralModelOfOrderManager,
  Kiosk,
} from "./MachinesOfManaingeStore.js";
import { Cooker, Waiter } from "./staff.js";
import { sundaeSoop } from "./food.js";

function displayDrawerFunc(orderInfoList) {
  let orderWaitingTrHTML = "";
  let orderCookingTrHTML = "";
  let orderServingTrHTML = "";

  const len = orderInfoList.length;
  for (let i = 0; i < len; i++) {
    const orderInfo = orderInfoList[i];

    const tr = `<div class="order-display-item" style="display: flex;justify-content: space-evenly;">
                    <div>${orderInfo.food.getFoodName()}</div>
                    <div>주문${orderInfo.orderNumber}</div>
                    <div>${orderInfo.statusName}</div>
                </div>`;

    switch (orderInfo.statusName) {
      // case "대기중":
      default:
        console.log("대기중인 주문 : ", orderInfo);
        orderWaitingTrHTML += tr;
        break;
      case "요리중":
        orderCookingTrHTML += tr;
        break;
      case "서빙중":
        orderServingTrHTML += tr;
        break;
    }
  }

  document.querySelector(".order-display > .item #waiting").innerHTML =
    orderWaitingTrHTML;
  document.querySelector(".order-display > .item #cooking").innerHTML =
    orderCookingTrHTML;
  document.querySelector(".order-display > .item #serving").innerHTML =
    orderServingTrHTML;

  // console.log(
  //   "\n__________________________\norderWaitingTrHTML",
  //   orderWaitingTrHTML,
  //   "\n__________________________\norderCookingTrHTML",
  //   orderCookingTrHTML,
  //   "\n__________________________\norderServingTrHTML",
  //   orderServingTrHTML
  // );
  // console.log(" ");
  // console.log(" ");
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
