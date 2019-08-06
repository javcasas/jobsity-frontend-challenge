import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';
//import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { ReminderModel, Color } from 'app/models/ReminderModel';
import { ReminderAction } from 'app/actions/reminders';
//import { omit } from 'app/utils';
//import { Header, TodoList, Footer } from 'app/components';
import Week from 'app/components/Calendar/Week';
import ReminderInCalendar from 'app/components/ReminderInCalendar';
import { utc } from 'moment'

//const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
//  (key) => TodoModel.Filter[key]
//);

//const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
//  [TodoModel.Filter.SHOW_ALL]: () => true,
//  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
//  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
//};

//export namespace App {
//  export interface Props extends RouteComponentProps<void> {
//    todos: RootState.TodoState;
//    actions: TodoActions;
//    filter: TodoModel.Filter;
//  }
//}

interface StateProps {
  reminders: ReminderModel[]
}
interface DispatchProps {
  createReminder: (r: ReminderModel) => any;
  updateReminder: (id: number, r: ReminderModel) => any;
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


interface CreateReminderFormProps {
  onCreate: (r: ReminderModel) => any;
}
class CreateReminderForm extends React.Component<CreateReminderFormProps, ReminderModel> {
  constructor(props: CreateReminderFormProps) {
    super(props);
    this.state = {
      id: 0,
      text: "",
      city: "",
      color: Color.Red,
      date: utc()
    }
  }
  render () {
    return (<form>
      <input type="text" onChange={evt => this.setState({text: evt.target.value})} value={this.state.text} />
      <button type="button" onClick={() => this.props.onCreate(this.state)}>Create reminder</button>
    </form>)
  }
}

@connect(
  function mapStateToProps(state: RootState): StateProps {
    return {
      reminders: state.reminders.reminders
    }
  },
  function mapDispatchToProps(dispatch: Dispatch<ReminderAction>): DispatchProps {
    return {
      createReminder: (r) => dispatch({
        type: "ADD_REMINDER",
        reminder: r
      }),
      updateReminder: (id, r) => dispatch({
        type: "UPDATE_REMINDER",
        id,
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

  createNewReminder = () => {
    console.log("DSAFASDF")
    this.setState({type: "CREATE_NEW_REMINDER" })
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
                  />
      }
    });

    return (
      <>
        {this.state.type === "CREATE_NEW_REMINDER" && <CreateReminderForm onCreate={this.props.createReminder} /> }
        <button onClick={this.createNewReminder}>Create new reminder</button>
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
