import React from 'react';

const contextWrapper = Context => Comp => props => (
  <Context.Consumer>{data => <Comp {...props} data={data} />}</Context.Consumer>
);

export default contextWrapper;
