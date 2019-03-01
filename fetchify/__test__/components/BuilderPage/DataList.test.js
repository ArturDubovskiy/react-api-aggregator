import React from "react";
import { shallow, mount } from "enzyme";
import DataList from "../../../src/components/BodyBuilder/presentational/DataList";
let props;

const def_props = {
  urls: [],
  saved: [],
  actions: {
    setDragStatus: jest.fn(),
  }
}

const setUp = (props = def_props) => {
  let wrapper = mount(<DataList {...props} />);
  return wrapper;
};

describe("Data list", () => {

  let component;
  beforeEach(() => {
    component = setUp()
  })

  afterEach(() => {
    component.unmount()
  })
  it("renders without errors", () => {
    props = { urls: [] };
    component = setUp(props);
    expect(component.text()).toContain("Stored data");
  });

  it("renders Tab with panes props", () => {
    props = { urls: [] };
    component = setUp(props);
    expect(component.find("Tab").length).toEqual(1);
    expect(component.find("Tab").prop("panes").length).toBeGreaterThan(0);
  });

  it("renders with active URL`s", () => {
    props = { urls: [] };
    component = setUp(props);
    expect(component.find("MenuItem").length).toBe(2);
    expect(
      component
        .find("MenuItem")
        .first()
        .prop("active")
    ).toBe(true);
    expect(
      component
        .find("MenuItem")
        .at(1)
        .prop("active")
    ).toBe(false);
  });

  it("toggles to saved data", () => {
    component
      .find("MenuItem")
      .at(1)
      .simulate("click");
    expect(
      component
        .find("MenuItem")
        .at(1)
        .prop("active")
    ).toBe(true);
    expect(
      component
        .find("MenuItem")
        .first()
        .prop("active")
    ).toBe(false);
  });

  it("do not render URL`s if its empty", () => {
    props = { urls: [] };
    component = setUp(props);
    expect(component.text()).toContain("You dont make any request");
  });

  it("render URL`s if data passed", () => {
    props = { urls: [{ url: "test", status: "Failed" }] };
   component = setUp(props);
    expect(component.text()).not.toContain("You dont make any request");
  });

  it("allow draggable to elements list", () => {
    props = { urls: [{ url: "test", status: "Failed" }] };
    component = setUp(props);
    expect(component.find("ListItem").prop("draggable")).toEqual(true);
  });

  it("do not render Data if its empty", () => {
    props = { urls: [{url: "test", status: "Failed"}], saved: [] };
    component = setUp(props);
    component
      .find("MenuItem")
      .at(1)
      .simulate("click");
    expect(component.text()).toContain("You dont make any request")
  });

  it("render Data if its passed", () => {
    props = { urls: [{url: "test", status: "Failed"}], saved: [{url: "test", result: "test"}] };
    component = setUp(props);
    component
      .find("MenuItem")
      .at(1)
      .simulate("click");
      expect(component.text()).not.toContain("You dont make any request")
  })

  it("should handle dragStart", () => {
    const event = {
      dataTransfer: {
        setData: jest.fn()
      }
    }
    component.instance().dataDragStart(event, "test")
    expect(event.dataTransfer.setData).toHaveBeenCalledWith("el", "\"test\"")
  })

  it("should handle urlDragStart", () => {
    const event = {
      dataTransfer: {
        setData: jest.fn()
      }
    }
    component.instance().urlDragStart(event, "test")
    expect(event.dataTransfer.setData).toHaveBeenCalledWith("el", "\"test\"")
    expect(def_props.actions.setDragStatus).toHaveBeenCalledWith(true)
  })

  it("should handle dagOver", () => {
    component.instance().dragEnd({})
    expect(def_props.actions.setDragStatus).toHaveBeenCalledWith(false)

  })

});
