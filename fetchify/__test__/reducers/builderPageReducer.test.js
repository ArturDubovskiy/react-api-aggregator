import * as types from "../../src/actions/actionTypes";
import builderReducer from "../../src/reducers/BuilderPage/builderPageReducer";

const state = {
  schema: [{ checked: false, key: "key1", value: "" }],
  preview: {},
  dataSection: {
    drag: false,
    showed: true,
    data: false
  }
};

describe("Builder reducer", () => {

  it("should return default state", () => {
    const newState = builderReducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it("should handle ADD_KEY_ROW", () => {
    const newState = builderReducer(state, { type: types.ADD_KEY_ROW });
    expect(newState).toEqual({
      ...state,
      schema: [...state.schema, { checked: false, key: "key2", value: "" }]
    });
  });

  it("should handle GET_JSON_VALUE", () => {
    const newState = builderReducer(state, { type: types.GET_JSON_VALUE, payload: { id: 0, val:"testVal" } })
    expect(newState).toEqual({...state, schema: [{ checked: true, key: "key1", value: "testVal" }]})
})

  it("should handle GET_JSON_KEY", () => {
    const newState = builderReducer(state, {
      type: types.GET_JSON_KEY,
      payload: { id: 0, val: "test" }
    });
    expect(newState).toEqual({...state, schema: [{ checked: false, key: "test", value: "" }]})
  });

  it("should handle TOGGLE_KEY_STATUS", () => {
    const newState = builderReducer(state, {type: types.TOOGLE_KEY_STATUS, payload: 0})
    expect(newState).toEqual({...state, schema: [{ checked: true, key: "key1", value: "" }]})
})

it("should handle REMOVE SELECTED_KEY", () => {
  const newState = builderReducer(state, {type: types.REMOVE_SELECTED_KEY, payload: 0})
  expect(newState).toEqual({...state, schema: []})
})

it("should handle REMOVE_LAST_KEY", () => {
  const newState = builderReducer(state, {type: types.REMOVE_LAST_KEY})
  expect(newState).toEqual({...state, schema: []})
})

it("should handle SET_PREVIEW", () => {
  const newState = builderReducer(state, {type: types.SET_PREVIEW, payload: {test: "test"}})
  expect(newState).toEqual({...state, preview: {test: "test"}})
})

it("should handle SET_DRAG_STATUS", () => {
  const newState = builderReducer(state, {type: types.SET_DRAG_STATUS, payload: true})
  expect(newState).toEqual({...state, dataSection: {...state.dataSection, drag: true}})
})

it("should handle CLEAR_BODY_TABLE", () => {
  const newState = builderReducer(state, {type: types.CLEAR_BODY_TABLE, })
  expect(newState).toEqual({ ...state,  schema: [{ checked: false, key: "key1", value: "" }],})
})

it("should handle CLEAR_KEY_VALUE", () => {
  const newState = builderReducer(state, {type: types.CLEAR_KEY_VALUE, payload: 0})
  expect(newState).toEqual({...state, schema: [{...state.schema[0], value: ""}]})
})

it("should handle CLEAR_JSON", () => {
  const newState = builderReducer(state, {type: types.CLEAR_JSON})
  expect(newState).toEqual({...state})
})

it("should set keys after REMOVE_SELECTED_KEY", () => {
  const newState = builderReducer({...state, schema: [...state.schema, { checked: false, key: "key2", value: "" }]}, {type: types.REMOVE_SELECTED_KEY, payload: 0})
  expect(newState).toEqual({...state, schema: [{...state.schema[0], key: "key1" }]})
})


});
