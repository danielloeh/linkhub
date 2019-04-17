import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ADD_LINK,
  callbackProcessed,
  CHECK_GIT_CONNECTION,
  checkGitConnection,
  configFetched,
  configSaved,
  featureConfigFetched,
  FETCH_CONFIG,
  FETCH_FEATURE_CONFIG,
  fetchConfig,
  gitConnectionChecked,
  IS_LOGGED_IN,
  OPEN_LINK,
  PROCESS_CALLBACK,
  SAVE_CONFIG,
  savingConfig,
  showErrorAlert,
  showInfoAlert,
  showLinks,
  showWarnAlert,
} from './actions';
import { postData } from './httpHelpers';
import * as selectors from './reducers/selectors';
import history from './history';
import { AUTH_STATE_IS_LOGGED_IN } from './AuthClient';

// let server = window.location.origin;
let server = 'http://localhost:8080';
const configEndpoint = server + '/api/config';
const linkEndpoint = server + '/api/links';
const gitCheckEndpoint = server + '/api/git/check';
const featureConfigEndpoint = server + '/api/featureConfig';

let openUrlInNewTab = (linkList, number) => {
  window.open(linkList[0].links[number - 1].url, '_blank');
};

const checkResponse = (response) => {
  if (response.status !== 200) {
    throw Error(response.status + ' ' + response.statusText);
  }
  return response.json();
};

const fetchConfigFromBackend = (headers) => fetch(configEndpoint, { headers: headers }).then(checkResponse);
const fetchFeatureConfig = (headers) => fetch(featureConfigEndpoint, { headers: headers }).then(checkResponse);
const checkGitConnectionFetch = (headers) => fetch(gitCheckEndpoint, { headers: headers }).then(checkResponse);
const saveConfigToBackend = (data, headers) => postData(configEndpoint, headers, data).then(checkResponse);
const addLinkToBackend = (data, headers) => postData(linkEndpoint, headers, data).then(checkResponse);

function * getAccessTokenHeader () {
  const authState = yield select((state) => state.auth.authenticationState);
  if (authState === AUTH_STATE_IS_LOGGED_IN) {
    const accessToken = yield select((state) => state.auth.authCredentials.accessToken);
    return { 'Authorization': `Bearer ${accessToken}` };
  }
  return '';
}

function * onFetchConfig () {
  try {
    const accessTokenHeader = yield call(getAccessTokenHeader);
    if (accessTokenHeader) {
      const links = yield call(fetchConfigFromBackend, accessTokenHeader);
      yield put(configFetched(links));
    }
  } catch (e) {
    console.error('Load Config Failed' + e.message);
    yield put(showErrorAlert('Load Config Failed: ' + e.message));
  }
}

function * onFetchFeatureConfig () {
  try {
    const featureConfig = yield call(fetchFeatureConfig);
    yield put(featureConfigFetched(featureConfig));
  } catch (e) {
    console.error('Load Feature Config Failed' + e.message);
    yield put(showErrorAlert('Load Feature Config Failed: ' + e.message));
  }
}

function * onSaveConfig (action) {
  try {
    yield put(savingConfig());
    const updatedConfig = yield call(saveConfigToBackend, action.configJson);
    yield put(configFetched(updatedConfig.config));
    yield put(showLinks());
    if (updatedConfig.persistedInGit) {
      yield put(showInfoAlert('Config Saved (Persisted in Git)'));
    } else {
      yield put(showWarnAlert('Config Saved (Not persisted in Git. Please persist manually.)'));
    }
    yield put(configSaved());
  } catch (e) {
    console.error('Save Config Failed' + e.message);
    yield put(showErrorAlert('Save Config Failed: ' + e.message));
    yield put(configSaved());
  }
}

function * onOpenLink (action) {
  const filteredResults = yield select(selectors.filteredResults);
  const allResults = yield select(selectors.allResults);

  if (filteredResults.length > 0 && filteredResults[0].links.length >= action.number) {
    openUrlInNewTab(filteredResults, action.number);
  } else if (allResults.length > 0 && allResults[0].links.length >= action.number) {
    openUrlInNewTab(allResults, action.number);
  }
  yield put(showLinks());
}

function * onCheckGitConnection () {
  try {
    const gitConnectionResult = yield call(checkGitConnectionFetch);
    yield put(gitConnectionChecked(gitConnectionResult));
  } catch (e) {
    console.error('Cant check git connection: ' + e.message);
    yield put(showErrorAlert('Checking git connection failed: ' + e.message));
  }
}

function * onAddLink (action) {
  try {
    yield put(savingConfig());
    const updatedConfig = {
      category: action.category,
      url: action.url,
      name: action.name,
      description: action.description,
    };
    const updatedLinks = yield call(addLinkToBackend, JSON.stringify(updatedConfig));
    yield put(configFetched(updatedLinks.config));
    yield put(showLinks());
    if (updatedLinks.persistedInGit) {
      yield put(showInfoAlert('Link added (Persisted in Git)'));
    } else {
      yield put(showWarnAlert('Link added (Not persisted in Git. Please persist manually.)'));
    }
    yield put(configSaved());
  } catch (e) {
    console.error('Add Link Failed' + e.message);
    yield put(showErrorAlert('Add Link Failed: ' + e.message));
    yield put(configSaved());
  }
}

function * onProcessCallback () {
  try {
    yield call(() => history.replace('/'));
    yield put(callbackProcessed());
  } catch (e) {
    console.error('Redirect failed' + e.message);
  }
}

function * onLoggedIn () {
  try {
    yield put(fetchConfig());
    yield put(checkGitConnection());
  } catch (e) {
    console.error('Redirect failed' + e.message);
  }
}

function * rootSaga () {
  yield takeLatest(FETCH_CONFIG, onFetchConfig);
  yield takeLatest(FETCH_FEATURE_CONFIG, onFetchFeatureConfig);
  yield takeLatest(SAVE_CONFIG, onSaveConfig);
  yield takeLatest(OPEN_LINK, onOpenLink);
  yield takeLatest(ADD_LINK, onAddLink);
  yield takeLatest(CHECK_GIT_CONNECTION, onCheckGitConnection);
  yield takeLatest(PROCESS_CALLBACK, onProcessCallback);
  yield takeLatest(IS_LOGGED_IN, onLoggedIn);
}

export default rootSaga;
