import React from "react";
import { mount } from "enzyme";
import HeadersTable from "../../../src/components/HomePage/presentational/HeadersTable";

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
  let wrapper = mount(<HeadersTable {...props} />);
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
