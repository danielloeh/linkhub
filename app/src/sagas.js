import {call, put, takeLatest} from "redux-saga/effects";
import {configFetched, FETCH_CONFIG, fetchFailed} from "./actions";

const configEndpoint = 'http://localhost:5557/api/config';

const fetchConfig = () => fetch(configEndpoint).then((response) => response.json()).then((data) => data);

function* onFetchConfig () {
  try {
    const links = yield call(fetchConfig);
    yield put(configFetched(links));
  } catch (e) {
    console.log("fetch failed" + JSON.stringify(e));
    yield put(fetchFailed(e));
  }
}

function* rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
}

export default rootSaga;
