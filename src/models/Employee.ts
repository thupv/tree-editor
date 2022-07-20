export interface IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];
  supervisor: IEmployee | undefined;

  changeSupervisor(supervisor: IEmployee): void;
  addSubordinate(subordinate: IEmployee): void;
  removeSubordinate(subordinate: IEmployee): void;
}

export class Employee implements IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];
  supervisor: IEmployee | undefined;

  constructor(
    uniqueId: number,
    name: string,
    subordinates: IEmployee[] = [],
    supervisor: IEmployee | undefined = undefined
  ) {
    this.uniqueId = uniqueId;
    this.name = name;
    this.subordinates = subordinates;
    this.supervisor = supervisor;
    this.supervisor?.addSubordinate(this);
  }

  addSubordinate(subordinate: IEmployee): void {
    const existSubordinatesIdx = this.subordinates.indexOf(subordinate);
    if (existSubordinatesIdx > -1) {
      throw Error("Subordinate already exists");
    }
    this.subordinates.push(subordinate);
    subordinate.supervisor = this;
  }

  removeSubordinate(subordinate: IEmployee): void {
    const existSubordinatesIdx = this.subordinates.indexOf(subordinate);
    if (existSubordinatesIdx === -1) {
      throw Error("Subordinate not found");
    }
    this.subordinates.splice(existSubordinatesIdx, 1);
    subordinate.supervisor = undefined;
  }

  /*
  * This method is used to change supervisor of an employee.
  * New supervisor of exist employee subordinate is old employee supervisor.
  */

  changeSupervisor(supervisor: IEmployee): void {
    for (let i = 0; i < this.subordinates.length; i++) {
      this.supervisor?.addSubordinate(this.subordinates[i]);
    }
    this.supervisor?.removeSubordinate(this);
    this.subordinates = [];
    supervisor.addSubordinate(this);
  }
}
