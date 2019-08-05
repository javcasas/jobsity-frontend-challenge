import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as TodoApp } from 'app/containers/App';
import { Calendar as CalendarApp } from 'app/containers/Calendar';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={CalendarApp} />
    <Route path="/Todo" component={TodoApp} />
  </Switch>
));
