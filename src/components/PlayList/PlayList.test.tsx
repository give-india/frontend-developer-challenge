import { shallow } from 'enzyme';
import React from 'react';
import PlayList from '.';

const props = {
  classes: 'playlist',
  playlist: [
    {
      id: 'url-id'
    }
  ],
  onDrop: () => null,
  onDrag: () => null,
  playNext: () => null,
  onsubmit: () => null,
  disableButton: false
};

test('Renders the header', () => {
  const wrapper = shallow(<PlayList {...props} />);
  expect(wrapper.find('.play-list-main__header').length).toBe(1);
  expect(wrapper.find('.play-list-main__list').length).toBe(1);
});
