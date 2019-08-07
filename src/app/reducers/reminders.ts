import { ReminderState } from './state';
import { ReminderAction } from 'app/actions/reminders';

const initialState: ReminderState = {
    nextId: 1,
    reminders: [],
  };

function completityCheck(action: never, state: ReminderState) : ReminderState {
  return state;
}

export function reminderReducer(state=initialState, action:ReminderAction)  : ReminderState {
  if (action.type === "ADD_REMINDER") {
    const newReminder = {...action.reminder, id: state.nextId};
    return {
      reminders: [...state.reminders, newReminder],
      nextId: state.nextId + 1
    }
  } else if (action.type === "UPDATE_REMINDER") {
    return {
      reminders: state.reminders.map(r => r.id === action.updated.id ? action.updated : r),
      nextId: state.nextId
    }
  } else if (action.type === "DELETE_REMINDER") {
    return {
      reminders: state.reminders.filter(r => r.id !== action.deleted.id),
      nextId: state.nextId
    }
  } else {
    return completityCheck(action, state);
  }
}
