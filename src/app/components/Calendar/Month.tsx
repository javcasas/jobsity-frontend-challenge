import * as React from 'react';
import Week, { Element } from 'app/components/Calendar/Week';
import { Moment, utc } from 'moment'
import * as styles from './Month.css'

interface Props {
  today: Moment;
  currentMonth?: Moment;
  elements: Element[];
}

export class Month extends React.Component<Props> {
  render() {
    const { today, elements } = this.props;
    const currentMonth = this.props.currentMonth || today;
    const firstDayOfFirstWeek = utc(currentMonth).date(1).day(0).hour(0).minute(0).seconds(0)
    const weeks = [0, 7, 14, 21, 28].map(start => utc(firstDayOfFirstWeek).add(start, "days"));

    return (
      <>
        <h1 className={styles.monthName}>{currentMonth.format("MMMM YYYY")}</h1>
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
                  />)
            }
          </tbody>
        </table>
      </>
    );
  }
}
