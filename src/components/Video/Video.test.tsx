import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Video from '.';

const props = {
  video: {
    items: [
      {
        snippet: {
          title: 'my youtube video',
          thumbnails: {
            default: 'my-url'
          }
        },
        contentDetails: {
          duration: 'PT1H13S'
        }
      }
    ]
  },
  index: 1,
  onDrop: () => null,
  onDrag: () => null
};

test('Renders the header', () => {
  const wrapper = mount(
    <DndProvider backend={HTML5Backend}>
      <Video {...props} />
    </DndProvider>
  );

  expect(wrapper.find('.video-item').length).toBe(1);
  expect(wrapper.find('.video-item__name').length).toBe(1);
});
