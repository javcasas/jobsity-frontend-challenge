import * as React from 'react';
import Week, { Element } from 'app/components/Calendar/Week';
import { Moment } from 'moment'
import * as styles from './Month.css'

interface Props {
  today: Moment;
  currentMonth: Moment;
  elements: Element[];
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
}

export class Month extends React.Component<Props> {
  render() {
    const { today, elements, onNextMonth, onPrevMonth } = this.props;
    const currentMonth = this.props.currentMonth || today;
    const firstDayOfFirstWeek = currentMonth.clone().date(1).day(0).hour(0).minute(0).seconds(0)
    const weeks = [0, 7, 14, 21, 28].map(start => firstDayOfFirstWeek.clone().add(start, "days"));

    return (
      <>
        <h1 className={styles.monthName}>
          <button onClick={onPrevMonth}>&lt;</button>
          {currentMonth.format("MMMM YYYY")}
          <button onClick={onNextMonth}>&gt;</button>
        </h1>
        <table className={styles.month}>
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
                  elements={elements}
                  currentMonth={currentMonth}
                  />)
            }
          </tbody>
        </table>
      </>
    );
  }
}
