import * as types from "../actionTypes";
import * as constants from "../../utils/constants";
import { sendRequest } from "../../utils/utils";

export const urlValidationError = error => dispatch => {
  dispatch({ type: types.URL_VALIDATION_ERROR, payload: error });
};

export const bodyValidationError = error => dispatch => {
  dispatch({ type: types.BODY_VALIDATION_ERROR, payload: error });
};

export const fetchData = (url, method, headers, body) => dispatch => {
  dispatch({ type: types.REQUEST_SEND_START });
  sendRequest(url, { method, headers, body }, 25000)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: types.FETCH_DATA, payload: { url, result: data } });
      dispatch({
        type: types.GET_URL_AND_STATUS,
        payload: { url, status: constants.STATUS_SUCCESS }
      });
    })
    .catch(error => {
      if (error instanceof SyntaxError) {
        dispatch({
          type: types.FETCH_DATA_ERROR,
          payload: constants.BAD_RESPONSE_TYPE
        });
      } else {
        dispatch({
          type: types.FETCH_DATA_ERROR,
          payload: `${constants.FETCHING_ERROR_MSG}: ${error}`
        });
      }
      dispatch({
        type: types.GET_URL_AND_STATUS,
        payload: { url, status: constants.STATUS_FAIL }
      });
      setTimeout(() => {
        dispatch({ type: types.REMOVE_ERROR });
      }, 5000);
    });
};

export const setSendMethod = val => dispatch => {
  dispatch({ type: types.SET_GET_METHOD, payload: val });
};

export const setURL = url => dispatch => {
  dispatch({ type: types.SET_GET_URL, payload: url });
};

export const setParams = params => dispatch => {
  dispatch({ type: types.SET_GET_PARAMS, payload: params });
};

export const toggleShowParams = () => dispatch => {
  dispatch({ type: types.TOGGLE_GET_PARAMS_BUTTON });
};

export const toggleShowHeaders = () => dispatch => {
  dispatch({ type: types.TOGGLE_GET_HEADERS_BUTTON });
};

export const setBody = body => dispatch => {
  dispatch({ type: types.SET_GET_BODY, payload: body });
};

export const setHeaders = headers => dispatch => {
  dispatch({ type: types.SET_GET_HEADERS, payload: headers });
};

export const saveClick = () => dispatch => {
  dispatch({ type: types.SAVE_BUTTON_CLICK });
};

//Params table
export const addParamRow = () => dispatch => {
  dispatch({ type: types.ADD_GET_PARAM_ROW });
};

export const changeParamKey = (id, val) => dispatch => {
  dispatch({ type: types.GET_PARAM_KEY, payload: { id, val } });
};

export const changeParamValue = (id, val) => dispatch => {
  dispatch({ type: types.GET_PARAM_VALUE, payload: { id, val } });
};

export const changeParamStatus = id => dispatch => {
  dispatch({ type: types.TOOGLE_PARAM_STATUS, payload: id });
};

export const removeSelectedParam = id => dispatch => {
  dispatch({ type: types.REMOVE_SELECTED_PARAM, payload: id });
};

export const removeLastRow = () => dispatch => {
  dispatch({ type: types.REMOVE_LAST_PARAM });
};

//Headers table
export const addHeaderRow = () => dispatch => {
  dispatch({ type: types.ADD_GET_HEADER_ROW });
};

export const changeHeaderKey = (id, val) => dispatch => {
  dispatch({ type: types.GET_HEADER_KEY, payload: { id, val } });
};

export const changeHeaderValue = (id, val) => dispatch => {
  dispatch({ type: types.GET_HEADER_VALUE, payload: { id, val } });
};

export const changeHeaderStatus = id => dispatch => {
  dispatch({ type: types.TOOGLE_HEADER_STATUS, payload: id });
};

export const removeSelectedHeader = id => dispatch => {
  dispatch({ type: types.REMOVE_SELECTED_HEADER, payload: id });
};

export const removeLastHeader = () => dispatch => {
  dispatch({ type: types.REMOVE_LAST_HEADER });
};
