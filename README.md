# Sample calendar app with reminders for Jobsity frontend challenge

## Setup, running and testing the app
Setup app:
```
yarn
```

Start app:
```
yarn start
```

Run tests:
```
yarn test
```
## Tasks completed
All required tasks plus:
* Support for other months
* Overflow (see details below)
* Delete one reminder

## Architecture considerations
* I use Typescript ADTs and totality checks to remove the need of Redux action constructors and guarantee decent type coverage.
* I designed the components as "lightweight state" instead of "no state", because that allows to free Redux from every tiny detail of the components. Redux should be used for global app state.
* I had some trouble testing the inputs in the ReminderForm, so I bypassed the problem by manually setting the state and then continuing the rest of the workflow.
* I haven't committed the API key for the weather service because committing such data to VCS is dangerous. Instead, I offer an API Key input at the bottom of the app where you can put your API key that will be used by the system.
* I haven't stored the the weather predictions in Redux to simplify the logic, but it could be done in order to create a cache.
* Following what the starter app offered, I haven't implemented any kind of advanced styling, that's why it's all CSS. Nowadays I tend to gravitate to StyledComponents to reduce the CSS mangling needed, or use at least SASS/SCSS.
* I have implemented overflow in a cheat-ish way by expanding the day as needed. This means days never actually overflow, they just grow and grow to accomodate all the reminders in them. I didn't bother with a more complex overflow setup because it required more time and would hide some reminders that would no longer be directly clickable.
