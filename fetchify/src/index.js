import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";
import { saveState, loadState } from "./utils/utils";
import { initialState } from "./reducers/DataPage/savedDataReducer";
import reducers from "./reducers";

const persistedState = loadState();
export const store = createStore(
  reducers,
  persistedState,
  compose(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    SavedData: {
      ...initialState,
      data: store.getState().SavedData.data,
      sendRequest: {
        ...initialState.sendRequest,
        body: store.getState().SavedData.sendRequest.body
      }
    }
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
