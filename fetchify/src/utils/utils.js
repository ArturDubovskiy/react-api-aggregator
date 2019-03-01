import { TIMEOUT_ERROR_MSG } from "./constants";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const sendRequest = (url, options, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(TIMEOUT_ERROR_MSG));
    }, timeout);
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText + response.status);
        }
        return response;
      })
      .then(response => resolve(response))
      .catch(error => {
        reject(error);
      });
  });
};
