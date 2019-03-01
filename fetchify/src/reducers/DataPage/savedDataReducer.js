import * as types from "../../actions/actionTypes";

export const initialState = {
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
  },
};

const savedDataReducer = (state = initialState, action) => {
  const headers = JSON.parse(JSON.stringify(state.sendRequest.headers))

  switch (action.type) {
    case types.SAVE_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
        sendRequest: {
          ...state.sendRequest,
          body: [...state.data, action.payload]
        }
      };

    case types.CLEAR_SAVED_DATA:
      return { ...state, data: [] };

    case types.REMOVE_SAVED_DATA:
      const data = [...state.data];
      data.splice(action.payload, 1);
      return { ...state, data };

    case types.SEND_DATA_URL:
      return {
        ...state,
        sendRequest: {
          ...state.sendRequest,
          url: action.payload,
          error: null
        }
      };

    case types.SEND_URL_VALIDATION:
      return {
        ...state,
        sendRequest: {
          ...state.sendRequest,
          validation: action.payload,
          error: null
        }
      };

    case types.SEND_SAVED_DATA:
      return {
        ...state,
        sendRequest: { ...state.sendRequest, isLoading: true, status: null }
      };

    case types.SEND_DATA_SUCCESS:
      return {
        ...state,
        sendRequest: {
          ...state.sendRequest,
          isLoading: false,
          status: true,
          error: null
        }
      };

    case types.SEND_DATA_FAILED:
      return {
        ...state,
        sendRequest: {
          ...state.sendRequest,
          isLoading: false,
          status: false,
          error: action.payload
        }
      };

    case types.CHANGE_SEND_METHOD:
      return {
        ...state,
        sendRequest: { ...state.sendRequest, method: action.payload }
      };

    case types.ADD_SEND_HEADER:
      const header = { checked: false, key: "", value: "" };
      headers.push(header);
      return { ...state, sendRequest: { ...state.sendRequest, headers } };

    case types.TOGGLE_SEND_HEADER:
      const checkbox = headers[action.payload];
      checkbox.checked = !checkbox.checked;
      return { ...state, sendRequest: { ...state.sendRequest, headers } };

    case types.SET_SEND_HEADER_KEY:
      headers[action.payload.id].key = action.payload.val;
      return { ...state, sendRequest: { ...state.sendRequest, headers } };

    case types.SET_SEND_HEADER_VALUE:
      headers[action.payload.id].value = action.payload.val;
      return { ...state, sendRequest: { ...state.sendRequest, headers } };

    case types.REMOVE_SEND_HEADER:
      headers.splice(action.payload, 1);
      return { ...state, sendRequest: { ...state.sendRequest, headers } };

    case types.REMOVE_LAST_SEND_HEADER:
      headers.pop();
      return { ...state, sendRequest: { ...state.sendRequest, headers } };

    case types.TOGGLE_SHOW_HEADERS:
      return {
        ...state,
        toggles: { ...state.toggles, headers: !state.toggles.headers }
      };

    case types.TOGGLE_SHOW_CUSTOM_JSON:
      return {
        ...state,
        toggles: { ...state.toggles, custom: !state.toggles.custom }
      };

    case types.SET_SEND_BODY:
      return {
        ...state,
        sendRequest: { ...state.sendRequest, body: action.payload }
      };
    default:
      return state;
  }
};

export default savedDataReducer;
