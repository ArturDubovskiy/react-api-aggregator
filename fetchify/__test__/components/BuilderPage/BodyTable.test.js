import React from "react";
import { mount } from "enzyme";
import BodyTable from "../../../src/components/BodyBuilder/presentational/BodyTable";
import { CANT_PARSE_JSON } from "../../../src/utils/constants";

let def_props = {
  data: {
    dataSection: false,
    schema: [{ checked: false, key: "key1", value: "value1" }]
  },
  actions: {
    changeKeyStatus: jest.fn(),
    changeKeyValue: jest.fn(),
    clearValue: jest.fn(),
    removeSelectedKey: jest.fn(),
    addKeyRow: jest.fn(),
    removeLastKey: jest.fn(),
    clearJSON: jest.fn(),
    changeValue: jest.fn()
  }
};
const setUp = (props = def_props) => {
  let wrapper = mount(<BodyTable {...props} />);
  return wrapper;
};

describe("BuilderTable", () => {
  it("should not render without actions", () => {
    const props = { data: { dataSection: false } };
    const component = setUp(props);
    expect(component.find("Segment").length).toBe(0);
  });

  it("should render with actions passed", () => {
    const component = setUp();
    expect(component.text()).toContain("Create your custom JSON");
  });

  it("should render Table", () => {
    const component = setUp();
    expect(component.find("Table").length).toEqual(1);
  });

  it("should render rows depends on props", () => {
    const component = setUp();
    expect(component.find("TableRow").length).toEqual(2);
  });

  it("should clear table value", () => {
    const component = setUp();
    expect(component.find("[name='close']").length).toEqual(1);
    expect(def_props.actions.clearValue).toHaveBeenCalledTimes(0);
    component.find("[name='close']").simulate("click");
    expect(def_props.actions.clearValue).toHaveBeenCalledTimes(1);
    component.unmount();
  });

  it("should delete table row", () => {
    const component = setUp();
    expect(component.find("[name='trash alternate']").first().length).toEqual(
      1
    );
    expect(def_props.actions.removeSelectedKey).toHaveBeenCalledTimes(0);
    component
      .find("[name='trash alternate']")
      .first()
      .simulate("click");
    expect(def_props.actions.removeSelectedKey).toHaveBeenCalledTimes(1);
    component.unmount();
  });

  it("should render checkbox", () => {
    const component = setUp();
    expect(component.find("Checkbox").length).toBe(1);
    expect(component.find("Checkbox").prop("checked")).toBe(false);
    component.unmount();
  });

  it("should toggle checkobx", () => {
    const component = setUp();
    expect(component.find("Checkbox").prop("checked")).toBe(false);
    expect(def_props.actions.changeKeyStatus).toHaveBeenCalledTimes(0);
    component.find("Checkbox").simulate("change");
    expect(def_props.actions.changeKeyStatus).toHaveBeenCalledTimes(1);
    component.unmount();
  });

  it("should add table row", () => {
    const component = setUp();
    expect(
      component
        .find("Button")
        .first()
        .text()
    ).toBe("Add");
    component
      .find("Button")
      .first()
      .simulate("click");
    expect(def_props.actions.addKeyRow).toHaveBeenCalledTimes(1);
    component.unmount();
  });

  it("should remove table row", () => {
    const component = setUp();
    const el = component
      .find("Button")
      .findWhere(n => n.text() === "Remove")
      .first();
    expect(el.length).toBe(1);
    el.simulate("click");
    expect(def_props.actions.removeLastKey).toHaveBeenCalledTimes(1);
    component.unmount();
  });

  it("should clear table", () => {
    const component = setUp();
    const el = component
      .find("Button")
      .findWhere(n => n.text() === "Clear table")
      .first();
    expect(el.length).toBe(1);
    el.simulate("click");
    expect(def_props.actions.clearJSON).toHaveBeenCalledTimes(1);
    component.unmount();
  });

  it("should render four header cells", () => {
    const component = setUp();
    const el = component.find("TableHeaderCell");
    expect(el.length).toBe(4);
  });
  it("shoud return error if dont parse data to JSON", () => {
    const e = {
      dataTransfer: {
        getData: val => "test"
      }
    };
    const component = setUp();
    component.instance().onDrop(e, 0);
    expect(def_props.actions.changeValue).toHaveBeenCalledTimes(1);
    expect(def_props.actions.changeValue).toHaveBeenCalledWith(
      0,
      CANT_PARSE_JSON
    );
    component.unmount();
  });
  it("should push value if value is array", () => {
    const props = {
      ...def_props,
      data: {
        ...def_props.data,
        schema: [{ checked: false, key: "key1", value: [] }]
      }
    };
    const component = setUp(props);
    const e = {
      dataTransfer: {
        getData: val => JSON.stringify({})
      }
    };
    component.instance().onDrop(e, 0);
    expect(def_props.actions.changeValue).toHaveBeenCalledWith(0, [{}]);
    component.unmount();
  });
  it("should add value if its NOT empty", () => {
    const component = setUp();
    const e = {
      dataTransfer: {
        getData: val => JSON.stringify("test")
      }
    };
    component.instance().onDrop(e, 0);
    expect(def_props.actions.changeValue).toHaveBeenCalledWith(0, [
      "value1",
      "test"
    ]);
  });

  it("should orevent default onDragOver", () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = setUp();
    component.instance().onDragOver(e);
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
  });

  it("should set value", () => {
    const props = {
      ...def_props,
      data: {
        ...def_props.data,
        schema: [{ checked: false, key: "key1", value: "" }]
      }
    };
    const component = setUp(props);
    const e = {
      dataTransfer: {
        getData: val => JSON.stringify("test")
      }
    };
    component.instance().onDrop(e, 0);
    expect(def_props.actions.changeValue).toHaveBeenCalledWith(0, "test")
  });

  it("should edit key", () => {
    const component = setUp();
    const el = component.find("input").at(1)
    el.simulate('change', {target: {value: 'test'}})
    expect(def_props.actions.changeKeyValue).toHaveBeenCalledTimes(1)
    expect(def_props.actions.changeKeyValue).toHaveBeenCalledWith(0, "test")
  })

});
