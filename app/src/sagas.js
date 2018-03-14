import {call, put, select, takeLatest} from "redux-saga/effects";
import {
  ADD_LINK,
  CHECK_GIT_CONNECTION,
  configFetched, configSaved,
  FETCH_CONFIG,
  gitConnectionChecked,
  OPEN_LINK,
  SAVE_CONFIG, savingConfig,
  showErrorAlert,
  showInfoAlert,
  showLinks, showWarnAlert
} from "./actions";
import {postData} from "./httpHelpers";
import * as selectors from "./reducers/selectors";

let server = window.location.origin;
const configEndpoint = server + '/api/config';
const linkEndpoint = server + '/api/links';
const gitCheckEndpoint = server + '/api/git/check';

let openUrlInNewTab = (linkList, number) => {
  window.open(linkList[0].links[number - 1].url, '_blank');
};

const checkResponse = (response) => {
  if (response.status !== 200) {
    throw Error(response.status + " " + response.statusText);
  }
  return response.json()
};

const fetchConfigFromBackend = () => fetch(configEndpoint).then(checkResponse);
const checkGitConnection = () => fetch(gitCheckEndpoint).then(checkResponse);
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
    yield put(savingConfig());
    const updatedConfig = yield call(saveConfigToBackend, action.configJson);
    yield put(configFetched(updatedConfig.config));
    yield put(showLinks());
    if (updatedConfig.persistedInGit) {
      yield put(showInfoAlert("Config Saved (Persisted in Git)"));
    } else {
      yield put(showWarnAlert("Config Saved (Not persisted in Git. Please persist manually.)"));
    }
    yield put(configSaved());
  } catch (e) {
    console.error("Save Config Failed" + e.message);
    yield put(showErrorAlert("Save Config Failed: " + e.message));
    yield put(configSaved());
  }
}

function* onOpenLink (action) {
  const filteredResults = yield select(selectors.filteredResults);
  const allResults = yield select(selectors.allResults);

  if (filteredResults.length > 0 && filteredResults[0].links.length >= action.number) {
    openUrlInNewTab(filteredResults, action.number);
  } else if (allResults.length > 0 && allResults[0].links.length >= action.number) {
    openUrlInNewTab(allResults, action.number);
  }
  yield put(showLinks());
}

function* onCheckGitConnection () {
  try {
    const gitConnectionResult = yield call(checkGitConnection);
    yield put(gitConnectionChecked(gitConnectionResult));
  } catch (e) {
    console.error("Cant check git connection: " + e.message);
    yield put(showErrorAlert("Checking git connection failed: " + e.message));
  }
}

function* onAddLink (action) {
  try {
    yield put(savingConfig());
    const updatedConfig = {category: action.category, url: action.url, name: action.name};
    const updatedLinks = yield call(addLinkToBackend, JSON.stringify(updatedConfig));
    yield put(configFetched(updatedLinks.config));
    yield put(showLinks());
    if (updatedLinks.persistedInGit) {
      yield put(showInfoAlert("Link added (Persisted in Git)"));
    } else {
      yield put(showWarnAlert("Link added (Not persisted in Git. Please persist manually.)"));
    }
    yield put(configSaved());
  } catch (e) {
    console.error("Add Link Failed" + e.message);
    yield put(showErrorAlert("Add Link Failed: " + e.message));
    yield put(configSaved());
  }
}

function* rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
  yield takeLatest(SAVE_CONFIG, onSaveConfig);
  yield takeLatest(OPEN_LINK, onOpenLink);
  yield takeLatest(ADD_LINK, onAddLink);
  yield takeLatest(CHECK_GIT_CONNECTION, onCheckGitConnection);
}

export default rootSaga;
