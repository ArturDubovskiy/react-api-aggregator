import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actions from "../../src/actions/BuilderPage/builderActions";
import * as types from "../../src/actions/actionTypes";

const initialSate = {
  test: []
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialSate);

describe("MainPage actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("should handle addKeyRow", () => {
    const expected = [{ type: types.ADD_KEY_ROW }];
    store.dispatch(actions.addKeyRow());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeKeyValue", () => {
    const expected = [
      { type: types.GET_JSON_KEY, payload: { id: 0, val: "test" } }
    ];
    store.dispatch(actions.changeKeyValue(0, "test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeValue", () => {
    const expected = [
      { type: types.GET_JSON_VALUE, payload: { id: 0, val: "test" } }
    ];
    store.dispatch(actions.changeValue(0, "test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle changeKeyStatus", () => {
    const expected = [{ type: types.TOOGLE_KEY_STATUS, payload: 0 }];
    store.dispatch(actions.changeKeyStatus(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle removeSelectedKey", () => {
    const expected = [{ type: types.REMOVE_SELECTED_KEY, payload: 0 }];
    store.dispatch(actions.removeSelectedKey(0));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle removeLastKey", () => {
    const expected = [{ type: types.REMOVE_LAST_KEY }];
    store.dispatch(actions.removeLastKey());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setPreview", () => {
    const expected = [{ type: types.SET_PREVIEW, payload: "test" }];
    store.dispatch(actions.setPreview("test"));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle setDragStatus", () => {
    const expected = [{ type: types.SET_DRAG_STATUS, payload: true }];
    store.dispatch(actions.setDragStatus(true));
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle clearJSONBody", () => {
    const expected = [{ type: types.CLEAR_BODY_TABLE }];
    store.dispatch(actions.clearJSONBody());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle clearJSON", () => {
    const expected = [{ type: types.CLEAR_JSON }];
    store.dispatch(actions.clearJSON());
    expect(store.getActions()).toEqual(expected);
  });

  it("should handle clearValue", () => {
    const expected = [{ type: types.CLEAR_KEY_VALUE, payload: 0 }];
    store.dispatch(actions.clearValue(0));
    expect(store.getActions()).toEqual(expected);
  });
});
