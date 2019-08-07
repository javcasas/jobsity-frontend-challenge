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
  elements: Element[];
}

export const Week : React.SFC<Props> = ({firstDay, today, elements}) => {
  const days = [0, 1, 2, 3, 4, 5, 6].map(d => firstDay.clone().add(d, 'days'))
  const thisMonth = today.format("YYYY MMMM")

  return (<tr>
    {days.map(d => 
      <Day
        key={d.format()}
        date={d}
        notThisMonth={d.format("YYYY MMMM") !== thisMonth}
        isToday={d.isBefore(today) && d.clone().add(1, 'days').isAfter(today)}
        >
        {elements.filter(e => d.isBefore(e.date) && d.clone().add(1, 'days').isAfter(e.date)).map(e => e.element)}
      </Day>)
    }
  </tr>)
}

export default Week
