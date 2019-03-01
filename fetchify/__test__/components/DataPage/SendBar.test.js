import React from "react";
import { mount } from "enzyme";
import SendBar from "../../../src/components/DataPage/presentational/SendBar";

let def_props = {
  request: {
    url: "",
    headers: [
      { checked: true, key: "Content-Type", value: "application/json" }
    ],
    method: "POST",
    validation: true,
    isLoading: false,
    status: null,
    error: null,
    body: null
  },
  data: [{ test: "test" }],
  togglers: {
    headers: false,
    custom: false
  },
  customData: { data: "test" },
  actions: {
    changeMethod: jest.fn(),
    toggleHeadersButton: jest.fn(),
    setSendBody: jest.fn(),
    setSendURL: jest.fn(),
    validateURL: jest.fn(),
    sendData: jest.fn(),
    headers: {
      setStatus: jest.fn()
    }
  }
};

const setUp = (props = def_props) => {
  let wrapper = mount(<SendBar {...props} />);
  return wrapper;
};

describe("SendBar component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  afterEach(() => {
    component.unmount();
  });

  it("should NOT render if no data", () => {
    const props = { ...def_props, data: [], customData: {} };
    component = setUp(props);
    expect(component.find("Segment").first().length).toBe(0);
  });
  it("should render if data passed", () => {
    expect(component.find("Segment").first().length).toBe(1);
  });
  it("should handle method selection", () => {
    const el = component.find("select").first();
    el.simulate("input", { target: { value: "POST" } });
    expect(def_props.actions.changeMethod).toHaveBeenCalledTimes(1);
    expect(def_props.actions.changeMethod).toHaveBeenCalledWith("POST");
  });
  it("should handle showHeaders", () => {
    const e = { preventDefault: jest.fn() };
    component.instance().showHeaders(e);
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
    expect(def_props.actions.toggleHeadersButton).toHaveBeenCalledTimes(1);
  });
  it("should handle send data select", () => {
    const el = component.find("select").at(1);
    el.simulate("input", { target: { value: "test" } });
    expect(def_props.actions.setSendBody).toHaveBeenCalledTimes(1);
    expect(def_props.actions.setSendBody).toHaveBeenCalledWith("test");
  });
  it("should return sending message", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, isLoading: true }
    };
    component = setUp(props);
    const el = component.find("Message");
    expect(el.text()).toContain("Sending");
  });

  it("should return error message", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, error: "error" }
    };
    component = setUp(props);
    const el = component.find("Message");
    expect(el.text()).toContain("error");
  });

  it("should return success message", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, status: true }
    };
    component = setUp(props);
    const el = component.find("Message");
    expect(el.text()).toContain("Successfuly");
  });

  it("should show input URL error", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, validation: false, url: "123" }
    };
    component = setUp(props);
    const el = component.find("Message");
    expect(el.text()).toContain("Invalid URL");
  });

  it("should set URL validation to false", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, url: "123" }
    };
    component = setUp(props);
    const el = component.find("[placeholder='Enter URL here ...']");
    el.simulate("change");
    expect(def_props.actions.validateURL).toHaveBeenCalledTimes(1);
    expect(def_props.actions.validateURL).toHaveBeenCalledWith(false);
  });

  it("should set URL validation ot true", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, url: "http://test.com" }
    };
    component = setUp(props);
    const el = component.find("[placeholder='Enter URL here ...']");
    el.simulate("change");
    expect(def_props.actions.validateURL).toHaveBeenCalledWith(true);
  });

  it("should remove spaces from URL input", () => {
    const props = {
      ...def_props,
      request: { ...def_props.request, url: "s http://test.com" }
    };
    component = setUp(props);
    const el = component.find("[placeholder='Enter URL here ...']");
    el.simulate("change");
    expect(def_props.actions.validateURL).toHaveBeenCalledWith(true);
  });

  it("should submit form by Enter", () => {
    const event = {
      keyCode: 13,
      preventDefault: jest.fn()
    };
    const el = component.find("[placeholder='Enter URL here ...']");
    el.simulate("keydown", event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it("should submit form", () => {
    const el = component.find("Form");
    const event = {
      preventDefault: jest.fn()
    };
    el.simulate('submit', event)
    expect(event.preventDefault).toHaveBeenCalled()
  });

  it("should handle sendData", () => {
      const props = {...def_props, request: {...def_props.request, url:"http://123.com", body: {}}}
      component = setUp(props)
      const el = component.find("Form");
      el.simulate('submit', {preventDefault: jest.fn()})
      expect(def_props.actions.sendData).toHaveBeenCalledTimes(1)
  })

});
