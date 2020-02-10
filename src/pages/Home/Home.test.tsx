import { mount } from 'enzyme';
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Home from '.';

import store from 'store';

test('Renders the Home', () => {
  const wrapper = mount(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Home />
      </DndProvider>
    </Provider>
  );
  expect(wrapper.find('.home-page').length).toBe(1);
  expect(wrapper.find('.home-page__play-list').length).toBe(1);
});
