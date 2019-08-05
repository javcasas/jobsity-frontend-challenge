import * as React from 'react';
//import classnames from 'classnames';
import { Moment } from 'moment';
//import * as styles from './Day.css';

interface Props {
  date: Moment;
  text: string;
  color: string;
  city: string;
  weather?: React.Component;
}

export const ReminderInCalendar : React.SFC<Props> = ({date, text, color, city, weather}) =>
  <div style={{backgroundColor: color}}>
    { date.format("HH:MM") } - { text } - { city } {weather && <> - {weather}</> }
  </div>

export default ReminderInCalendar
