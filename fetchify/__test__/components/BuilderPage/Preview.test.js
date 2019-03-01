import React from "react";
import { shallow } from "enzyme";

import Preview from "../../../src/components/BodyBuilder/presentational/Preview";

describe("Preview component", () => {
  let wrapper;
  let wrapperProps;

  beforeEach(() => {
    const data = { a: 5 };
    wrapper = shallow(<Preview />);
    wrapperProps = shallow(<Preview data={data} />);
  });
  it("renders with default props", () => {
    expect(wrapper.props("data")).toEqual({});
  });

  it("should not render if no data", () => {
    expect(wrapper.find("[data-test='preview-section']").length).toBe(0);
  });

  it("should render preview header", () => {
    expect(wrapperProps.find("[data-test='preview-section']").length).toBe(1);
  });

  it("should render Segment", () => {
    expect(wrapperProps.find("Segment").length).toBe(1);
  });

  it("should render Link", () => {
    expect(wrapperProps.find("Link").length).toBe(1);
  });

  it("should render JSONPreety", () => {
    expect(wrapperProps.find("JSONPretty").length).toBe(1);
  });

});
