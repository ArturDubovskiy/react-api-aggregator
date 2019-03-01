import React from "react";
import { mount } from "enzyme";
import BuildButton from "../../../src/components/DataPage/presentational/BuildButon";
import { HashRouter} from 'react-router-dom';

let def_props = {};

const setUp = (props = def_props) => {
  let wrapper = mount(<HashRouter><BuildButton {...props} /></HashRouter>);
  return wrapper;
};

describe("BuildButton component", () => {
  it("should render without errors", () => {
      const component = setUp();
      expect(component.find("Button").length).toBe(1)
  });
});
