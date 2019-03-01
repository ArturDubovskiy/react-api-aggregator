import * as utils from "../../src/utils/utils";


describe("Load state", () => {
    let saved;
    beforeAll(() => {
        saved = localStorage.getItem("state")
    })

    afterAll(() => {
        localStorage.setItem("state", saved)
    })

    it("should return undefiend if null", () => {
        localStorage.setItem("state", null)
        const res = utils.loadState()
        expect(res).toEqual(null)
    })

    it("should load state if NOT null", () => {
        localStorage.setItem("state", JSON.stringify({a: "test"}))
        const res = utils.loadState()
        expect(res).toEqual({a: "test"})
    })

    it("should return undefiend on error", () => {
        localStorage.setItem("state", "test")
        const res = utils.loadState()
        expect(res).toEqual(undefined)
    })
})

describe("Set state", () => {
    it("should set item", () => {
        utils.saveState("test")
        const res = localStorage.getItem("state")
        expect(res).toEqual(JSON.stringify("test"))
    })
})