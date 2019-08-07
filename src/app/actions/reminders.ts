import { ReminderModel } from 'app/models';

export interface AddReminder {
  type: "ADD_REMINDER";
  reminder: ReminderModel;
}

export interface UpdateReminder {
  type: "UPDATE_REMINDER";
  updated: ReminderModel;
}

export interface DeleteReminder {
  type: "DELETE_REMINDER";
  deleted: ReminderModel;
}

export type ReminderAction = AddReminder | UpdateReminder | DeleteReminder;
