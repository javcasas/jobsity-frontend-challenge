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

## Architecture considerations
* I use of Typescript ADTs and totality checks to remove actions and guarantee decent type coverage.
* I designed the components as "lightweight state" instead of "no state", because that allows to free Redux from every tiny detail of the components. Redux should be used for global app state.
* I had some trouble testing the inputs in the ReminderForm, so I bypassed the problem by manually setting the state and then continuing the rest of the workflow.
* I haven't committed the API key for the weather service because committing such data to VCS is dangerous. Instead, I offer an API Key input at the bottom of the app where you can put your API key that will be used by the system.
* I haven't stored the the weather predictions in Redux to simplify the logic, but it could be done in order to create a cache.

