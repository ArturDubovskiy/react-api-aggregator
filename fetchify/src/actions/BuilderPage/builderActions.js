import * as types from "../actionTypes";

export const addKeyRow = () => dispatch => {
  dispatch({ type: types.ADD_KEY_ROW });
};

export const changeKeyValue = (id, val) => dispatch => {
  dispatch({ type: types.GET_JSON_KEY, payload: { id, val } });
};

export const changeValue = (id, val) => dispatch => {
  dispatch({ type: types.GET_JSON_VALUE, payload: { id, val } });
};

export const changeKeyStatus = id => dispatch => {
  dispatch({ type: types.TOOGLE_KEY_STATUS, payload: id });
};

export const removeSelectedKey = id => dispatch => {
  dispatch({ type: types.REMOVE_SELECTED_KEY, payload: id });
};

export const removeLastKey = () => dispatch => {
  dispatch({ type: types.REMOVE_LAST_KEY });
};

export const setPreview = data => dispatch => {
  dispatch({ type: types.SET_PREVIEW, payload: data });
};

export const setDragStatus = val => dispatch => {
  dispatch({ type: types.SET_DRAG_STATUS, payload: val });
};

export const clearJSONBody = () => dispatch => {
  dispatch({ type: types.CLEAR_BODY_TABLE });
};

export const clearJSON = () => dispatch => {
  dispatch({ type: types.CLEAR_JSON });
};

export const clearValue = (idx) => dispatch => {
  dispatch({type: types.CLEAR_KEY_VALUE, payload: idx})
}