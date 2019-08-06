import * as React from 'react';
import { ReminderModel, Color } from 'app/models/ReminderModel';
import { utc } from 'moment'

interface Props {
  onCreate: (r: ReminderModel) => any;
  onCancel: () => any;
  initialReminder?: ReminderModel;
  saveText: string;
  title: string;
}

type State = ReminderModel

class ReminderForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = props.initialReminder || {
      id: 0,
      text: "",
      city: "",
      color: Color.Red,
      date: utc()
    }
  }

  colorRadio = (id: string, text: string, color: Color) => 
      <label htmlFor={id}>
        <input type="radio" id={id} onClick={() => this.setState({color})} checked={this.state.color === color}/>
        { text }
      </label>

  setDate = (d: string) => {
    const parsed = utc(d);
    const newDate = utc(this.state.date)
                      .year(parsed.year())
                      .month(parsed.month())
                      .date(parsed.date())
    this.setState({date: newDate})
  }

  setTime = (t: string) => {
    const parsed = utc("2019-01-01T"+t);
    const newDate = utc(this.state.date)
                      .hours(parsed.hour())
                      .minutes(parsed.minutes())
    this.setState({date: newDate})
  }

  render () {
    const { onCreate, onCancel, saveText, title } = this.props;
    const { text, city, date } = this.state;

    const textError = (function () {
      if (text === "") {
        return <span>Please enter a description</span>
      } else if (text.length > 30) {
        return <span>The description can be at most 30 chars</span>
      } else {
        return null;
      }
    }())

    const cityError = (function () {
      if (city === "") {
        return <span>Please enter a city</span>
      } else {
        return null;
      }
    }())

    const isInvalid = textError !== null || cityError !== null;

    return (<form>
      <h1>{title}</h1>

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        placeholder="Up to 30 chars of description"
        onChange={evt => this.setState({text: evt.target.value})}
        value={text} />
      { textError }

      <label htmlFor="city">City where the even will happen</label>
      <input
        type="text"
        id="city"
        onChange={evt => this.setState({city: evt.target.value})}
        value={city} />
      { cityError }

      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        onChange={e => this.setDate(e.target.value)}
        value={date.format("YYYY-MM-DD")}
        />

      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        onChange={e => this.setTime(e.target.value)}
        value={date.format("HH:mm")}
        />

      { this.colorRadio("red", "Red", Color.Red) }
      { this.colorRadio("green", "Green", Color.Green) }
      { this.colorRadio("blue", "Blue", Color.Blue) }
      { this.colorRadio("yellow", "Yellow", Color.Yellow) }

      <button
        type="button"
        onClick={() => onCreate(this.state)}
        disabled={isInvalid}
        >{ saveText }</button>
      <button
        type="button"
        onClick={onCancel}
        >Cancel</button>
    </form>)
  }
}

export default ReminderForm;
