// filter
import { ALERT_ERROR_TYPE, ALERT_INFO_TYPE, ALERT_WARN_TYPE } from './Alert';

export const FILTERED = 'FILTERED';
export const UNFILTERED = 'UNFILTERED';
export const OPEN_LINK = 'OPEN_LINK';

// pages
export const SHOW_CONFIG = 'SHOW_CONFIG';
export const SHOW_LINKS = 'SHOW_LINKS';
export const SHOW_ADD_LINK = 'SHOW_ADD_LINK';
export const SHOW_GIT_SETTINGS = 'SHOW_GIT_SETTINGS';

// page mode
export const TOGGLE_PAGE_MODE = 'TOGGLE_PAGE_MODE';

//loading
export const FETCH_CONFIG = 'FETCH_CONFIG';
export const CONFIG_FETCHED = 'CONFIG_FETCHED';

//saving
export const SAVE_CONFIG = 'SAVE_CONFIG';

// alerts
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

// add link
export const ADD_LINK = 'ADD_LINK';

// git connection
export const GIT_CONNECTION_CHECKED = 'GIT_CONNECTION_CHECKED';
export const CHECK_GIT_CONNECTION = 'CHECK_GIT_CONNECTION';

// save config
export const SAVING_CONFIG = 'SAVING_CONFIG';
export const CONFIG_SAVED = 'CONFIG_SAVED';

// feature config
export const FEATURE_CONFIG_FETCHED = 'FEATURE_CONFIG_FETCHED';
export const FETCH_FEATURE_CONFIG = 'FETCH_FEATURE_CONFIG';

// auth
export const LOGIN_ISSUED = 'LOGIN_ISSUED';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const LOGOUT = 'LOGOUT';
export const PROCESS_CALLBACK = 'PROCESS_CALLBACK';
export const CALLBACK_PROCESSED = 'CALLBACK_PROCESSED';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const SAVE_AUTH_CREDENTIALS = 'SAVE_AUTH_CREDENTIALS';

/* filter actions */
export function applyFilter (filterTerm, allResults) {
  return {
    type: FILTERED,
    filterTerm,
    allResults,
  };
}

export function displayAll () {
  return {
    type: UNFILTERED,
  };
}

export function openLink (number) {
  return {
    type: OPEN_LINK,
    number,
  };
}

/* pages */

export function showConfig () {
  return {
    type: SHOW_CONFIG,
  };
}

export function showLinks (linksJson) {
  return {
    type: SHOW_LINKS,
    linksJson,
  };
}

export function showAddLink () {
  return {
    type: SHOW_ADD_LINK,
  };
}

export function showGitSettings () {
  return {
    type: SHOW_GIT_SETTINGS,
  };
}

/* page modes */

export function togglePageMode () {
  return {
    type: TOGGLE_PAGE_MODE,
  };
}

/* load config */

export function fetchConfig () {
  return {
    type: FETCH_CONFIG,
  };
}

export function configFetched (configJson) {
  return {
    type: CONFIG_FETCHED,
    configJson,
  };
}

/* load feature config */

export function fetchFeatureConfig () {
  return {
    type: FETCH_FEATURE_CONFIG,
  };
}

export function featureConfigFetched (configJson) {
  return {
    type: FEATURE_CONFIG_FETCHED,
    configJson,
  };
}

/* Authentication & Authorization */

export function login () {
  return {
    type: LOGIN_ISSUED,
  };
}

export function processCallback (hash) {
  return {
    type: PROCESS_CALLBACK,
    hash,
  };
}

export function callbackProcessed () {
  return {
    type: CALLBACK_PROCESSED,
  };
}

export function logout () {
  return {
    type: LOGOUT,
  };
}

export function isLoggedIn () {
  return {
    type: IS_LOGGED_IN,
  };
}

export function updateUserDetails (userDetails) {
  return {
    type: UPDATE_USER_DETAILS,
    userDetails,
  };
}

export function saveAuthCredentials (authCredentials) {
  return {
    type: SAVE_AUTH_CREDENTIALS,
    authCredentials,
  };
}

/* save config */

export function saveConfig (configJson) {
  return {
    type: SAVE_CONFIG,
    configJson,
  };
}

/* alerts */

export function showInfoAlert (message) {
  return {
    type: SHOW_ALERT,
    alertType: ALERT_INFO_TYPE,
    message,
  };
}

export function showWarnAlert (message) {
  return {
    type: SHOW_ALERT,
    alertType: ALERT_WARN_TYPE,
    message,
  };
}

export function showErrorAlert (message) {
  return {
    type: SHOW_ALERT,
    alertType: ALERT_ERROR_TYPE,
    message,
  };
}

export function hideAlert () {
  return {
    type: HIDE_ALERT,
  };
}

/* save link */

export function addLink (category, url, name, description) {
  return {
    type: ADD_LINK,
    category,
    url,
    name,
    description,
  };
}

/* git connection */

export function checkGitConnection () {
  return {
    type: CHECK_GIT_CONNECTION,
  };
}

export function gitConnectionChecked ({ connected, remoteUrl, upToDate }) {
  return {
    type: GIT_CONNECTION_CHECKED,
    connected,
    remoteUrl,
    upToDate,
  };
}

/* saving config*/

export function savingConfig () {
  return {
    type: SAVING_CONFIG,
  };
}

export function configSaved () {
  return {
    type: CONFIG_SAVED,
  };
}