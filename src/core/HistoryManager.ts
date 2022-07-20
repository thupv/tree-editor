import { Stack } from "@/core/Stack";
import type { IEmployee } from "@/models/Employee";

export interface IHistoryManager {
  record(action: ICommand): void;
  undo(): void;
  redo(): void;
  get canUndo(): boolean;
  get canRedo(): boolean;
}
export interface ICommand {
  execute(): void;
  undo(): void;
  redo(): void;
}

export class HistoryManager implements IHistoryManager {
  private undoHistory: Stack<ICommand> = new Stack<ICommand>();
  private redoHistory: Stack<ICommand> = new Stack<ICommand>();

  record(command: ICommand) {
    command.execute();
    this.undoHistory.push(command);
    this.redoHistory.clear();
  }

  undo(): void {
    const command = this.undoHistory.pop();
    if (command === undefined) {
      throw Error("No more commands to undo");
    }
    command.undo();
    this.redoHistory.push(command);
  }

  redo(): void {
    const command = this.redoHistory.pop();
    if (command === undefined) {
      throw Error("No more commands to redo");
    }
    command.redo();
    this.undoHistory.push(command);
  }

  get canUndo(): boolean {
    return this.undoHistory.size() > 0;
  }

  get canRedo(): boolean {
    return this.redoHistory.size() > 0;
  }
}
