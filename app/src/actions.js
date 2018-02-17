// filter
export const FILTERED = 'FILTERED';
export const UNFILTERED = 'UNFILTERED';
export const OPEN_LINK = 'OPEN_LINK';

// pages
export const SHOW_CONFIG = 'SHOW_CONFIG';
export const SHOW_LINKS = 'SHOW_LINKS';

//loading
export const FETCH_CONFIG = 'FETCH_CONFIG';
export const CONFIG_FETCHED = 'CONFIG_FETCHED';
export const FETCH_FAILED = 'FETCH_FAILED';

//saving
export const SAVE_CONFIG = 'SAVE_CONFIG';
export const CONFIG_SAVED = 'CONFIG_SAVED';
export const SAVE_FAILED = 'SAVE_FAILED';

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

export function openLink () {
  return {
    type: OPEN_LINK
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

export function fetchFailed (error) {
  return {
    type: FETCH_FAILED,
    error
  }
}

/* save config */

export function saveConfig (configJson) {
  return {
    type: SAVE_CONFIG,
    configJson
  }
}

export function configSaved () {
  return {
    type: CONFIG_SAVED,
  }
}

export function saveFailed (error) {
  return {
    type: SAVE_FAILED,
    error
  }
}
