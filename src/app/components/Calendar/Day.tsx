import * as React from 'react';
import classnames from 'classnames';
import { Moment } from 'moment';
import * as styles from './Day.css';

interface Props {
  notThisMonth?: boolean;
  date: Moment;
  children?: React.ReactNode;
}

export const Day : React.SFC<Props> = ({notThisMonth, date, children}) =>
  <td className={
        classnames({
          [styles.notThisMonth]: notThisMonth,
          [styles.isSunday]: date.day() === 0,
          [styles.isSaturday]: date.day() === 6,
        })}>
    {date.date()}
    {children}     
  </td>

export default Day
