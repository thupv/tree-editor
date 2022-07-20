import type { Employee, IEmployee } from "@/models/Employee";
import { Stack } from "@/core/Stack";
import { HistoryManager } from "@/core/HistoryManager";
import { reactive, watch } from "vue";
import {MoveCommand} from "@/core/commands/MoveCommand";

export interface IEmployeeOrgApp {
  ceo: IEmployee;
  move(employeeID: number, supervisorID: number): void;
  undo(): void;
  redo(): void;
  get canUndo(): boolean;
  get canRedo(): boolean;
}

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: IEmployee;
  private employeeMapByUid = new Map<number, IEmployee>();
  private historyManager = new HistoryManager();
  constructor(ceo: IEmployee) {
    this.ceo = ceo;
    this.createEmployeeMap();
  }

  /*
    Create a map of employees by uid for fast access later
   */
  private createEmployeeMap() {
    const subordinatesStack = new Stack<IEmployee>();
    subordinatesStack.push(this.ceo);
    this.employeeMapByUid.set(this.ceo.uniqueId, this.ceo);
    // Traverse the hierarchy and create a map of employees by uid
    while (subordinatesStack.size() > 0) {
      const node = subordinatesStack.pop();
      if (node!.subordinates.length > 0) {
        for (let i = 0; i < node!.subordinates.length; i++) {
          subordinatesStack.push(node!.subordinates[i]);
          this.employeeMapByUid.set(
            node!.subordinates[i]!.uniqueId,
            node!.subordinates[i]
          );
        }
      }
    }
  }

  /*
    Move an employee to a new supervisor
   */
  move(employeeID: number, supervisorID: number): void {
    this.historyManager.record(
      new MoveCommand(employeeID, supervisorID, this.employeeMapByUid)
    );
  }

  redo(): void {
    this.historyManager.redo();
  }

  undo(): void {
    this.historyManager.undo();
  }

  get canUndo(): boolean {
    return this.historyManager.canUndo;
  }

  get canRedo(): boolean {
    return this.historyManager.canRedo;
  }
}

/*
  Inject model into the app.
  Only component with $store props can access the store and reactive the data.
 */
function install(Vue: any, options: any) {
  Vue.$store = Vue.mixin({
    beforeCreate() {
      if (this.$options.props?.$store) {
        const reactiveStore = reactive({ store: options.store });
        this.$store = reactiveStore.store;
        watch(
          () => this.$store.ceo,
          (newVal: any, oldVal: any) => {
            this.$forceUpdate();
          },
          { deep: true }
        );
      }
    },
  });
}

export default {
  install,
  EmployeeOrgApp,
};
