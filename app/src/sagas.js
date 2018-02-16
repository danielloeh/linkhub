import {call, put, takeLatest} from "redux-saga/effects";
import {configFetched, configSaved, FETCH_CONFIG, fetchFailed, SAVE_CONFIG, saveFailed} from "./actions";
import {postData} from "./httpHelpers";

const configEndpoint = 'http://localhost:5557/api/config';

const fetchConfig = () => fetch(configEndpoint).then((response) => response.json()).then((data) => data);
const saveConfig = (data) => postData(configEndpoint, data).then(data => data).catch(error => console.error(error));

function* onFetchConfig () {
  try {
    const links = yield call(fetchConfig);
    yield put(configFetched(links));
  } catch (e) {
    console.error("Fetch failed" + JSON.stringify(e));
    yield put(fetchFailed(e));
  }
}

function* onSaveConfig (action) {
  try {
    yield call(saveConfig, action.configJson);
    yield put(configSaved());
  } catch (e) {
    console.error("Save Failed" + JSON.stringify(e));
    yield put(saveFailed(e));
  }
}

function* rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
  yield takeLatest(SAVE_CONFIG, onSaveConfig);
}

export default rootSaga;
