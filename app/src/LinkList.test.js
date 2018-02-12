import React from 'react';
import ReactDOM from 'react-dom';
import LinkList from "./LinkList";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LinkList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
