import React from "react";
import { mount } from "enzyme";
import Table from "../../src/components/Table";

const def_props = {
  data: [{ checked: false, key: "", value: "" }],

  setStatus: jest.fn(),
  setKey: jest.fn(),
  setValue: jest.fn(),
  removeSelected: jest.fn(),
  addRow: jest.fn(),
  removeRow: jest.fn()
};

const setUp = (props = def_props) => {
  let wrapper = mount(<Table {...props} />);
  return wrapper;
};

describe("Table", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  afterEach(() => {
    component.unmount();
  });

  it("should render without errors", () => {
    expect(component.find("Table").length).toBe(1);
  });

  it("should handle changeStatus", () => {
    const el = component.find("Checkbox").find("input");
    el.simulate("change");
    expect(def_props.setStatus).toHaveBeenCalled();
  });

  it("should handle changeKey", () => {
    const el = component
      .find("TableBody")
      .find("TableCell")
      .at(1)
      .find("input");
    el.simulate("change", { target: { value: "test" } });
    expect(def_props.setKey).toHaveBeenCalledWith(0, "test");
  });

  it("should handle changeValue", () => {
    const el = component
      .find("TableBody")
      .find("TableCell")
      .at(2)
      .find("input");
    el.simulate("change", { target: { value: "test" } });
    expect(def_props.setValue).toHaveBeenCalledWith(0, "test");
  });

  it("should remove item on Icon click", () => {
    const el = component.find("TableCell").find("Icon");
    el.simulate("click");
    expect(def_props.removeSelected).toHaveBeenCalled();
  });
});
