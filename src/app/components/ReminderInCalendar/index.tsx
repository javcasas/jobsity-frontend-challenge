import * as React from 'react';
import classnames from 'classnames';
import { Moment } from 'moment';
import * as styles from './styles.css';
import { Color } from 'app/models/ReminderModel';


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

interface Props {
  date: Moment;
  text: string;
  color: Color;
  city: string;
  onClick?: () => void;
  fetchForecast?: (city: string, date: Moment) => Promise<string>
}

interface State {
  weather?: React.ReactNode;
}

export class ReminderInCalendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }
  componentDidMount () {
    if(this.props.fetchForecast) {
      this.props.fetchForecast(this.props.city, this.props.date)
        .then(forecast => this.setState({weather: forecast}))
        .catch(() => this.setState({weather: null}))
    }
  }

  render() {
    const {date, text, color, city, onClick} = this.props;
    const {weather} = this.state;
    return (
      <button className={classnames(colorToClass(color), styles.reminder)} onClick={onClick}>
        { date.format("HH:MM") } - { text } - { city } {weather && <> - {weather}</> }
      </button>
    )
  }
}

export default ReminderInCalendar
