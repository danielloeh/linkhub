import React from 'react';
import ReactDOM from 'react-dom';
import SearchAndResults from "./SearchAndResults";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchAndResults />, div);
  ReactDOM.unmountComponentAtNode(div);
});
