import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
//import { Header, TodoList, Footer } from 'app/components';
import Week from 'app/components/Calendar/Week';
import ReminderInCalendar from 'app/components/ReminderInCalendar';
import { utc } from 'moment'

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

//const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
//  [TodoModel.Filter.SHOW_ALL]: () => true,
//  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
//  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
//};

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    actions: TodoActions;
    filter: TodoModel.Filter;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'todos' | 'filter'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '');
    const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { todos: state.todos, filter };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)

export class Calendar extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    //const { todos, actions, filter } = this.props;
    //const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
    //const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
    //const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
    //
    const firstDayOfFirstWeek = utc().date(1).day(0).hour(0).minute(0).seconds(0)
    const today = utc()
    const weeks = [0, 7, 14, 21, 28].map(start => utc(firstDayOfFirstWeek).add(start, "days"));
    const reminders = [
      {
        date: utc(),
        element: <ReminderInCalendar
                  date={utc()}
                  text="asdfsdaf"
                  color="blue"
                  city="London"
                  />
      }

    ];

    return (
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
    );
  }
}
