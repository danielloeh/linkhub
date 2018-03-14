import React from "react";
import {render} from "react-dom";
import "./index.css";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import registerServiceWorker from "./registerServiceWorker";
import LinkList from "./PropMapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import combinedReducers from "./reducers/combinedReducers";
import {checkGitConnection, fetchConfig} from "./actions";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
store.dispatch(fetchConfig());
store.dispatch(checkGitConnection());

render(
  <Provider store={store}>
    <LinkList />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
