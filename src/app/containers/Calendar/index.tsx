import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'app/reducers';
import { ReminderModel } from 'app/models/ReminderModel';
import { ReminderAction } from 'app/actions/reminders';
import { Month } from 'app/components/Calendar/Month';
import ReminderInCalendar from 'app/components/ReminderInCalendar';
import { fetchForecast } from 'app/components/ReminderInCalendar/OpenWeatherMapApi';
import ReminderForm from 'app/components/ReminderForm';
import { utc, Moment } from 'moment'

interface StateProps {
  reminders: ReminderModel[];
  date?: Moment;
}
interface DispatchProps {
  createReminder: (r: ReminderModel) => any;
  updateReminder: (r: ReminderModel) => any;
}

export type Props = StateProps & DispatchProps

interface ViewMonth {
  type: "VIEW_MONTH"
}
interface CreateNewReminder {
  type: "CREATE_NEW_REMINDER"
}
interface EditReminder {
  type: "EDIT_REMINDER",
  reminder: ReminderModel
}

interface State {
  state: ViewMonth | CreateNewReminder | EditReminder;
  apiKey: string;
}

export class Calendar extends React.Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      state: { type: "VIEW_MONTH" },
      apiKey: "",
    }
  }

  startNewReminder = () => {
    this.setState({state: {type: "CREATE_NEW_REMINDER" }});
  }

  editReminder = (r: ReminderModel) => {
    this.setState({state: {type: "EDIT_REMINDER", reminder: r }});
  }

  saveNewReminder = (r: ReminderModel) => {
    this.props.createReminder(r);
    this.setState({state: {type: "VIEW_MONTH" }});
  }

  updateReminder = (r: ReminderModel) => {
    this.props.updateReminder(r);
    this.setState({state: {type: "VIEW_MONTH" }});
  }

  cancelEditingReminder = () => {
    this.setState({state: {type: "VIEW_MONTH" }});
  }

  setAPIKey = (apiKey: string) => this.setState({apiKey})
  
  reminderEditor = () => {
    if(this.state.state.type === "CREATE_NEW_REMINDER") {
      return <ReminderForm
                title="Create new reminder"
                saveText="Save new reminder"
                onCreate={this.saveNewReminder}
                onCancel={this.cancelEditingReminder}
                initialDate={this.props.date}
              />
    } else if (this.state.state.type === "EDIT_REMINDER") {
      return <ReminderForm
                title="Edit reminder"
                saveText="Update reminder"
                onCreate={this.updateReminder}
                onCancel={this.cancelEditingReminder}
                initialReminder={this.state.state.reminder}
                />
    } else {
      return null
    }
  }

  render() {
    const today = this.props.date || utc()
    const reminders = this.props.reminders.map(r => {
      return {
        date: r.date,
        element: <ReminderInCalendar
                  date={r.date}
                  text={r.text}
                  color={r.color}
                  city={r.city}
                  onClick={() => this.editReminder(r)}
                  fetchForecast={fetchForecast(this.state.apiKey)}
                  />
      }
    });

    return (
      <>
        { this.reminderEditor() }
        <Month
          today={today}
          elements={reminders} />
        <button className="create-reminder" onClick={this.startNewReminder}>
          Create new reminder
        </button>
        <label htmlFor="api_key">API key</label>
        <input type="text" id="api_key" onChange={e => this.setAPIKey(e.target.value)} />
      </>
    );
  }
}

export const ConnectedCalendar = connect(
  function mapStateToProps(state: RootState): StateProps {
    return {
      reminders: state.reminders.reminders
    }
  },
  function mapDispatchToProps(dispatch: Dispatch<ReminderAction>): DispatchProps {
    return {
      createReminder: (r: ReminderModel) => dispatch({
        type: "ADD_REMINDER",
        reminder: r
      }),
      updateReminder: (r: ReminderModel) => dispatch({
        type: "UPDATE_REMINDER",
        updated: r
      })
    }
  }
)(Calendar);
