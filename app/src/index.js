import React from "react";
import {render} from "react-dom";
import "./index.css";
import {Provider} from "react-redux";
import {createStore} from "redux";
import linkList from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import LinkList from "./LinkList";

fetch('http://localhost:5557/api/links')
  .then(function (response) {
    return response.json()
  }).then(function (data) {

    function createPreloadedState(linksJSON = []){
      return {
        filter: {
          allResults: linksJSON,
          filteredResults: linksJSON,
          filterTerm: ''}
      };
    }

    let store = createStore(linkList, createPreloadedState(data));

    render(
      <Provider store={store}>
        <LinkList />
      </Provider>,
      document.getElementById('root')
    );

  }).catch(function () {
  console.log("error");
});

registerServiceWorker();
