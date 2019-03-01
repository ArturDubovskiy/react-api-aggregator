import React from "react";
import { mount } from "enzyme";
import ParamsTable from "../../../src/components/HomePage/presentational/ParamsTable";

let component;
const def_props = {
  data: [{ test: "test" }],
  actions: {
    setStatus: jest.fn(),
    setKey: jest.fn(),
    setValue: jest.fn(),
    removeSelected: jest.fn(),
    addRow: jest.fn(),
    removeRow: jest.fn()
  }
};

const setUp = (props = def_props) => {
  let wrapper = mount(<ParamsTable {...props} />);
  return wrapper;
};

describe("HeadersTable component", () => {
  beforeEach(() => {
    component = setUp();
  });

  afterEach(() => {
    component.unmount();
  });

  it("should render without errors", () => {
      expect(component.find("Table").length).toBe(1)
  })
});
