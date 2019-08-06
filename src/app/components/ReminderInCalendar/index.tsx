import * as React from 'react';
//import classnames from 'classnames';
import { Moment } from 'moment';
import * as styles from './styles.css';
import { Color } from 'app/models/ReminderModel';

interface Props {
  date: Moment;
  text: string;
  color: Color;
  city: string;
  weather?: React.Component;
}

function colorToClass(color: Color) : string {
  switch(color) {
    case Color.Red:
      return styles.red;
    case Color.Green:
      return styles.green;
    case Color.Blue:
      return styles.blue;
    case Color.Yellow:
      return styles.yellow;
    case Color.Purple:
      return styles.purple;
    case Color.Black:
      return styles.black;
    case Color.White:
      return styles.white;
  }
}

export const ReminderInCalendar : React.SFC<Props> = ({date, text, color, city, weather}) =>
  <div className={colorToClass(color)}>
    { date.format("HH:MM") } - { text } - { city } {weather && <> - {weather}</> }
  </div>

export default ReminderInCalendar
