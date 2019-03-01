import * as types from "../../src/actions/actionTypes";
import savedDataReducer from "../../src/reducers/DataPage/savedDataReducer";

const state = {
  data: [],
  toggles: {
    headers: false,
    custom: false
  },
  sendRequest: {
    url: "",
    headers: [
      { checked: true, key: "Content-Type", value: "application/json" }
    ],
    method: "POST",
    validation: true,
    isLoading: false,
    status: null,
    error: null,
    body: null
  }
};

describe("SavedData redcuer", () => {
  it("should return initial state", () => {
    const newState = savedDataReducer(undefined, {});
    expect(newState).toEqual(state);
  });
  it("should handle SAVE_DATA", () => {
    const newState = savedDataReducer(state, {
      type: types.SAVE_DATA,
      payload: { test: "test" }
    });
    expect(newState).toEqual({
      ...state,
      data: [{ test: "test" }],
      sendRequest: { ...state.sendRequest, body: [{ test: "test" }] }
    });
  });
  it("should handle CLEAR_SAVED_DATA", () => {
    const newState = savedDataReducer(state, { type: types.CLEAR_SAVED_DATA });
    expect(newState).toEqual({ ...state, data: [] });
  });
  it("should handle REMOVE_SAVED_DATA", () => {
    const newState = savedDataReducer(
      { ...state, data: [{ test: "test" }] },
      { type: types.REMOVE_SAVED_DATA, payload: 0 }
    );
    expect(newState).toEqual(state);
  });
  it("should handle SNED_DATA_URL", () => {
    const newState = savedDataReducer(state, {
      type: types.SEND_DATA_URL,
      payload: "test_url"
    });
    expect(newState).toEqual({
      ...state,
      sendRequest: { ...state.sendRequest, url: "test_url" }
    });
  });
  it("should handle SNED_URL_VALIDATION", () => {
    const newState = savedDataReducer(state, {
      type: types.SEND_URL_VALIDATION,
      payload: "fail"
    });
    expect(newState).toEqual({
      ...state,
      sendRequest: { ...state.sendRequest, validation: "fail" }
    });
  });
  it("should handle SEND_SAVED_DATA", () => {
    const newState = savedDataReducer(
      { ...state, sendRequest: { ...state.sendRequest, status: "test" } },
      { type: types.SEND_SAVED_DATA }
    );
    expect(newState).toEqual({
      ...state,
      sendRequest: { ...state.sendRequest, isLoading: true, status: null }
    });
  });
  it("should handle SEND_DATA_SUCCESS", () => {
    const newState = savedDataReducer(
      {
        ...state,
        sendRequest: { ...state.sendRequest, isLoading: true, error: "test" }
      },
      { type: types.SEND_DATA_SUCCESS }
    );
    expect(newState).toEqual({
      ...state,
      sendRequest: {
        ...state.sendRequest,
        isLoading: false,
        error: null,
        status: true
      }
    });
  });

  it("should handle SEND_DATA_FAILED", () => {
    const newState = savedDataReducer(
      {
        ...state,
        sendRequest: { ...state.sendRequest, isLoading: true}
      },
      { type: types.SEND_DATA_FAILED, payload: "test" }
    );
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, error: "test", isLoading: false, status: false}});
  });

  it("should handle CHANGE_SEND_METHOD", () => {
    const newState = savedDataReducer(state, {type: types.CHANGE_SEND_METHOD, payload: "POST"});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, method: "POST"}});
  });

  it("should handle ADD_SEND_HEADER", () => {
    const newState = savedDataReducer(state, {type: types.ADD_SEND_HEADER});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, headers: [...state.sendRequest.headers, { checked: false, key: "", value: "" }]}});
  });

  it("should handle TOGGLE_SEND_HEADER", () => {
    const newState = savedDataReducer(state, {type: types.TOGGLE_SEND_HEADER, payload: 0});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, headers: [{ checked: false, key: "Content-Type", value: "application/json" }]}});
  });

  it("should handle SET_SEND_HEADER_KEY", () => {
    const newState = savedDataReducer(state, {type: types.SET_SEND_HEADER_KEY, payload: {val: "test", id: 0}});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, headers: [{checked: true, key: "test", value: "application/json"}]}});
  });
  it("should handle SET_SEND_HEADER_VALUE:", () => {
    const newState = savedDataReducer(state, {type: types.SET_SEND_HEADER_VALUE, payload: {val: "test", id: 0}});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, headers: [{checked: true, key: "Content-Type", value: "test"}]}});
  });

  it("should handle REMOVE_SEND_HEADER", () => {
    const newState = savedDataReducer(state, {type: types.REMOVE_SEND_HEADER, payload: 0});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, headers: []}});
  });

  it("should handle REMOVE_LAST_SEND_HEADER", () => {
    const newState = savedDataReducer(state, {type: types.REMOVE_LAST_SEND_HEADER});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, headers: []}});
  });

  it("should handle TOGGLE_SHOW_HEADERS", () => {
    const newState = savedDataReducer(state, {type: types.TOGGLE_SHOW_HEADERS});
    expect(newState).toEqual({...state, toggles: {...state.toggles, headers: true}});
  });

  it("should handle TOGGLE_SHOW_CUSTOM_JSON", () => {
    const newState = savedDataReducer(state, {type: types.TOGGLE_SHOW_CUSTOM_JSON});
    expect(newState).toEqual({...state, toggles: {...state.toggles, custom: true}});
  });
  it("should handle SET_SEND_BODY", () => {
    const newState = savedDataReducer(state, {type: types.SET_SEND_BODY, payload: "test_body"});
    expect(newState).toEqual({...state, sendRequest: {...state.sendRequest, body: "test_body"}});
  });
});
