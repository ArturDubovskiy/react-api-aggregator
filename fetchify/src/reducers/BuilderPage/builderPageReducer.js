import * as types from "../../actions/actionTypes";

const initialState = {
  schema: [{ checked: false, key: "key1", value: "" }],
  preview: {},
  dataSection: {
    drag: false,
    showed: true,
    data: false
  },
};

const builderReducer = (state = initialState, action) => {
  const schema = JSON.parse(JSON.stringify(state.schema));

  switch (action.type) {
    case types.ADD_KEY_ROW:
      const initial_key = {
        checked: false,
        key: `key${state.schema.length + 1}`,
        value: ""
      };
      schema.push(initial_key);
      return { ...state, schema };

    case types.GET_JSON_KEY:
      schema[action.payload.id].key = action.payload.val;
      return { ...state, schema };

    case types.GET_JSON_VALUE:
      schema[action.payload.id].value = action.payload.val;
      schema[action.payload.id].checked = true;
      return { ...state, schema };

    case types.TOOGLE_KEY_STATUS:
      const key_toggle = schema[action.payload];
      key_toggle.checked = !key_toggle.checked;
      return { ...state, schema };

    case types.REMOVE_SELECTED_KEY:
      schema.splice(action.payload, 1);
      schema.map((el, idx) => {
        if (el.key.startsWith("key")) {
          el.key = `key${idx + 1}`;
        }
      });
      return { ...state, schema };

    case types.REMOVE_LAST_KEY:
      schema.pop();
      return { ...state, schema };

    case types.SET_PREVIEW:
      return { ...state, preview: action.payload };

    case types.SET_DRAG_STATUS:
      return {
        ...state,
        dataSection: { ...state.dataSection, drag: action.payload }
      };

    case types.CLEAR_BODY_TABLE:
      return { ...state, schema: [{ checked: false, key: "key1", value: "" }] };

    case types.CLEAR_KEY_VALUE:
      schema[action.payload].value = "";
      schema[action.payload].checked = false;
      return { ...state, schema };

    case types.CLEAR_JSON:
      return { ...state, preview: {} };

    default:
      return state;
  }
};

export default builderReducer;
