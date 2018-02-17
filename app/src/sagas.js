import {call, put, select, takeLatest} from "redux-saga/effects";
import {
  configFetched,
  configSaved,
  FETCH_CONFIG,
  fetchFailed,
  OPEN_LINK,
  SAVE_CONFIG,
  saveFailed, showAlert,
  showLinks
} from "./actions";
import {postData} from "./httpHelpers";
import * as selectors from "./selectors";

const configEndpoint = 'http://localhost:5557/api/config';

const fetchConfig = () => fetch(configEndpoint).then((response) => response.json()).then((data) => data);
const saveConfig = (data) => postData(configEndpoint, data).then(data => data);

function* onFetchConfig () {
  try {
    const links = yield call(fetchConfig);
    yield put(configFetched(links));
  } catch (e) {
    console.error("Fetch failed" + JSON.stringify(e));
    yield put(showAlert("Fetch Failed", "error"));
  }
}

function* onSaveConfig (action) {
  try {
    yield call(saveConfig, action.configJson);
    yield put(configSaved());
    yield put(showAlert("Config Saved", "info"));
  } catch (e) {
    console.error("Save Failed" + JSON.stringify(e));
    yield put(showAlert("Save Failed", "error"));
  }
}

function* onOpenLink () {
  const filteredResults = yield select(selectors.filteredResults);
  if (filteredResults.length > 0) {
    window.open(filteredResults[0].links[0].url);
  }
  yield put(showLinks());
}

function* rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
  yield takeLatest(SAVE_CONFIG, onSaveConfig);
  yield takeLatest(OPEN_LINK, onOpenLink);
}

export default rootSaga;
