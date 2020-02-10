import { shallow } from 'enzyme';
import React from 'react';
import Footer from './';

test('Renders the Footer', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find('.footer__power').length).toBe(1);
  expect(wrapper.find('.footer__creator').length).toBe(1);
});
