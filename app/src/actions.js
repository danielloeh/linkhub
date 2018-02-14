export const FILTERED = 'FILTERED';
export const UNFILTERED = 'UNFILTERED';
export const SHOW_CONFIG = 'SHOW_CONFIG';
export const SHOW_LINKS = 'SHOW_LINKS';

export function applyFilter(filterTerm) {
  return {
    type: FILTERED,
    filterTerm
  }
}

export function displayAll() {
  return {
    type: UNFILTERED
  }
}

export function showConfig() {
  return {
    type: SHOW_CONFIG
  }
}

export function showLinks() {
  return {
    type: SHOW_LINKS
  }
}
