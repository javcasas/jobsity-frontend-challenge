import { TodoModel } from 'app/models';
import { ReminderModel } from 'app/models/ReminderModel';

export interface RootState {
  todos: RootState.TodoState;
  reminders: ReminderState;
  router?: any;
}

export interface ReminderState {
  reminders: ReminderModel[];
  nextId: number;
}

export namespace RootState {
  export type TodoState = TodoModel[];
}
