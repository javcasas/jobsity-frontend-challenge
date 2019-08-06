import { ReminderState } from './state';
import { ReminderAction } from 'app/actions/reminders';

const initialState: ReminderState = {
    nextId: 1,
    reminders: [],
  };

export function reminderReducer(state=initialState, action:ReminderAction)  : ReminderState {
  if (action.type === "ADD_REMINDER") {
    return {
      reminders: [...state.reminders, action.reminder],
      nextId: state.nextId + 1
    }
  } else if (action.type === "UPDATE_REMINDER") {
    return {
      reminders: state.reminders.map(r => r.id === action.id ? action.updated : r),
      nextId: state.nextId
    }
  } else {
    return state;
  }
}
