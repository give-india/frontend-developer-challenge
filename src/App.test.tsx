import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

test('renders learn react link', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.App').length).toBe(1);
});
