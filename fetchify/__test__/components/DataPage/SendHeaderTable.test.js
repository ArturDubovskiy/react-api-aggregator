import React from "react";
import { mount } from "enzyme";
import SendHeaderTable from "../../../src/components/DataPage/presentational/SendHeaderTable";

let def_props = {
  headers: [{ test: "test" }],
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
  let wrapper = mount(<SendHeaderTable {...props} />);
  return wrapper;
};

describe("SendHeaderTable component", () => {
    it("shoud render without error", () => {
        const component = setUp();
        expect(component.find("Segment").first().length).toBe(1)
    })

    it("should render Table",() => {
        const component = setUp();
        expect(component.find("Table").length).toBe(1)
    })
})