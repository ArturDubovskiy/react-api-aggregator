import React from "react";
import { mount } from "enzyme";
import SearchBar from "../../../src/components/HomePage/presentational/SearchBar";

let component;
const def_props = {
  request: {
    url: "",
    method: "GET",
    body: null,
    headers: {},
    params: [],
    isLoading: false,
    error: null
  },
  onSubmit: jest.fn(),
  errors: {
    url: null,
    body: null
  },
  toggles: {
    showHeaders: false,
    showParams: false,
    saveClicked: false
  },
  tables: {
    params: [
      {
        checked: false,
        key: "",
        value: ""
      }
    ],
    headers: [
      {
        checked: false,
        key: "",
        value: ""
      }
    ]
  },
  actions: {
    setURLError: jest.fn(),
    setURL: jest.fn(),
    setParams: jest.fn(),
    setBodyError: jest.fn(),
    setBody: jest.fn(),
    setRequestMethod: jest.fn(),
    setHeaders: jest.fn(),
    toggleHeaders: jest.fn(),
    toggleParams: jest.fn(),
    params: {
      addParamRow: jest.fn(),
      removeLastRow: jest.fn(),
      changeParamKey: jest.fn(),
      changeParamValue: jest.fn(),
      toggleParamStatus: jest.fn(),
      removeParam: jest.fn()
    },
    headers: {
      addHeaderRow: jest.fn(),
      removeLastHeaderRow: jest.fn(),
      changeHeaderKey: jest.fn(),
      changeHeaderValue: jest.fn(),
      toggleHeaderStatus: jest.fn(),
      removeHeader: jest.fn()
    }
  }
};

const setUp = (props = def_props) => {
  let wrapper = mount(<SearchBar {...props} />);
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
    expect(component.find("Form").length).toBe(1);
  });

  it("should submit from by press Enter", () => {
    const el = component
      .find("input")
      .find("[placeholder='Paste URL here ...']");
    const event = { keyCode: 13, preventDefault: jest.fn() };
    el.simulate("keydown", event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("handle setHeaders action", () => {
    component.setProps({
      ...def_props,
      tables: {
        ...def_props.tables,
        headers: [
          {
            checked: true,
            key: "",
            value: ""
          }
        ],
        params: [
          {
            checked: true,
            key: "",
            value: ""
          }
        ]
      }
    });
    expect(def_props.actions.setHeaders).toHaveBeenCalled();
    expect(def_props.actions.setHeaders).toHaveBeenCalledWith({ "": "" });
  });

  it("should handle request method select", () => {
    const el = component
      .find("FormGroup")
      .find("FormField")
      .first()
      .find("select");
    el.simulate("input", { target: { value: "POST" } });
    expect(def_props.actions.setRequestMethod).toHaveBeenCalledTimes(1);
    expect(def_props.actions.setRequestMethod).toHaveBeenCalledWith("POST");
  });

  it("should show Textarea if POST", () => {
      component.setProps({...def_props, request: {...def_props.request, method: "POST"}})
     expect(component.find("textarea").length).toBe(1)
  });

  it("handle Body input", () => {
    component.setProps({...def_props, request: {...def_props.request, method: "POST"}})
    component.instance().inputBody = {current: {value: "Hello"}};
    const el = component.find("textarea")
    el.simulate('input')
    expect(def_props.actions.setBodyError).toHaveBeenCalledTimes(2)
    expect(def_props.actions.setBodyError).toHaveBeenCalledWith("Invalid JSON")
  })
it("should parse JSON body", () => {
    component.setProps({...def_props, request: {...def_props.request, method: "POST"}})
    component.instance().inputBody = {current: {value: JSON.stringify({test: "test"})}};
    const el = component.find("textarea")
    el.simulate('input')
    expect(def_props.actions.setBody).toHaveBeenCalled()
    expect(def_props.actions.setBody).toHaveBeenCalledWith(JSON.stringify({test: "test"}))
})

it("should remove error if no body value", () => {
    component.setProps({...def_props, request: {...def_props.request, method: "POST"}})
    const el = component.find("textarea")
    el.simulate('input')
    expect(def_props.actions.setBodyError).toHaveBeenCalled()
    expect(def_props.actions.setBodyError).toHaveBeenCalledWith(null)
})

it("should remove spaces fro input", () => {
    const el = component.find("input").first()
    component.instance().inputURL = {current: {value: "\s someURL"}}
    el.simulate('change')
    expect(def_props.actions.setURLError).toHaveBeenCalledWith("Invalid URL")
})

it("should validate URL input", () => {
    component.instance().inputURL = {current: {value: "http://test.com"}}
    const el = component.find("input").first()
    el.simulate('change')
    expect(def_props.actions.setURLError).toHaveBeenCalledWith(null)
    expect(def_props.actions.setURL).toHaveBeenCalledWith("http://test.com")
})

it("should parse inputURL", () => {
    component.instance().inputURL = {current: {value: "http://test.com?1=5"}}
    const el = component.find("input").first()
    el.simulate('change')
    expect(def_props.actions.setURL).toHaveBeenCalledWith("http://test.com")
    expect(def_props.actions.setHeaders).toHaveBeenCalledWith({"": ""})
})

it("should hadle empty url error on change", () => {
    const el = component.find("input").first()
    el.simulate('change')
    expect(def_props.actions.setURLError).toHaveBeenCalledWith("UCBB")
})

it("should send callback on form submit", () => {
    const el = component.find("Form")
    el.simulate('submit')
    expect(def_props.onSubmit).toHaveBeenCalledTimes(1)
})



});


