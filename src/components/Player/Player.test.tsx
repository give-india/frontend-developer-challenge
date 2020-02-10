import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Player from '.';

const props = {
  classes: 'header',
  playing: {
    items: [{ id: 'ngjkjsg' }]
  },
  drop2Play: () => null,
  isDragging: false,
  onEnded: () => null,
  start: 0,
  onProgress: () => null
};

test('Renders the Player', () => {
  const wrapper = mount(
    <DndProvider backend={HTML5Backend}>
      <Player {...props} />
    </DndProvider>
  );
  expect(wrapper.find('.player-container__player').length).toBe(4);
  expect(wrapper.find('.player-container__overlay').length).toBe(0);
});

test('Renders the video placeholder', () => {
  props.isDragging = true;
  const wrapper = mount(
    <DndProvider backend={HTML5Backend}>
      <Player {...props} />
    </DndProvider>
  );
  expect(wrapper.find('.player-container__overlay').length).toBe(1);
});
