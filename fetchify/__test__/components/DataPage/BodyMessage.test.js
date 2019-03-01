import React from "react";
import { mount } from "enzyme";
import BodyMessage from "../../../src/components/DataPage/presentational/BodyMessage";

let def_props = {
  customData: JSON.stringify({test: "test"}),
  actions: {
    toggleShowButton: jest.fn(),
    clearJSON: jest.fn(),
    showJSON: false
  }
};
const setUp = (props = def_props) => {
  let wrapper = mount(<BodyMessage {...props} />);
  return wrapper;
};

describe("BodyMessage component", () => {
    it("should render if data passed", () => {
        const component = setUp();
        expect(component.find("Segment").first().length).toBe(1)
    })

    it("should NOT render if no data", () => {
        const props = {...def_props, customData: {}}
        const component = setUp(props);
        expect(component.find("Segment").length).toBe(0)
    })

    it("should render segment if showJSON true", () => {
        const props = {...def_props, showJSON: true}
        const component = setUp(props);
        expect(component.find("JSONPretty").length).toBe(1)
    })
})
