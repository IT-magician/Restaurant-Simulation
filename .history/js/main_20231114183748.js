import {
  GeneralModelOfOrderManager,
  Kiosk,
} from "./MachinesOfManaingeStore.js";
import { Cooker, Waiter } from "./staff.js";

const cookers = [new Cooker(), new Cooker()];
const waiters = [new Waiter(1), new Waiter(2)];
const orderManager = new GeneralModelOfOrderManager(cookers, waiters);
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

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, 3000));

async function test() {
  console.log("aa");
  await sleep(3000);
  console.log("bb");
}

test();
