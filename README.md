# DL Project React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses a number of other important packages, such as Material UI, React Router, Axios, Recharts, Styled Components, and more.

## Background

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**Note:** To ensure the application can make successful requests, you will also need to start the proxy server. In a separate terminal window, run:

```bash
npm run proxy
```
Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `npm run proxy`

Runs the proxy server for handling requests.

## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).

To learn React, check out the [React documentation](https://react.dev/).

## Project Dependencies

This project uses a number of dependencies. They can be installed by running `npm install` in the project directory.

Some of the major dependencies include:

- `react` and `react-dom`: For building the user interface
- `@mui/material` and `@mui/icons-material`: For using Material-UI components
- `@fontsource/roboto`: For using the Roboto font
- `axios`: For making HTTP requests
- `react-router-dom`: For managing routing in the application
- `recharts`: For creating charts
- `styled-components`: For styling components
- `dotenv`: For managing environment variables
- `express` and `cors`: For creating and managing a server

## Environment Variables

Currently, this project does not use any specific environment variables from a `.env` file. However, the `.env` file is included as a placeholder in case it is needed for future updates or to handle sensitive information like API keys or server addresses.

If you need to use environment variables, create a `.env` file in the root of your project and insert your values like this:


```env
REACT_APP_EXAMPLE_KEY=example_value
```
