import React from "react";
import { mount } from "enzyme";
import DataPlaceholder from "../../../src/components/HomePage/presentational/DataPlaceholder";

let component;
const def_props = {
  result: {
    toggles: { saveClicked: false },
    data: { result: JSON.stringify({ data: "test" }) },
    request: { error: "test", isLoading: false },
  },
  actions: { saveClick: jest.fn(), saveData: jest.fn() }
};

const setUp = (props = def_props) => {
  let wrapper = mount(<DataPlaceholder {...props} />);
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
    expect(component.find("SegmentGroup").length).toBe(1);
  });

  it("should render loading placeholder", () => {
    const props = {
      ...def_props,
      result: {
        ...def_props.result,
        data: null,
        request: { ...def_props.result.request, isLoading: true }
      }
    };
    component = setUp(props);
    expect(component.find("Segment").text()).toContain("Loading...");
  });

  it("should render placeholder", () => {
    const props = {
      ...def_props,
      result: {
        ...def_props.result,
        data: null
      }
    };
    component = setUp(props);
    expect(component.find("Segment").text()).toContain("No data resived yet");
  });

  it("should render savedMessage", () => {
    const props = {
      ...def_props,
      result: {
        ...def_props.result,
        toggles: {
          saveClicked: true
        }
      }
    };
    component = setUp(props);
    expect(component.find("Message").text()).toContain("Successfully saved!");
  });
  it("should handle saveData", () => {
    component = setUp()
    const el = component.find("Button")
    el.simulate('click')
    expect(def_props.actions.saveClick).toHaveBeenCalledTimes(1)
    expect(def_props.actions.saveData).toHaveBeenCalledTimes(1)
    expect(def_props.actions.saveData).toHaveBeenCalledWith({ result: JSON.stringify({ data: "test" }) })
  })
  
});
