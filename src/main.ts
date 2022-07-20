import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import AppState, { EmployeeOrgApp } from "@/models/EmployeeOrgApp";
import { Employee } from "@/models/Employee";

/* FOR DEVELOPMENT ONLY */
const ceo = new Employee(0, "ceo", [], undefined);
const emp1 = new Employee(1, "emp1", [], ceo);
const emp2 = new Employee(2, "emp2", [], ceo);
const emp3 = new Employee(3, "emp3", [], ceo);
const emp4 = new Employee(4, "emp4", [], ceo);
const emp5 = new Employee(5, "emp5", [], ceo);
const emp6 = new Employee(6, "emp6", [], ceo);

const emp11 = new Employee(11, "emp11", [], emp1);
const emp12 = new Employee(12, "emp12", [], emp1);

const emp111 = new Employee(111, "emp111", [], emp11);
const emp112 = new Employee(112, "emp112", [], emp11);

const emp1111 = new Employee(1111, "emp1111", [], emp111);
const emp1121 = new Employee(1121, "emp1121", [], emp112);

const emp61 = new Employee(61, "emp61", [], emp6);
const emp62 = new Employee(62, "emp62", [], emp6);
const emp63 = new Employee(63, "emp62", [], emp6);
const emp64 = new Employee(64, "emp62", [], emp6);
/* FOR DEVELOPMENT ONLY */


const appModel = new EmployeeOrgApp(ceo);
const app = createApp(App);

app.use(AppState, {
  store: appModel,
});
app.mount("#app");
