import { createAction } from 'redux-actions';
import { ReminderModel } from 'app/models';

export type ReminderAction = {
  type: "ADD_REMINDER",
  reminder: ReminderModel,
} | {
  type: "UPDATE_REMINDER",
  id: number,
  updated: ReminderModel
}
