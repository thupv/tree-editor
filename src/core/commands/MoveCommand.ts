import type {IEmployee} from "@/models/Employee";
import type {ICommand} from "@/core/HistoryManager";

export class MoveCommand implements ICommand {
  private readonly employeeId: number;
  private readonly supervisorId: number;
  private oldSupervisorId: number | undefined;
  private oldSubordinateIds: number[] = [];
  employeeMapByUuid: Map<number, IEmployee>;

  constructor(
    employeeId: number,
    supervisorId: number,
    employeeMapByUuid: Map<number, IEmployee>
  ) {
    this.employeeId = employeeId;
    this.supervisorId = supervisorId;
    this.employeeMapByUuid = employeeMapByUuid;
  }
  execute(): void {
    const employee = this.employeeMapByUuid.get(this.employeeId);
    if (employee === undefined) {
      throw Error("Employee not found");
    }
    const oldEmployeeSupervisor = employee.supervisor;
    if (oldEmployeeSupervisor === undefined) {
      throw Error("Employee has no supervisor");
    }
    const supervisor = this.employeeMapByUuid.get(this.supervisorId);
    if (supervisor === undefined) {
      throw Error("Supervisor not found");
    }
    this.oldSupervisorId = oldEmployeeSupervisor.uniqueId;

    if (this.oldSupervisorId === this.supervisorId) {
      throw Error("Employee is already under the same supervisor");
    }
    this.oldSubordinateIds = employee.subordinates.map(
      (subordinate) => subordinate.uniqueId
    );

    employee.changeSupervisor(supervisor);
  }

  redo(): void {
    this.execute();
  }

  undo(): void {
    const employee = this.employeeMapByUuid.get(this.employeeId);
    const supervisor = this.employeeMapByUuid.get(this.supervisorId);
    supervisor!.removeSubordinate(employee!);
    if (this.oldSupervisorId != null) {
      const oldSupervisor = this.employeeMapByUuid.get(this.oldSupervisorId);
      employee!.changeSupervisor(oldSupervisor!);
    }
    for (let i = 0; i < this.oldSubordinateIds.length; i++) {
      const subordinate = this.employeeMapByUuid.get(this.oldSubordinateIds[i]);
      if (subordinate === undefined) {
        throw Error("Employee not found");
      }
      subordinate.changeSupervisor(employee!);
    }
  }
}