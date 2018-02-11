import React from 'react';
import { render } from 'react-dom'
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import linkList from './reducers'
import registerServiceWorker from './registerServiceWorker';
import SearchAndResults from "./SearchAndResults";

let store = createStore(linkList);

render(
  <Provider store={store}>
    <SearchAndResults />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
