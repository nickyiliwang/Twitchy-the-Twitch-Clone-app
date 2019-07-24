// The reducer is a pure function that takes the previous state and an action, and returns the next state. (previousState, action) => newState.

// importing lodash for the omit and .mapKeys method
import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // fetch streams is merging an list of records, here will need to take the objects from an array of objects and create a new object for the reducer
      // .mapKeys is lodash for taking an array and returning an object, using the key 'id' as the key in the new object
      return { ...state, ..._.mapKeys(action.payload, "id") };
    // key interpolation: able to create something without knowing what it is.

    // in short, this syntax dynamically add in new key value pairs into an object

    // in all 3 cases we are getting back a single record, we and we want to add it into the state object
    case FETCH_STREAM:
      // ...state returns a brand new object, so Redux doesn't think we didn't make changes
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // payload is the id, so no reference to id, omit does not mutate the value by creating an new object
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
