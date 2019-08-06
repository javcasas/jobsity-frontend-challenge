import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';
//import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { ReminderModel } from 'app/models/ReminderModel';
import { ReminderAction } from 'app/actions/reminders';
//import { omit } from 'app/utils';
//import { Header, TodoList, Footer } from 'app/components';
import Week from 'app/components/Calendar/Week';
import ReminderInCalendar from 'app/components/ReminderInCalendar';
import ReminderForm from 'app/components/ReminderForm';
import { utc } from 'moment'

interface StateProps {
  reminders: ReminderModel[]
}
interface DispatchProps {
  createReminder: (r: ReminderModel) => any;
  updateReminder: (r: ReminderModel) => any;
}

type Props = StateProps & DispatchProps
//type Dispatch = (action: ReminderAction) => any;

type State = {
  type: "VIEW_MONTH"
} | {
  type: "CREATE_NEW_REMINDER"
} | {
  type: "EDIT_REMINDER",
  reminder: ReminderModel
}


@connect(
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
)

export class Calendar extends React.Component<Props, State> {

  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = { type: "VIEW_MONTH" }
//    this.handleClearCompleted = this.handleClearCompleted.bind(this);
//    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  startNewReminder = () => {
    this.setState({type: "CREATE_NEW_REMINDER" });
  }

  editReminder = (r: ReminderModel) => {
    this.setState({type: "EDIT_REMINDER", reminder: r });
  }

  saveNewReminder = (r: ReminderModel) => {
    this.props.createReminder(r);
    this.setState({type: "VIEW_MONTH" });
  }

  updateReminder = (r: ReminderModel) => {
    this.props.updateReminder(r);
    this.setState({type: "VIEW_MONTH" });
  }

  cancelEditingReminder = () => {
    this.setState({type: "VIEW_MONTH" });
  }
  
  reminderEditor = () => {
    if(this.state.type === "CREATE_NEW_REMINDER") {
      return <ReminderForm
                title="Create new reminder"
                saveText="Save new reminder"
                onCreate={this.saveNewReminder}
                onCancel={this.cancelEditingReminder}
              />
    } else if (this.state.type === "EDIT_REMINDER") {
      return <ReminderForm
                title="Edit reminder"
                saveText="Update reminder"
                onCreate={this.updateReminder}
                onCancel={this.cancelEditingReminder}
                initialReminder={this.state.reminder}
                />
    } else {
      return <button onClick={this.startNewReminder}>Create new reminder</button>}
  }

  render() {
    const firstDayOfFirstWeek = utc().date(1).day(0).hour(0).minute(0).seconds(0)
    const today = utc()
    const weeks = [0, 7, 14, 21, 28].map(start => utc(firstDayOfFirstWeek).add(start, "days"));
    const reminders = this.props.reminders.map(r => {
      return {
        date: r.date,
        element: <ReminderInCalendar
                  date={r.date}
                  text={r.text}
                  color={r.color}
                  city={r.city}
                  onClick={() => this.editReminder(r)}
                  />
      }
    });

    return (
      <>
        { this.reminderEditor() }
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          { weeks.map(weekStart =>
              <Week
                key={weekStart.format()}
                firstDay={weekStart}
                today={today}
                elements={reminders}
                />)
          }
        </tbody>
      </table>
      </>
    );
  }
}
