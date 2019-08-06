import { Moment } from 'moment';

export interface ReminderModel {
  id: number;
  text: string;
  city: string;
  color: Color;
  date: Moment;
}

export enum Color {
  Red, Green, Blue, Yellow, Purple, Black, White
}
