import React from "react";
import ReactDOM from "react-dom";

// The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk'

import App from "./components/App";
import reducers from "./reducers";

// Redux Dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Redux Dev-tool

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
