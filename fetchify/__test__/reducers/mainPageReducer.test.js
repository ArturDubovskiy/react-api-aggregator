import * as types from "../../src/actions/actionTypes";
import mainReducer from "../../src/reducers/HomePage/mainPageReducer";

const state = {
  data: null,
  request: {
    url: "",
    method: "GET",
    body: null,
    headers: {},
    params: [],
    isLoading: false,
    error: null
  },
  tables: {
    params: [
      {
        checked: false,
        key: "",
        value: ""
      }
    ],
    headers: [
      {
        checked: false,
        key: "",
        value: ""
      }
    ]
  },
  toggles: {
    showHeaders: false,
    showParams: false,
    saveClicked: false
  },
  history: [],
  validation_errors: {
    url: null,
    body: null
  }
};

describe("MainPage reducer", () => {
  it("should return initial state", () => {
    const newState = mainReducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it("should handle FETCH_DATA", () => {
    const newState = mainReducer(state, {
      type: types.FETCH_DATA,
      payload: { test: "test" }
    });
    expect(newState).toEqual({
      ...state,
      data: { test: "test" },
      request: { ...state.request, isLoading: false, error: null },
      toggles: { ...state.toggles, saveClicked: false }
    });
  });

  it("should handle FETCH_DATA_ERROR", () => {
    const newState = mainReducer(state, {
      type: types.FETCH_DATA_ERROR,
      payload: "error"
    });
    expect(newState).toEqual({
      ...state,
      request: { ...state.request, isLoading: false, error: "error" },
      toggles: { ...state.toggles, saveClicked: false }
    });
  });

  it("should handle REQUEST_SEND_START", () => {
    const newState = mainReducer(state, { type: types.REQUEST_SEND_START });
    expect(newState).toEqual({
      ...state,
      request: { ...state.request, isLoading: true, error: null }
    });
  });

  it("should handle REMOVE_ERROR", () => {
    const newState = mainReducer(state, { type: types.REMOVE_ERROR });
    expect(newState).toEqual({
      ...state,
      request: { ...state.request, error: null }
    });
  });

  it("should handle GET_URL_AND_STATUS", () => {
    const newState = mainReducer(state, {
      type: types.GET_URL_AND_STATUS,
      payload: { url: "OK" }
    });
    expect(newState).toEqual({ ...state, history: [{ url: "OK" }] });
  });

  it("should handle URL_VALIDATION_ERROR", () => {
    const newState = mainReducer(state, {
      type: types.URL_VALIDATION_ERROR,
      payload: "error"
    });
    expect(newState).toEqual({
      ...state,
      validation_errors: { ...state.validation_errors, url: "error" }
    });
  });

  it("should handle BODY_VALIDATION_ERROR", () => {
    const newState = mainReducer(state, {
      type: types.BODY_VALIDATION_ERROR,
      payload: "error"
    });
    expect(newState).toEqual({
      ...state,
      validation_errors: { ...state.validation_errors, body: "error" }
    });
  });

  it("should handle SAVE_BUTTON_CLICK", () => {
    const newState = mainReducer(state, { type: types.SAVE_BUTTON_CLICK });
    expect(newState).toEqual({
      ...state,
      toggles: { ...state.toggles, saveClicked: true }
    });
  });

  it("should handle SET_GET_METHOD", () => {
    const newState = mainReducer(state, {
      type: types.SET_GET_METHOD,
      payload: "POST"
    });
    expect(newState).toEqual({
      ...state,
      request: {
        ...state.request,
        method: "POST"
      }
    });
  });

  it("should handle SET_GET_HEADERS", () => {
    const newState = mainReducer(state, {
      type: types.SET_GET_HEADERS,
      payload: [{ test: "test" }]
    });
    expect(newState).toEqual({
      ...state,
      request: {
        ...state.request,
        headers: [{ test: "test" }]
      }
    });
  });

  it("should handle SET_GET_URL", () => {
    const newState = mainReducer(
      { ...state, request: { ...state.request, error: "test" } },
      {
        type: types.SET_GET_URL,
        payload: "test_url"
      }
    );
    expect(newState).toEqual({
      ...state,
      request: {
        ...state.request,
        url: "test_url",
        error: null
      }
    });
  });

  it("should handle TOGGLE_GET_PARAMS_BUTTON", () => {
    const newState = mainReducer(state, {
      type: types.TOGGLE_GET_PARAMS_BUTTON
    });
    expect(newState).toEqual({
      ...state,
      toggles: {
        ...state.toggles,
        showParams: true
      }
    });
  });

  it("should handle TOGGLE_GET_HEADERS_BUTTON", () => {
    const newState = mainReducer(state, {
      type: types.TOGGLE_GET_HEADERS_BUTTON
    });
    expect(newState).toEqual({
      ...state,
      toggles: {
        ...state.toggles,
        showHeaders: true
      }
    });
  });

  it("should handle SET_GET_BODY", () => {
    const newState = mainReducer(state, {
      type: types.SET_GET_BODY,
      payload: "test"
    });
    expect(newState).toEqual({
      ...state,
      request: {
        ...state.request,
        body: "test"
      }
    });
  });
});

it("should handle SET_GET_PARAMS", () => {
  const newState = mainReducer(state, {
    type: types.SET_GET_PARAMS,
    payload: "params"
  });
  expect(newState).toEqual({
    ...state,
    request: { ...state.request, params: "params" }
  });
});

describe("MainPage reducer params table", () => {
  it("should handle ADD_GET_PARAM_ROW", () => {
    const newState = mainReducer(state, { type: types.ADD_GET_PARAM_ROW });
    expect(newState).toEqual({
      ...state,
      tables: {
        ...state.tables,
        params: [
          { checked: false, key: "", value: "" },
          { checked: false, key: "", value: "" }
        ]
      }
    });
  });

  it("should handle GET_PARAM_KEY", () => {
    const newState = mainReducer(state, {
      type: types.GET_PARAM_KEY,
      payload: { id: 0, val: "test" }
    });
    expect(newState).toEqual({
      ...state,
      tables: {
        ...state.tables,
        params: [{ checked: false, key: "test", value: "" }]
      }
    });
  });

  it("should handle GET_PARAM_VALUE", () => {
    const newState = mainReducer(state, {type: types.GET_PARAM_VALUE, payload: {id: 0, val: "test"}});
    expect(newState).toEqual({...state, tables: {...state.tables, params: [{ checked: false, key: "", value: "test" }]}});
  });

  it("should handle TOOGLE_PARAM_STATUS", () => {
    const newState = mainReducer({...state, request: {...state.request, error: "test"}}, {type: types.TOOGLE_PARAM_STATUS, payload: 0});
    expect(newState).toEqual({
        ...state,
        tables: { ...state.tables, params: [{ checked: true, key: "", value: "" }] },
        request: { ...state.request, error: null }
      });
  });

  it("should handle REMOVE_SELECTED_PARAM", () => {
    const newState = mainReducer(state, {type: types.REMOVE_SELECTED_PARAM, payload: 0});
    expect(newState).toEqual({...state, tables: {...state.tables, params: []}});
  });

  it("should handle REMOVE_LAST_PARAM", () => {
    const newState = mainReducer(state, {type: types.REMOVE_LAST_PARAM});
    expect(newState).toEqual({...state, tables: {...state.tables, params: []}});
  });
});

describe("MainReducer header table", () => {
    it("should handle ADD_GET_HEADER_ROW", () => {
        const newState = mainReducer(state, { type: types.ADD_GET_HEADER_ROW });
        expect(newState).toEqual({
          ...state,
          tables: {
            ...state.tables,
            headers: [
              { checked: false, key: "", value: "" },
              { checked: false, key: "", value: "" }
            ]
          }
        });
      });
    
      it("should handle GET_HEADER_KEY", () => {
        const newState = mainReducer(state, {
          type: types.GET_HEADER_KEY,
          payload: { id: 0, val: "test" }
        });
        expect(newState).toEqual({
          ...state,
          tables: {
            ...state.tables,
            headers: [{ checked: false, key: "test", value: "" }]
          }
        });
      });
    
      it("should handle GET_HEADER_VALUE", () => {
        const newState = mainReducer(state, {type: types.GET_HEADER_VALUE, payload: {id: 0, val: "test"}});
        expect(newState).toEqual({...state, tables: {...state.tables, headers: [{ checked: false, key: "", value: "test" }]}});
      });
    
      it("should handle TOOGLE_HEADER_STATUS", () => {
        const newState = mainReducer(state, {type: types.TOOGLE_HEADER_STATUS, payload: 0});
        expect(newState).toEqual({
            ...state,
            tables: { ...state.tables, headers: [{ checked: true, key: "", value: "" }] },
            request: { ...state.request}
          });
      });
    
      it("should handle REMOVE_SELECTED_HEADER", () => {
        const newState = mainReducer(state, {type: types.REMOVE_SELECTED_HEADER, payload: 0});
        expect(newState).toEqual({...state, tables: {...state.tables, headers: []}});
      });
    
      it("should handle REMOVE_LAST_HEADER", () => {
        const newState = mainReducer(state, {type: types.REMOVE_LAST_HEADER});
        expect(newState).toEqual({...state, tables: {...state.tables, headers: []}});
      });
});
