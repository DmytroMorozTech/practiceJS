import React, { Component } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr, storeFactory } from "../../test/testUtils";
import CheckoutModal from "./CheckoutModal";

/**
 * @function setup
 * @param  {object} initialState - initial state for this setup.
 * @returns  {ShallowWrapper}
 */

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<CheckoutModal store={store} />)
    .dive()
    .dive();
  // console.log(wrapper.debug());
  return wrapper;
};

describe("Rendering of main checkout modal components:", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {};
    wrapper = setup(initialState);
  });
  test("Checkout modal is rendered", () => {
    const component = findByTestAttr(wrapper, "checkout-modal");
    expect(component.length).toBe(1);
  });
  test("Form is rendered", () => {
    const component = findByTestAttr(wrapper, "form");
    expect(component.length).toBe(1);
  });
  test("Cross mark button is rendered", () => {
    const component = findByTestAttr(wrapper, "cross-mark-btn");
    expect(component.length).toBe(1);
  });
  test("First name field is rendered", () => {
    const component = findByTestAttr(wrapper, "first-name");
    expect(component.length).toBe(1);
  });
  test("Last name field is rendered", () => {
    const component = findByTestAttr(wrapper, "last-name");
    expect(component.length).toBe(1);
  });
});
