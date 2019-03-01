import * as types from "../../actions/actionTypes";

const initialState = {
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
  },
};

const mainPageReducer = (state = initialState, action) => {
  const params = JSON.parse(JSON.stringify(state.tables.params));
  const headers = JSON.parse(JSON.stringify(state.tables.headers));

  switch (action.type) {
    case types.FETCH_DATA:
      return {
        ...state,
        data: action.payload,
        request: { ...state.request, isLoading: false, error: null },
        toggles: { ...state.toggles, saveClicked: false }
      };

    case types.FETCH_DATA_ERROR:
      return {
        ...state,
        request: { ...state.request, isLoading: false, error: action.payload },
        toggles: { ...state.toggles, saveClicked: false }
      };

    case types.REQUEST_SEND_START:
      return {
        ...state,
        request: { ...state.request, isLoading: true, error: null }
      };

    case types.REMOVE_ERROR:
      return {
        ...state,
        request: { ...state.request, error: null }
      };

    case types.GET_URL_AND_STATUS:
      return { ...state, history: [...state.history, action.payload] };

    case types.URL_VALIDATION_ERROR:
      return {
        ...state,
        validation_errors: { ...state.validation_errors, url: action.payload }
      };

    case types.BODY_VALIDATION_ERROR:
      return {
        ...state,
        validation_errors: { ...state.validation_errors, body: action.payload }
      };

    case types.SAVE_BUTTON_CLICK:
      return { ...state, toggles: { ...state.toggles, saveClicked: true } };

    case types.SET_GET_METHOD:
      return {
        ...state,
        request: {
          ...state.request,
          method: action.payload
        }
      };

    case types.SET_GET_HEADERS:
      return {
        ...state,
        request: {
          ...state.request,
          headers: action.payload
        }
      };

    case types.SET_GET_URL:
      return {
        ...state,
        request: {
          ...state.request,
          url: action.payload,
          error: null
        }
      };

    case types.TOGGLE_GET_PARAMS_BUTTON:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          showParams: !state.toggles.showParams
        }
      };

    case types.TOGGLE_GET_HEADERS_BUTTON:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          showHeaders: !state.toggles.showHeaders
        }
      };

    case types.SET_GET_BODY:
      return {
        ...state,
        request: {
          ...state.request,
          body: action.payload
        }
      };

    case types.SET_GET_PARAMS:
      return {
        ...state,
        request: { ...state.request, params: action.payload }
      };

    //Params
    case types.ADD_GET_PARAM_ROW:
      const row = { checked: false, key: "", value: "" };
      params.push(row);
      return { ...state, tables: { ...state.tables, params } };

    case types.GET_PARAM_KEY:
      params[action.payload.id].key = action.payload.val;
      return { ...state, tables: { ...state.tables, params } };

    case types.GET_PARAM_VALUE:
      params[action.payload.id].value = action.payload.val;
      return { ...state, tables: { ...state.tables, params } };

    case types.TOOGLE_PARAM_STATUS:
      const checkbox = params[action.payload];
      checkbox.checked = !checkbox.checked;
      return {
        ...state,
        tables: { ...state.tables, params },
        request: { ...state.request, error: null }
      };

    case types.REMOVE_SELECTED_PARAM:
      params.splice(action.payload, 1);
      return { ...state, tables: { ...state.tables, params } };

    case types.REMOVE_LAST_PARAM:
      params.pop();
      return { ...state, tables: { ...state.tables, params } };

    //Headers
    case types.ADD_GET_HEADER_ROW:
      const initial_header = { checked: false, key: "", value: "" };
      headers.push(initial_header);
      return { ...state, tables: { ...state.tables, headers } };

    case types.GET_HEADER_KEY:
      headers[action.payload.id].key = action.payload.val;
      return { ...state, tables: { ...state.tables, headers } };

    case types.GET_HEADER_VALUE:
      headers[action.payload.id].value = action.payload.val;
      return { ...state, tables: { ...state.tables, headers } };

    case types.TOOGLE_HEADER_STATUS:
      const header_toggle = headers[action.payload];
      header_toggle.checked = !header_toggle.checked;
      return { ...state, tables: { ...state.tables, headers } };

    case types.REMOVE_SELECTED_HEADER:
      headers.splice(action.payload, 1);
      return { ...state, tables: { ...state.tables, headers } };

    case types.REMOVE_LAST_HEADER:
      headers.pop();
      return { ...state, tables: { ...state.tables, headers } };
    default:
      return state;
  }
};

export default mainPageReducer;
