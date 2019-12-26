import React from 'react';

export const SongsListContext = React.createContext({
  list: [],
  updateList: () => {},
});

export default SongsListContext;
