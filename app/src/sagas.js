import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ADD_LINK,
  callbackProcessed,
  configFetched,
  configSaved,
  featureConfigFetched,
  FETCH_CONFIG,
  FETCH_FEATURE_CONFIG,
  fetchConfig,
  IS_LOGGED_IN,
  OPEN_LINK,
  PROCESS_CALLBACK,
  SAVE_CONFIG,
  savingConfig,
  showErrorAlert,
  showLinks,
} from './actions';
import { getData, postData } from './httpHelpers';
import * as selectors from './reducers/selectors';
import history from './history';
import { AUTH_STATE_IS_LOGGED_IN } from './AuthClient';

let server = window.location.origin;

const configEndpoint = server + '/api/config';
const linkEndpoint = server + '/api/links';
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

const fetchConfigFromBackend = (authToken, idToken) => getData({ url: configEndpoint, authToken, idToken }).
  then(checkResponse);
const fetchFeatureConfig = () => getData({ url: featureConfigEndpoint }).then(checkResponse);
const saveConfigToBackend = (data, authToken, idToken) => postData({ url: configEndpoint, authToken, idToken, data }).
  then(checkResponse);
const addLinkToBackend = (data, authToken, idToken) => postData({ url: linkEndpoint, authToken, idToken, data }).
  then(checkResponse);

function * getAccessTokenHeader () {
  return yield select((state) => state.auth.authCredentials.accessToken);
}

function * getIdToken () {
  return yield select((state) => state.auth.authCredentials.idToken);
}

function * onFetchConfig () {
  const accessTokenHeader = yield call(getAccessTokenHeader);
  const idToken = yield call(getIdToken);

  try {
    const links = yield call(fetchConfigFromBackend, accessTokenHeader, idToken);
    yield put(configFetched(links));
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
    const accessTokenHeader = yield call(getAccessTokenHeader);
    const idToken = yield call(getIdToken);

    yield put(savingConfig());
    const payload = action.configJson;

    const updatedConfig = yield call(saveConfigToBackend, payload, accessTokenHeader, idToken);
    yield put(configFetched(updatedConfig));
    yield put(showLinks());
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

function * onAddLink (action) {
  try {
    const accessTokenHeader = yield call(getAccessTokenHeader);
    const idToken = yield call(getIdToken);

    yield put(savingConfig());
    const updatedConfig = {
      category: action.category,
      url: action.url,
      name: action.name,
      description: action.description,
    };
    const updatedLinks = yield call(addLinkToBackend, JSON.stringify(updatedConfig), accessTokenHeader, idToken);
    yield put(configFetched(updatedLinks));
    yield put(showLinks());
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
  } catch (e) {
    console.error('Redirect failed' + e.message);
  }
}

function * authed (saga, action) {
  const authState = yield select((state) => state.auth.authenticationState);
  if (authState === AUTH_STATE_IS_LOGGED_IN) {
    yield call(saga, action);
  }
}

function * rootSaga () {
  yield takeLatest(FETCH_CONFIG, authed, onFetchConfig);
  yield takeLatest(FETCH_FEATURE_CONFIG, onFetchFeatureConfig);
  yield takeLatest(SAVE_CONFIG, authed, onSaveConfig);
  yield takeLatest(OPEN_LINK, onOpenLink);
  yield takeLatest(ADD_LINK, authed, onAddLink);
  yield takeLatest(PROCESS_CALLBACK, onProcessCallback);
  yield takeLatest(IS_LOGGED_IN, onLoggedIn);
}

export default rootSaga;
