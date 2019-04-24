import React from "react";
import {render} from "react-dom";
import "./index.css";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import registerServiceWorker from "./registerServiceWorker";
import PropMapper from "./PropMapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import combinedReducers from "./reducers/combinedReducers";
import {fetchFeatureConfig} from "./actions";
import AuthPropMapper from "./AuthPropMapper";
import {Router, Route} from "react-router-dom";
import history from './history';
import Callback from './Callback';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
store.dispatch(fetchFeatureConfig());

function Index (data) {
  return (
    <div>
      <AuthPropMapper location={data.location}/>
      <PropMapper/>
    </div>);
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" exact component={Index}/>
      <Route path="/callback" render={(props) => <Callback {...props} />} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
