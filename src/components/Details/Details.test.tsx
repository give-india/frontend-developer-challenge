import { shallow } from 'enzyme';
import React from 'react';
import Details from './';

const props = {
  details: {
    items: [
      {
        snippet: {
          title: 'youtube video',
          publishedAt: '2019-11-10T11:11:38.000Z'
        },
        statistics: {
          viewCount: '356748'
        }
      }
    ]
  },
  clear: () => null
};

test('Renders the video details', () => {
  const wrapper = shallow(<Details {...props} />);
  expect(wrapper.find('.video-details__info').length).toBe(1);
  expect(wrapper.find('.video-details__clear-btn').length).toBe(1);
});
