import React from "react";
import { mount } from "enzyme";
import SavedData from "../../../src/components/DataPage/presentational/SavedData";

let def_props = {
  data: [{ url: "test", result: "test" }],
  actions: {
    removeData: jest.fn(),
    clearData: jest.fn()
  }
};

const setUp = (props = def_props) => {
  let wrapper = mount(<SavedData {...props} />);
  return wrapper;
};

describe("SavedData component", () => {
    it("should render without errors", () => {
        const component = setUp();
        expect(component.find("Segment").first().length).toBe(1)
    })

    it("shoud render placeholder if no data", () => {
        const props = {...def_props, data: []}
        const component = setUp(props)
        expect(component.find("Segment").text()).toContain("You dont save any data")
    })
})