// filter
import {ALERT_ERROR_TYPE, ALERT_INFO_TYPE} from "./Alert";
export const FILTERED = 'FILTERED';
export const UNFILTERED = 'UNFILTERED';
export const OPEN_LINK = 'OPEN_LINK';

// pages
export const SHOW_CONFIG = 'SHOW_CONFIG';
export const SHOW_LINKS = 'SHOW_LINKS';
export const SHOW_ADD_LINK = 'SHOW_ADD_LINK';

//loading
export const FETCH_CONFIG = 'FETCH_CONFIG';
export const CONFIG_FETCHED = 'CONFIG_FETCHED';

//saving
export const SAVE_CONFIG = 'SAVE_CONFIG';
export const CONFIG_SAVED = 'CONFIG_SAVED';

// alerts
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

// add link
export const ADD_LINK = 'ADD_LINK';

/* filter actions */
export function applyFilter (filterTerm, allResults) {
  return {
    type: FILTERED,
    filterTerm,
    allResults
  }
}

export function displayAll () {
  return {
    type: UNFILTERED
  }
}

export function openLink (number) {
  return {
    type: OPEN_LINK,
    number
  }
}

/* pages */

export function showConfig () {
  return {
    type: SHOW_CONFIG
  }
}

export function showLinks (linksJson) {
  return {
    type: SHOW_LINKS,
    linksJson
  }
}

export function showAddLink () {
  return {
    type: SHOW_ADD_LINK
  }
}

/* load config */

export function fetchConfig () {
  return {
    type: FETCH_CONFIG
  }
}

export function configFetched (configJson) {
  return {
    type: CONFIG_FETCHED,
    configJson
  }
}

/* save config */

export function saveConfig (configJson) {
  return {
    type: SAVE_CONFIG,
    configJson
  }
}

/* alerts */

export function showInfoAlert (message) {
  return {
    type: SHOW_ALERT,
    alertType: ALERT_INFO_TYPE,
    message,
  }
}

export function showErrorAlert (message) {
  return {
    type: SHOW_ALERT,
    alertType: ALERT_ERROR_TYPE,
    message,
  }
}

export function hideAlert () {
  return {
    type: HIDE_ALERT
  }
}

/* save link */

export function addLink (category, url, name) {
  return {
    type: ADD_LINK,
    category,
    url,
    name
  }
}