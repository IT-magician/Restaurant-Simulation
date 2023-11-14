import { GeneralModelOfOrderManager, Kiosk } from "./MachinesOfManaingeStore";
import { Cooker, Waiter } from "./staff";

const cookers = [new Cooker(), new Cooker()];
const waiters = [new Waiter(1), new Waiter()];
const orderManager = new GeneralModelOfOrderManager();
const kiosk = new Kiosk(orderManager);
