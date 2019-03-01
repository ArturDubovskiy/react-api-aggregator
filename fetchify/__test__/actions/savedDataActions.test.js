import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actions from "../../src/actions/DataPage/savedDataActions";
import * as types from "../../src/actions/actionTypes";


const initialSate = {
    test: []
  };
  
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialSate);

describe("Data reducer", () => {
    beforeEach(() => {
        store.clearActions();
      });

    it("should handle saveData", () => {
        const expected = [{ type: types.SAVE_DATA, payload: "test" }]
        store.dispatch(actions.saveData("test"))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle clearSavedData", () => {
        const expected = [{ type: types.CLEAR_SAVED_DATA }]
        store.dispatch(actions.clearSavedData())
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle removeSelectedData", () => {
        const expected = [{ type: types.REMOVE_SAVED_DATA, payload: 0 }]
        store.dispatch(actions.removeSelectedData(0))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle setSendDataURL", () => {
        const expected = [{ type: types.SEND_DATA_URL, payload: "test" }]
        store.dispatch(actions.setSendDataURL("test"))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle setSendURLValidation", () => {
        const expected = [{ type: types.SEND_URL_VALIDATION, payload: "error"}]
        store.dispatch(actions.setSendURLValidation("error"))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle setSendMethod", () => {
        const expected = [{ type: types.CHANGE_SEND_METHOD, payload: "POST" }]
        store.dispatch(actions.setSendMethod("POST"))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle addSendHeader", () => {
        const expected = [{ type: types.ADD_SEND_HEADER }]
        store.dispatch(actions.addSendHeader())
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle changeSendHeaderKey", () => {
        const expected = [{ type: types.SET_SEND_HEADER_KEY, payload: { id: 0, val: "test" } }]
        store.dispatch(actions.changeSendHeaderKey(0, "test"))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle changeSendHeaderValue", () => {
        const expected = [{ type: types.SET_SEND_HEADER_VALUE, payload: { id: 0, val: "test" } }]
        store.dispatch(actions.changeSendHeaderValue(0, "test"))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle changeSendHeaderStatus", () => {
        const expected = [{ type: types.TOGGLE_SEND_HEADER, payload: 0 }]
        store.dispatch(actions.changeSendHeaderStatus(0))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle removeSelectedSendHeader", () => {
        const expected = [{ type: types.REMOVE_SEND_HEADER, payload: 0 }]
        store.dispatch(actions.removeSelectedSendHeader(0))
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle removeLastSendHeader", () => {
        const expected = [{ type: types.REMOVE_LAST_SEND_HEADER }]
        store.dispatch(actions.removeLastSendHeader())
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle headersButtonToggle", () => {
        const expected = [{ type: types.TOGGLE_SHOW_HEADERS }]
        store.dispatch(actions.headersButtonToggle())
        expect(store.getActions()).toEqual(expected)
    })

    it("should handle toggleShowCustomJSON", () => {
        const expected = [{ type: types.TOGGLE_SHOW_CUSTOM_JSON }]
        store.dispatch(actions.toggleShowCustomJSON())
        expect(store.getActions()).toEqual(expected)
    })

    it("should handl setSendBody", () => {
        const expected = [{ type: types.SET_SEND_BODY, payload: "test" }]
        store.dispatch(actions.setSendBody("test"))
        expect(store.getActions()).toEqual(expected)
    })

})