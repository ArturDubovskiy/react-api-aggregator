import React from "react";
import { mount } from "enzyme";
import History from "../../../src/components/HomePage/presentational/History";

let component;
const def_props = {
    history: [{url: "test", status: "Passed"}]
}


const setUp = (props = def_props) => {
    let wrapper = mount(<History {...props} />);
    return wrapper;
  };


describe("History component", () => {

  beforeEach(() => {
    component = setUp();
  });

  afterEach(() => {
    component.unmount();
  });

  it("should render without errors wtih data", () => {
    expect(component.find("Table").length).toBe(1)
  })

  it("should render placeholder if no data", () => {
      const props = {history: []}
      component = setUp(props)
      expect(component.find("Segment").text()).toContain("No requests yet")
  })

  it("should render color depending on status", () => {
      const props = {history: [{url: "test", status: "Failed"}]}
      component = setUp(props)
      expect(component.find("Label").prop("color")).toBe("red")
  })

})