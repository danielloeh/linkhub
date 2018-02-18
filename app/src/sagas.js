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
const linkEndpoint = 'http://localhost:5557/api/links';


const checkResponse = (response) => {
  if(response.status !== 200){
    throw Error(response.status + " " + response.statusText);
  }
  return response.json()
};

const fetchConfigFromBackend = () => fetch(configEndpoint).then(checkResponse);
const saveConfigToBackend = (data) => postData(configEndpoint, data).then(checkResponse);
const addLinkToBackend = (data) => postData(linkEndpoint, data).then(checkResponse);

function* onFetchConfig () {
  try {
    const links = yield call(fetchConfigFromBackend);
    yield put(configFetched(links));
  } catch (e) {
    console.error("Load Config Failed" + e.message);
    yield put(showErrorAlert("Load Config Failed: " + e.message));
  }
}

function* onSaveConfig (action) {
  try {
    const updatedConfig = yield call(saveConfigToBackend, action.configJson);
    yield put(configFetched(updatedConfig));
    yield put(showLinks());
    yield put(showInfoAlert("Config Saved"));
  } catch (e) {
    console.error("Save Config Failed" + e.message);
    yield put(showErrorAlert("Save Config Failed: " + e.message));
  }
}

function* onOpenLink () {
  const filteredResults = yield select(selectors.filteredResults);
  if (filteredResults.length > 0) {
    window.open(filteredResults[0].links[0].url, '_blank');
  }
  yield put(showLinks());
}

function* onAddLink (action) {
  try {
    const linkPayload = {category: action.category, url: action.url, name: action.name};
    const updatedLinks = yield call(addLinkToBackend, JSON.stringify(linkPayload));
    yield put(configFetched(updatedLinks));
    yield put(showLinks());
    yield put(showInfoAlert("Link Added"));
  } catch (e) {
    console.error("Add Link Failed" + e.message);
    yield put(showErrorAlert("Add Link Failed: " + e.message));
  }
}

function* rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
  yield takeLatest(SAVE_CONFIG, onSaveConfig);
  yield takeLatest(OPEN_LINK, onOpenLink);
  yield takeLatest(ADD_LINK, onAddLink);
}

export default rootSaga;
