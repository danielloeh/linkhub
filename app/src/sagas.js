import {call, put, select, takeLatest} from "redux-saga/effects";
import {
  ADD_LINK,
  configFetched,
  FETCH_CONFIG,
  OPEN_LINK,
  SAVE_CONFIG,
  showErrorAlert,
  showInfoAlert,
  showLinks
} from "./actions";
import {postData} from "./httpHelpers";
import * as selectors from "./selectors";

const configEndpoint = 'http://localhost:5557/api/config';

const fetchConfigFromBackend = () => fetch(configEndpoint).then((response) => response.json()).then((data) => data);
const saveConfigToBackend = (data) => postData(configEndpoint, data).then(data => data);

function* onFetchConfig () {
  try {
    const links = yield call(fetchConfigFromBackend);
    yield put(configFetched(links));
  } catch (e) {
    console.error("Fetch failed" + JSON.stringify(e));
    yield put(showErrorAlert("Fetch Failed"));
  }
}

function* onSaveConfig (action) {
  try {
    yield call(saveConfigToBackend, action.configJson);
    yield put(showLinks());
    yield put(showInfoAlert("Config Saved"));
  } catch (e) {
    console.error("Save Failed" + JSON.stringify(e));
    yield put(showErrorAlert("Save Failed"));
  }
}

function* onOpenLink () {
  const filteredResults = yield select(selectors.filteredResults);
  if (filteredResults.length > 0) {
    window.open(filteredResults[0].links[0].url);
  }
  yield put(showLinks());
}

function* onAddLink (category, url, name) {
  try {
    yield call(() => console.log(category + url + name));
    yield put(showLinks());
    yield put(showInfoAlert("Link Added"));
  } catch (e) {
    console.error("Add Link Failed" + JSON.stringify(e));
    yield put(showErrorAlert("Add Link Failed"));
  }
}

function* rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
  yield takeLatest(SAVE_CONFIG, onSaveConfig);
  yield takeLatest(OPEN_LINK, onOpenLink);
  yield takeLatest(ADD_LINK, onAddLink);
}

export default rootSaga;
