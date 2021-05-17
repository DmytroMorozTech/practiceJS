import React, { Component } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr, storeFactory } from "../../test/testUtils";
import Modal from "./Modal";

/**
 * @function setup
 * @param  {object} initialState - initial state for this setup.
 * @returns  {ShallowWrapper}
 */

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Modal store={store} />)
    .dive()
    .dive();
  console.log(wrapper.debug());
  return wrapper;
};

describe("Rendering of main modal components:", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {};
    wrapper = setup(initialState);
  });

  test("Modal header is rendered", () => {
    const component = findByTestAttr(wrapper, "modal-header");
    expect(component.length).toBe(1);
  });
  test("Modal text is rendered", () => {
    const component = findByTestAttr(wrapper, "modal-text");
    expect(component.length).toBe(1);
  });
  test("Modal buttons are rendered", () => {
    const component = findByTestAttr(wrapper, "modal-buttons");
    expect(component.length).toBe(1);
  });
  test("Modal background is rendered", () => {
    const component = findByTestAttr(wrapper, "modal-bg");
    expect(component.length).toBe(1);
  });
  test("Modal cross mark button is rendered", () => {
    const component = findByTestAttr(wrapper, "cross-mark-btn");
    expect(component.length).toBe(1);
  });
});
