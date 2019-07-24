import { combineReducers } from "redux";

// The reducer is a pure function that takes the previous state and an action, and returns the next state. (previousState, action) => newState.

// name changed reducer to formReducer with 'as'
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});
