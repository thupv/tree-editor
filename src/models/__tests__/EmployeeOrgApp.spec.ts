import { describe, it, expect } from "vitest";

import { EmployeeOrgApp } from "../EmployeeOrgApp";
import { Employee } from "../Employee";

describe("EmployeeOrgApp.spec", () => {
  it("should create employee properly", () => {
    const ceo = new Employee(1, "ceo", [], undefined);
    expect(ceo.name).toBe("ceo");
  });
  it("should create org app properly", () => {
    const ceo = new Employee(0, "ceo", [], undefined);
    const emp1 = new Employee(1, "emp1", [], ceo);
    new Employee(2, "emp2", [], ceo);
    new Employee(3, "emp3", [], ceo);
    new Employee(4, "emp4", [], ceo);
    new Employee(5, "emp5", [], ceo);
    new Employee(6, "emp6", [], ceo);
    new Employee(11, "emp11", [], emp1);
    new Employee(12, "emp12", [], emp1);
    const app = new EmployeeOrgApp(ceo);
    expect(app.ceo).toBe(ceo);
  });
  it("should move employee properly", () => {
    const ceo = new Employee(0, "ceo", [], undefined);
    const emp1 = new Employee(1, "emp1", [], ceo);
    const emp2 = new Employee(2, "emp2", [], ceo);
    const emp3 = new Employee(3, "emp3", [], ceo);
    const emp4 = new Employee(4, "emp4", [], ceo);
    const emp5 = new Employee(5, "emp5", [], ceo);
    const emp6 = new Employee(6, "emp6", [], ceo);
    const emp11 = new Employee(11, "emp11", [], emp1);
    const emp12 = new Employee(12, "emp12", [], emp1);
    const app = new EmployeeOrgApp(ceo);
    app.move(emp11.uniqueId, ceo.uniqueId);
    expect(app.ceo.subordinates.length).toBe(7);
    expect(
      app.ceo.subordinates.map((subordinate) => subordinate.uniqueId)
    ).toStrictEqual([1, 2, 3, 4, 5, 6, 11]);
  });

  // it('should move employee then undo properly', () => {
  //   const ceo = new Employee(0, "ceo", [], undefined);
  //   const emp1 = new Employee(1, "emp1", [], ceo);
  //   const emp2 = new Employee(2, "emp2", [], ceo);
  //   const emp3 = new Employee(3, "emp3", [], ceo);
  //   const emp4 = new Employee(4, "emp4", [], ceo);
  //   const emp5 = new Employee(5, "emp5", [], ceo);
  //   const emp6 = new Employee(6, "emp6", [], ceo);
  //   const emp11 = new Employee(11, "emp11", [], emp1);
  //   const emp12 = new Employee(12, "emp12", [], emp1);
  //   const app = new EmployeeOrgApp(ceo);
  //   app.move(emp11.uniqueId, ceo.uniqueId);
  //   expect(app.ceo.subordinates.length).toBe(7);
  //   app.undo();
  //   expect(app.ceo.subordinates.length).toBe(6);
  // });
  //
  // it('should move employee then undo then redo properly', () => {
  //   const ceo = new Employee(0, "ceo", [], undefined);
  //   const emp1 = new Employee(1, "emp1", [], ceo);
  //   const emp2 = new Employee(2, "emp2", [], ceo);
  //   const emp3 = new Employee(3, "emp3", [], ceo);
  //   const emp4 = new Employee(4, "emp4", [], ceo);
  //   const emp5 = new Employee(5, "emp5", [], ceo);
  //   const emp6 = new Employee(6, "emp6", [], ceo);
  //   const emp11 = new Employee(11, "emp11", [], emp1);
  //   const emp12 = new Employee(12, "emp12", [], emp1);
  //   const app = new EmployeeOrgApp(ceo);
  //   app.move(emp11.uniqueId, ceo.uniqueId);
  //   expect(app.ceo.subordinates.length).toBe(7);
  //   app.undo();
  //   expect(app.ceo.subordinates.length).toBe(6);
  //   app.redo();
  //   expect(app.ceo.subordinates.length).toBe(7);
  // });
});
