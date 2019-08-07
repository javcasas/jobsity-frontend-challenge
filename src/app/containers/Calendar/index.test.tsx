import * as React from 'react';
import { Calendar, Props } from './index';
import { shallow, mount } from 'enzyme';
import { utc } from 'moment';
import { spy } from 'sinon';

describe("Calendar container", () => {
  const defaultProps : Props = {
    reminders: [],
    date: utc("2019-04-14T12:11:45"),
    createReminder: () => {},
    updateReminder: () => {},
  }

  function mkShallow(props?: Props) {
    const finalProps = {...defaultProps, ...props}
    return shallow(<Calendar {...finalProps} />)
  }
  function mkDeep(props?: Props) {
    const finalProps = {...defaultProps, ...props}
    return mount(<Calendar {...finalProps} />)
  }

  it("render calendar", () => {
    expect(mkShallow()).toMatchSnapshot();
  })
  it("Create new reminder button opens the form", () => {
    const calendar = mkShallow();
    calendar.find("button.create-reminder").simulate("click");
    expect(calendar).toMatchSnapshot();
  })
  it("Create new reminder button opens the form", () => {
    const calendar = mkShallow();
    calendar.find("button.create-reminder").simulate("click");
    expect(calendar).toMatchSnapshot();
  })
  it("Create new reminder - full workflow", () => {
    const createReminder = spy();
    const calendar = mkDeep({...defaultProps, createReminder});
    calendar.find("button.create-reminder").simulate("click");
    expect(calendar).toMatchSnapshot();
    calendar.find("ReminderForm").setState({text: "asdf", city: "London"})
    expect(calendar).toMatchSnapshot();
    expect(calendar.find("form div button[disabled=false]:first-child").length).toBe(1);
    calendar.find("form div button:first-child").simulate("click");
    expect(createReminder.calledOnce).toBe(true);
    expect(createReminder.firstCall.args).toStrictEqual([{
      city: "London",
      color: 0,
      date: utc("2019-04-14T12:11:45"),
      id: 0,
      text: "asdf"
    }]);
  })
})
