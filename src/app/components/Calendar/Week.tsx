import * as React from 'react';
import Day from './Day';
import { Moment } from 'moment';

export interface Element {
  date: Moment;
  element: React.ReactNode;
}

interface Props {
  firstDay: Moment;  // First day of the week
  today: Moment;
  currentMonth: Moment;
  elements: Element[];
}

export const Week : React.SFC<Props> = ({firstDay, today, currentMonth, elements}) => {
  const days = [0, 1, 2, 3, 4, 5, 6].map(d => firstDay.clone().add(d, 'days'))
  const thisMonth = currentMonth.format("YYYY MMMM")

  return (<tr>
    {days.map(d => {
      const dayElements = elements
          .filter(e => d.isBefore(e.date) && d.clone().add(1, 'days').isAfter(e.date))
          .sort((a, b) => a.date.isBefore(b.date) ? -1 : 1);
      return <Day
        key={d.format()}
        date={d}
        notThisMonth={d.format("YYYY MMMM") !== thisMonth}
        isToday={d.isBefore(today) && d.clone().add(1, 'days').isAfter(today)}
        >
        {dayElements.map(e => e.element)}
      </Day>
    })}
  </tr>)
}

export default Week
