import {
  GeneralModelOfOrderManager,
  Kiosk,
} from "./MachinesOfManaingeStore.js";
import { Cooker, Waiter } from "./staff.js";

const cookers = [new Cooker(), new Cooker()];
const waiters = [new Waiter(1), new Waiter(2)];
const orderManager = new GeneralModelOfOrderManager();
const kiosk = new Kiosk(orderManager);

const kioskElement = document.querySelector(".kiosk");
const orderListBtns = kioskElement.querySelector(".order");

orderListBtns.addEventListener("click", (e) => {
  const element = e.target.parentNode.querySelector("input[type=button]");
  const orderFoodName = element.value;

  console.log(element, orderFoodName);
});
