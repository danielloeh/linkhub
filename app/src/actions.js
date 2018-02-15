// filter
export const FILTERED = 'FILTERED';
export const UNFILTERED = 'UNFILTERED';

// pages
export const SHOW_CONFIG = 'SHOW_CONFIG';
export const SHOW_LINKS = 'SHOW_LINKS';

//loading
export const FETCH_CONFIG = 'FETCH_CONFIG';
export const CONFIG_FETCHED = 'CONFIG_FETCHED';
export const FETCH_FAILED = 'FETCH_FAILED';

/* filter actions */
export function applyFilter (filterTerm) {
  return {
    type: FILTERED,
    filterTerm
  }
}

export function displayAll () {
  return {
    type: UNFILTERED
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

/* load stuff */

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
