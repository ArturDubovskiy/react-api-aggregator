import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actions from "../../src/actions/HomePage/mainPageActions";
import * as types from "../../src/actions/actionTypes";

const initialSate = {
  test: []
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialSate);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe("MainPage actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("should handle urlValidationError", () => {
    const expected = [{ type: types.URL_VALIDATION_ERROR, payload: "error" }];
    store.dispatch(actions.urlValidationError("error"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle bodyValidationError", () => {
    const expected = [{ type: types.BODY_VALIDATION_ERROR, payload: "error" }];
    store.dispatch(actions.bodyValidationError("error"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setSendMethod", () => {
    const expected = [{ type: types.SET_GET_METHOD, payload: "POST" }];
    store.dispatch(actions.setSendMethod("POST"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setURL", () => {
    const expected = [{ type: types.SET_GET_URL, payload: "test" }];
    store.dispatch(actions.setURL("test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setParams", () => {
    const expected = [{ type: types.SET_GET_PARAMS, payload: [] }];
    store.dispatch(actions.setParams([]));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle toggleShowParams", () => {
    const expected = [{ type: types.TOGGLE_GET_PARAMS_BUTTON }];
    store.dispatch(actions.toggleShowParams());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle toggleShowHeaders", () => {
    const expected = [{ type: types.TOGGLE_GET_HEADERS_BUTTON }];
    store.dispatch(actions.toggleShowHeaders());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setBody", () => {
    const expected = [{ type: types.SET_GET_BODY, payload: "body" }];
    store.dispatch(actions.setBody("body"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setHeaders", () => {
    const expected = [{ type: types.SET_GET_HEADERS, payload: [] }];
    store.dispatch(actions.setHeaders([]));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle addParamRow", () => {
    const expected = [{ type: types.ADD_GET_PARAM_ROW }];
    store.dispatch(actions.addParamRow());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle saveClick", () => {
    const expected = [{ type: types.SAVE_BUTTON_CLICK }];
    store.dispatch(actions.saveClick());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeParamKey", () => {
    const expected = [
      { type: types.GET_PARAM_KEY, payload: { id: 0, val: "test" } }
    ];
    store.dispatch(actions.changeParamKey(0, "test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeParamValue", () => {
    const expected = [
      { type: types.GET_PARAM_VALUE, payload: { id: 0, val: "test" } }
    ];
    store.dispatch(actions.changeParamValue(0, "test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeParamStatus", () => {
    const expected = [{ type: types.TOOGLE_PARAM_STATUS, payload: 0 }];
    store.dispatch(actions.changeParamStatus(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle removeSelectedParam", () => {
    const expected = [{ type: types.REMOVE_SELECTED_PARAM, payload: 0 }];
    store.dispatch(actions.removeSelectedParam(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle removeLastRow", () => {
    const expected = [{ type: types.REMOVE_LAST_PARAM }];
    store.dispatch(actions.removeLastRow());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle addHeaderRow ", () => {
    const expected = [{ type: types.ADD_GET_HEADER_ROW }];
    store.dispatch(actions.addHeaderRow());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeHeaderKey", () => {
    const expected = [
      { type: types.GET_HEADER_KEY, payload: { id: 0, val: "test" } }
    ];
    store.dispatch(actions.changeHeaderKey(0, "test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeHeaderValue", () => {
    const expected = [
      { type: types.GET_HEADER_VALUE, payload: { id: 0, val: "test" } }
    ];
    store.dispatch(actions.changeHeaderValue(0, "test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeHeaderStatus", () => {
    const expected = [{ type: types.TOOGLE_HEADER_STATUS, payload: 0 }];
    store.dispatch(actions.changeHeaderStatus(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle removeSelectedHeader", () => {
    const expected = [{ type: types.REMOVE_SELECTED_HEADER, payload: 0 }];
    store.dispatch(actions.removeSelectedHeader(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle removeLastHeader", () => {
    const expected = [{ type: types.REMOVE_LAST_HEADER }];
    store.dispatch(actions.removeLastHeader());
    expect(store.getActions()).toEqual(expected);
  });

  it("should hanlde REQUEST_SEND_START", () => {
    window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, JSON.stringify({a: "test"}))));
    const expected = [{ type: types.REQUEST_SEND_START }]
    store.dispatch(actions.fetchData())
    expect(store.getActions()).toEqual(expected)
  })
});
