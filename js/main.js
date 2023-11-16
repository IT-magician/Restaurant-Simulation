import {
  GeneralModelOfOrderManager,
  Kiosk,
} from "/js/StoreManagingMachines.js";
import { Cooker, Waiter } from "/js/staff.js";

/// _____________________________________________________________________________________
//                        Updator of Order's status view Components
/// _____________________________________________________________________________________

const $waitingListElement = document.querySelector(
  ".order-display > .item #waiting"
);
const $cookingListElement = document.querySelector(
  ".order-display > .item #cooking"
);
const $servingListElement = document.querySelector(
  ".order-display > .item #serving"
);

function displayDrawerFunc(orderInfoList) {
  let orderWaitingTrHTML = "";
  let orderCookingTrHTML = "";
  let orderServingTrHTML = "";

  const len = orderInfoList.length;
  for (let i = 0; i < len; i++) {
    const orderInfo = orderInfoList[i];

    const tr = `<div class="order-display-item">
                    <div>${orderInfo.food.getFoodName()}</div>
                    <div>주문${orderInfo.orderNumber}</div>
                    <div>${orderInfo.statusName}</div>
                </div>`;

    switch (orderInfo.statusName) {
      // case "대기중":
      default:
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

  $waitingListElement.innerHTML = orderWaitingTrHTML;
  $cookingListElement.innerHTML = orderCookingTrHTML;
  $servingListElement.innerHTML = orderServingTrHTML;
}

/// _____________________________________________________________________________________
//                                Main Logic Components
/// _____________________________________________________________________________________

const cookers = [new Cooker(), new Cooker()];
const waiters = [new Waiter(1000), new Waiter(2000)];
const orderManager = new GeneralModelOfOrderManager(
  cookers,
  waiters,
  displayDrawerFunc
);
const kiosk = new Kiosk(orderManager);

const $kioskElement = document.querySelector(".kiosk");
const $orderListBtns = $kioskElement.querySelector(".order");

$orderListBtns.addEventListener("click", (e) => {
  const $element = e.target.parentNode.querySelector("input[type=button]");
  const orderFoodName = $element.value;

  if (e.target.nodeName !== "INPUT") return;

  switch (orderFoodName) {
    case "순대국":
      kiosk.orderSundaeSoop();
      break;
    case "해장국":
      kiosk.orderSoopForHangingOver();
      break;
  }
});
