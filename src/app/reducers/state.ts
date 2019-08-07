import { ReminderModel } from 'app/models/ReminderModel';

export interface RootState {
  reminders: ReminderState;
  router?: any;
}

export interface ReminderState {
  reminders: ReminderModel[];
  nextId: number;
}
