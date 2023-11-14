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

  for (let orderInfo of orderInfoList) {
    console.log(orderInfo, name);

    const tr = `<div class="order-display-item">
                    <div>${orderInfo.food.getFoodName()}</div>
                    <div>${orderInfo.orderNumber}</div>
                    <div>${orderInfo.statusName}</div>
                </div>`;

    switch (orderInfo.statusName) {
      case "대기중":
        orderWaitingTrHTML += tr;
        break;
      case "요리중":
        orderCookingTrHTML += tr;
        break;
      case "서빙중":
        orderServingTrHTML += tr;
        break;
    }

    document.querySelector(".order-display > .item #waiting").innerHTML =
      orderWaitingTrHTML;
    document.querySelector(".order-display > .item #cooking").innerHTML =
      orderCookingTrHTML;
    document.querySelector(".order-display > .item #serving").innerHTML =
      orderServingTrHTML;

    console.log(orderWaitingTrHTML);
    console.log(orderCookingTrHTML);
    console.log(orderServingTrHTML);
  }
}

const cookers = [new Cooker(), new Cooker()];
const waiters = [new Waiter(1), new Waiter(2)];
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
