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

console.log(orderListBtns);

orderListBtns.addEventListener("click", (e) => {
  const element = e.currentTarget;

  console.log(element);
});
