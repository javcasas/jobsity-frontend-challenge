import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedCalendar as CalendarApp } from 'app/containers/Calendar';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={CalendarApp} />
  </Switch>
));
