import { ReminderState } from './state';
import { ReminderModel, Color } from '../../app/models/ReminderModel';
import { reminderReducer } from './reminders';
import { utc } from 'moment'

describe("reminderReducer", () => {
  const reminder : ReminderModel = {
    id: 0,
    text: "A reminder",
    city: "London, UK",
    date: utc(),
    color: Color.Red
  }

  it("action: ADD_REMINDER", () => {
    expect(
      reminderReducer(undefined, {type: "ADD_REMINDER", reminder})
    ).toStrictEqual({
      nextId: 2,
      reminders: [
        {...reminder, id: 1}
      ]
    });
  })

  it("action: UPDATE_REMINDER", () => {
    const prevState : ReminderState = {
      nextId: 2,
      reminders: [{...reminder, id: 1}]
    }
    expect(
      reminderReducer(
        prevState, 
        { 
          type: "UPDATE_REMINDER",
          updated: {...reminder, id: 1, text: "Updated text"}
        })
    ).toStrictEqual({
      nextId: 2,
      reminders: [
        {...reminder, id: 1, text: "Updated text"}
      ]
    });
  })
  it("action: DELETE_REMINDER", () => {
    const prevState : ReminderState = {
      nextId: 2,
      reminders: [{...reminder, id: 1}]
    }
    expect(
      reminderReducer(
        prevState, 
        { 
          type: "DELETE_REMINDER",
          deleted: {...reminder, id: 1}
        })
    ).toStrictEqual({
      nextId: 2,
      reminders: []
    });
  })
})
