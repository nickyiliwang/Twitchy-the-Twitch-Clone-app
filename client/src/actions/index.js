// JSON server api
import streams from "../apis/streams";
// importing history file for programmatic navigation
import history from "../history";
// insuring spellings are correct
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// following REST conventions we have 1 create stream, 2 get requests, 1st one gets all streams, second, individual stream, 4th action is put request that update the stream, and last is delete
// this code is using axios
export const createStream = formValues => async (dispatch, getState) => {
  // every time we create a stream we want to attach an unique id to it, but we also want to have formValues and userId together
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // do some programmatic navigation to get the user to root route
  // push is how we navigate the user
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  // using template strings to get individual ids
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// replaced put request with patch request because put requests removes keys from api, patch only changes specified formValues
export const editStream = (id, formValues) => async dispatch => {
  // put request to update the stream, template string to identify the id of the stream, updating it with formValues
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  // payload is the id so the reducer can use it to find and omit
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
