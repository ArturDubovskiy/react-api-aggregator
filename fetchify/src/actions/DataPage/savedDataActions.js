import * as types from "../actionTypes";
import { sendRequest } from "../../utils/utils";
import * as constants from "../../utils/constants";

export const sendSavedData = (url, body, method, headers) => dispatch => {
  dispatch({ type: types.SEND_SAVED_DATA }, 25000);
  sendRequest(url, { body, method, headers })
    .then(response => response)
    .then(data => {
      dispatch({ type: types.SEND_DATA_SUCCESS });
    })
    .catch(error => {
      dispatch({
        type: types.SEND_DATA_FAILED,
        payload: `${constants.SEND_DATA_ERROR_MSG}: ${error}`
      });
    });
};

export const saveData = data => dispatch => {
  dispatch({ type: types.SAVE_DATA, payload: data });
};

export const clearSavedData = () => dispatch => {
  dispatch({ type: types.CLEAR_SAVED_DATA });
};

export const removeSelectedData = id => dispatch => {
  dispatch({ type: types.REMOVE_SAVED_DATA, payload: id });
};

export const setSendDataURL = val => dispatch => {
  dispatch({ type: types.SEND_DATA_URL, payload: val });
};

export const setSendURLValidation = val => dispatch => {
  dispatch({ type: types.SEND_URL_VALIDATION, payload: val });
};

export const setSendMethod = method => dispatch => {
  dispatch({ type: types.CHANGE_SEND_METHOD, payload: method });
};

export const addSendHeader = () => dispatch => {
  dispatch({ type: types.ADD_SEND_HEADER });
};

export const changeSendHeaderKey = (id, val) => dispatch => {
  dispatch({ type: types.SET_SEND_HEADER_KEY, payload: { id, val } });
};

export const changeSendHeaderValue = (id, val) => dispatch => {
  dispatch({ type: types.SET_SEND_HEADER_VALUE, payload: { id, val } });
};

export const changeSendHeaderStatus = id => dispatch => {
  dispatch({ type: types.TOGGLE_SEND_HEADER, payload: id });
};

export const removeSelectedSendHeader = id => dispatch => {
  dispatch({ type: types.REMOVE_SEND_HEADER, payload: id });
};

export const removeLastSendHeader = () => dispatch => {
  dispatch({ type: types.REMOVE_LAST_SEND_HEADER });
};

export const headersButtonToggle = () => dispatch => {
  dispatch({ type: types.TOGGLE_SHOW_HEADERS });
};

export const toggleShowCustomJSON = () => dispatch => {
  dispatch({ type: types.TOGGLE_SHOW_CUSTOM_JSON });
};

export const setSendBody = body => dispatch => {
  dispatch({ type: types.SET_SEND_BODY, payload: body });
};
