import { shallow } from 'enzyme';
import React, { createRef } from 'react';
import Header from '.';

const props = {
  classes: 'header',
  URLRef: createRef<HTMLInputElement>(),
  onsubmit: () => null
};

test('Renders the header', () => {
  const wrapper = shallow(<Header {...props} />);
  expect(wrapper.find('.header-page__input-text').length).toBe(1);
  expect(wrapper.find('.header-page__input-button').length).toBe(1);
});
